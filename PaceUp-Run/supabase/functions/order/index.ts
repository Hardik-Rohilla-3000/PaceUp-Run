import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const REGISTRATION_FEE = 499.00
const VALID_GENDERS = new Set(['Male', 'Female', 'Other', 'Prefer not to say'])
const VALID_EMPLOYMENT_STATUSES = new Set(['School Student', 'College Student', 'Working Professional'])

// Coupons are NOT stored in this repo. They live only in the `coupon` Edge
// Function, which is deployed straight to Supabase and never committed.
async function lookupCoupon(supabaseUrl: string, serviceKey: string, code: string) {
  const response = await fetch(`${supabaseUrl}/functions/v1/coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ code }),
  })
  if (!response.ok) throw new Error('Coupon service unavailable')
  const data = await response.json()
  if (!data?.valid) return null
  const discount = Number(data.discount)
  if (!Number.isFinite(discount) || discount <= 0 || discount >= REGISTRATION_FEE) return null
  return { code: String(data.code), discount }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const {
      customer_name, customer_email, customer_phone,
      address, city, state, pincode, distance,
      gender, age, employment_status, coupon_code,
    } = await req.json()

    const parsedAge = Number(age)
    if (!VALID_GENDERS.has(gender)) return json({ error: 'Invalid gender' }, 400)
    if (!Number.isInteger(parsedAge) || parsedAge < 5 || parsedAge > 100) {
      return json({ error: 'Age must be a whole number between 5 and 100' }, 400)
    }
    if (!VALID_EMPLOYMENT_STATUSES.has(employment_status)) {
      return json({ error: 'Invalid employment status' }, 400)
    }

    const PAYU_MERCHANT_KEY = Deno.env.get('PAYU_MERCHANT_KEY')
    const PAYU_SALT = Deno.env.get('PAYU_SALT')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!PAYU_MERCHANT_KEY || !PAYU_SALT || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: 'Required server configuration is missing' }, 500)
    }

    const suppliedCoupon = String(coupon_code ?? '').trim()
    const coupon = suppliedCoupon
      ? await lookupCoupon(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, suppliedCoupon)
      : null
    if (suppliedCoupon && !coupon) return json({ error: 'Invalid coupon code' }, 400)

    const appliedCouponCode = coupon?.code || ''
    const discountAmount = coupon?.discount || 0
    const orderAmount = REGISTRATION_FEE - discountAmount

    // PAYU_MODE secret: "live" uses the real gateway, anything else uses PayU test mode.
    const isLive = (Deno.env.get('PAYU_MODE') || '').toLowerCase() === 'live'
    const payuUrl = isLive ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment'

    // PayU sends the payment result back to this function as a form POST,
    // which then redirects the runner to /register?order_id=... on the same
    // site address they started from (payu-return only allows known sites).
    const origin = req.headers.get('origin') || ''
    const returnUrl = `${SUPABASE_URL}/functions/v1/payu-return` +
      (origin ? `?site=${encodeURIComponent(origin)}` : '')

    // Timestamp + random part, so order IDs cannot be guessed (validate returns
    // the runner's details for a paid order ID). 23 chars, within PayU's limit.
    const randomPart = Array.from(crypto.getRandomValues(new Uint8Array(2)))
      .map((b) => b.toString(16).padStart(2, '0')).join('')
    const txnid = `paceup${Date.now()}${randomPart}`
    const amount = orderAmount.toFixed(2)
    const productinfo = 'PaceUp Run Registration'
    // "|" would break the PayU hash string, so strip it from user-entered values.
    const clean = (value: unknown, fallback: string) =>
      String(value ?? '').replace(/\|/g, ' ').trim() || fallback
    const firstname = clean(customer_name, 'Participant')
    const email = clean(customer_email, 'participant@paceuprun.in')
    const phone = clean(customer_phone, '9999999999')

    // key|txnid|amount|productinfo|firstname|email|udf1..udf5||||||SALT
    const hash = await sha512(
      `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`,
    )

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
    )

    const { error: insertError } = await supabase.from('registrations').insert({
      name: customer_name,
      email: customer_email,
      phone: customer_phone,
      gender,
      age: parsedAge,
      employment_status,
      address: address || '',
      city: city || '',
      state: state || '',
      pincode: pincode || '',
      distance: distance || '',
      coupon_code: appliedCouponCode,
      discount_amount: discountAmount,
      amount_paid: null,
      // Column name kept from Cashfree days; it now stores the PayU txnid.
      cashfree_order_id: txnid,
      payment_status: 'pending',
    })

    if (insertError) return json({ error: 'DB insert failed: ' + insertError.message }, 500)

    return json({
      payu_url: payuUrl,
      payu_params: {
        key: PAYU_MERCHANT_KEY,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        surl: returnUrl,
        furl: returnUrl,
        hash,
      },
      order_id: txnid,
      coupon_code: appliedCouponCode,
      discount_amount: discountAmount,
      amount: orderAmount,
    })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

async function sha512(text: string) {
  const digest = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

// Legacy dashboard copy. The deployable source is supabase/functions/order/index.ts.
// Keep this file in sync for projects that paste Edge Function code through the Dashboard.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const REGISTRATION_FEE = 499.00
const COUPONS = {
  NIT100: { code: 'NIT 100', discount: 100.00 },
  ATHELETE50: { code: 'Athelete50', discount: 50.00 },
}
const VALID_GENDERS = new Set(['Male', 'Female', 'Other', 'Prefer not to say'])
const VALID_EMPLOYMENT_STATUSES = new Set(['School Student', 'College Student', 'Working Professional'])

const normalizeCoupon = (value) => String(value ?? '').trim().replace(/\s+/g, '').toUpperCase()

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

    const suppliedCoupon = String(coupon_code ?? '').trim()
    const coupon = COUPONS[normalizeCoupon(suppliedCoupon)]
    if (suppliedCoupon && !coupon) return json({ error: 'Invalid coupon code' }, 400)

    const appliedCouponCode = coupon?.code || ''
    const discountAmount = coupon?.discount || 0
    const orderAmount = REGISTRATION_FEE - discountAmount
    const CASHFREE_APP_ID = Deno.env.get('CASHFREE_APP_ID')
    const CASHFREE_SECRET_KEY = Deno.env.get('CASHFREE_SECRET_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: 'Required server configuration is missing' }, 500)
    }

    const order_id = `paceup_${Date.now()}`
    const customer_id = `cust_${Date.now()}`
    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify({
        order_id,
        order_amount: orderAmount,
        order_currency: 'INR',
        customer_details: {
          customer_id,
          customer_name: customer_name || 'Participant',
          customer_email: customer_email || 'participant@paceuprun.in',
          customer_phone: customer_phone || '9999999999',
        },
        order_meta: {
          return_url: 'https://www.paceuprun.in/register?order_id={order_id}&payment_status={payment_status}',
        },
      }),
    })

    const order = await response.json()
    if (!response.ok) return json(order, 400)

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
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
      cashfree_order_id: order.order_id,
      payment_status: 'pending',
    })

    if (insertError) return json({ error: 'DB insert failed: ' + insertError.message }, 500)

    return json({
      payment_session_id: order.payment_session_id,
      order_id: order.order_id,
      coupon_code: appliedCouponCode,
      discount_amount: discountAmount,
      amount: orderAmount,
    })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

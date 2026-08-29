// Edge Function: dev-register
// DEV ONLY - skips Cashfree, directly inserts a "paid" registration.
// Remove or disable this before going live with real payments.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const VALID_GENDERS = new Set(['Male', 'Female', 'Other', 'Prefer not to say'])
const VALID_EMPLOYMENT_STATUSES = new Set(['School Student', 'College Student', 'Working Professional'])
const COUPONS: Record<string, { code: string; discount: number }> = {
  NIT100: { code: 'NIT 100', discount: 100 },
  Athlete50: { code: 'Athlete50', discount: 50 },
}

const normalizeCoupon = (value: unknown) => String(value ?? '').trim().replace(/\s+/g, '').toUpperCase()

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const {
      customer_name, customer_email, customer_phone,
      address, city, state, pincode, distance,
      gender, age, employment_status, coupon_code,
    } = await req.json()

    if (!customer_name || !customer_email || !customer_phone) {
      return json({ error: 'Name, email, and phone are required' }, 400)
    }

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
    const amountPaid = 499 - discountAmount

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: 'Required server configuration is missing' }, 500)
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const order_id = `dev_${Date.now()}`

    const { error } = await supabase.from('registrations').insert({
      name:              customer_name,
      email:             customer_email,
      phone:             customer_phone,
      gender,
      age:               parsedAge,
      employment_status,
      address:           address  || '',
      city:              city     || '',
      state:             state    || '',
      pincode:           pincode  || '',
      distance:          distance || '',
      coupon_code:       appliedCouponCode,
      discount_amount:   discountAmount,
      amount_paid:       amountPaid,
      cashfree_order_id: order_id,
      payment_status:    'paid',
    })

    if (error) throw new Error(error.message)

    return json({ msg: 'Dev registration created', order_id, amount: amountPaid, coupon_code: appliedCouponCode })
  } catch (err) {
    console.error(err)
    return json({ error: err instanceof Error ? err.message : String(err) }, 500)
  }
})

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

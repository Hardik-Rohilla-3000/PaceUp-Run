import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const VALID_AMOUNTS = new Set([399, 499])
const VALID_GENDERS = new Set(['Male', 'Female', 'Other', 'Prefer not to say'])
const VALID_EMPLOYMENT_STATUSES = new Set(['School Student', 'College Student', 'Working Professional'])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const {
      order_id,
      name, email, phone, address, city, state, pincode, distance,
      gender, age, employment_status,
    } = await req.json()

    if (!order_id) return json({ error: 'order_id is required' }, 400)

    const CASHFREE_APP_ID = Deno.env.get('CASHFREE_APP_ID')
    const CASHFREE_SECRET_KEY = Deno.env.get('CASHFREE_SECRET_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: 'Required server configuration is missing' }, 500)
    }

    const verifyResponse = await fetch(`https://api.cashfree.com/pg/orders/${order_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
    })

    const orderData = await verifyResponse.json()
    if (!verifyResponse.ok || orderData.order_status !== 'PAID') {
      return json({ msg: 'Payment not verified', status: orderData.order_status }, 400)
    }

    const amountPaid = Number(orderData.order_amount)
    if (!VALID_AMOUNTS.has(amountPaid)) {
      return json({ error: 'Unexpected payment amount' }, 400)
    }

    const couponCode = amountPaid === 399 ? 'NIT 100' : ''
    const discountAmount = amountPaid === 399 ? 100 : 0
    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
    )

    const { data: existing, error: lookupError } = await supabase
      .from('registrations')
      .select('*')
      .eq('cashfree_order_id', order_id)
      .maybeSingle()

    if (lookupError) return json({ error: 'DB lookup failed: ' + lookupError.message }, 500)

    if (existing && existing.payment_status === 'paid') {
      return paymentResponse(orderData, order_id, amountPaid, couponCode, discountAmount)
    }

    if (existing) {
      const { error } = await supabase
        .from('registrations')
        .update({
          payment_status: 'paid',
          coupon_code: couponCode,
          discount_amount: discountAmount,
          amount_paid: amountPaid,
        })
        .eq('cashfree_order_id', order_id)

      if (error) return json({ error: 'DB update failed: ' + error.message }, 500)
    } else {
      const parsedAge = Number(age)
      if (!VALID_GENDERS.has(gender)) return json({ error: 'Invalid gender' }, 400)
      if (!Number.isInteger(parsedAge) || parsedAge < 5 || parsedAge > 100) {
        return json({ error: 'Age must be a whole number between 5 and 100' }, 400)
      }
      if (!VALID_EMPLOYMENT_STATUSES.has(employment_status)) {
        return json({ error: 'Invalid employment status' }, 400)
      }

      const { error } = await supabase.from('registrations').insert({
        name,
        email,
        phone,
        gender,
        age: parsedAge,
        employment_status,
        address,
        city,
        state,
        pincode,
        distance,
        coupon_code: couponCode,
        discount_amount: discountAmount,
        amount_paid: amountPaid,
        cashfree_order_id: order_id,
        payment_status: 'paid',
      })

      if (error) return json({ error: 'DB insert failed: ' + error.message }, 500)
    }

    return paymentResponse(orderData, order_id, amountPaid, couponCode, discountAmount)
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

function paymentResponse(orderData: Record<string, unknown>, orderId: string, amountPaid: number, couponCode: string, discountAmount: number) {
  return json({
    msg: 'Payment verified',
    orderId,
    paymentId: orderData.cf_order_id,
    amountPaid,
    couponCode,
    discountAmount,
  })
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

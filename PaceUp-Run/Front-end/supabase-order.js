import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const REGISTRATION_FEE = 399.00 // ₹399.00

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      customer_name, customer_email, customer_phone,
      address, city, state, pincode, distance,
    } = await req.json()

    const CASHFREE_APP_ID     = Deno.env.get('CASHFREE_APP_ID')
    const CASHFREE_SECRET_KEY = Deno.env.get('CASHFREE_SECRET_KEY')

    const order_id    = `paceup_${Date.now()}`
    const customer_id = `cust_${Date.now()}`

    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-version':   '2023-08-01',
        'x-client-id':     CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify({
        order_id,
        order_amount:   REGISTRATION_FEE,
        order_currency: 'INR',
        customer_details: {
          customer_id,
          customer_name:  customer_name  || 'Participant',
          customer_email: customer_email || 'participant@paceuprun.in',
          customer_phone: customer_phone || '9999999999',
        },
        order_meta: {
          return_url: 'https://www.paceuprun.in/register?order_id={order_id}&payment_status={payment_status}',
        },
      }),
    })

    const order = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify(order), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Save as pending — fallback agar payment ke baad localStorage na mile
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    )

    await supabase.from('registrations').insert({
      name:              customer_name,
      email:             customer_email,
      phone:             customer_phone,
      address:           address  || '',
      city:              city     || '',
      state:             state    || '',
      pincode:           pincode  || '',
      distance:          distance || '',
      cashfree_order_id: order.order_id,
      payment_status:    'pending',
    })

    return new Response(JSON.stringify({
      payment_session_id: order.payment_session_id,
      order_id:           order.order_id,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

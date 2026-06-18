import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      order_id,
      name, email, phone, address, city, state, pincode, distance,
    } = await req.json()

    const CASHFREE_APP_ID     = Deno.env.get('CASHFREE_APP_ID')
    const CASHFREE_SECRET_KEY = Deno.env.get('CASHFREE_SECRET_KEY')

    // Cashfree se payment status verify karo
    const verifyResponse = await fetch(`https://api.cashfree.com/pg/orders/${order_id}`, {
      method: 'GET',
      headers: {
        'Content-Type':    'application/json',
        'x-api-version':   '2023-08-01',
        'x-client-id':     CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
    })

    const orderData = await verifyResponse.json()

    if (!verifyResponse.ok || orderData.order_status !== 'PAID') {
      return new Response(JSON.stringify({ msg: 'Payment not verified' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Payment verified — save to database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    )

    await supabase.from('registrations').insert({
      name, email, phone, address, city, state, pincode, distance,
      cashfree_order_id: order_id,
      payment_status:    'paid',
    })

    return new Response(JSON.stringify({
      msg:       'Payment verified',
      orderId:   order_id,
      paymentId: orderData.cf_order_id,
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

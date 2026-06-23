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
      return new Response(JSON.stringify({ msg: 'Payment not verified', status: orderData.order_status }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    )

    // Check if already paid (duplicate webhook/redirect)
    const { data: existing } = await supabase
      .from('registrations')
      .select('id, payment_status')
      .eq('cashfree_order_id', order_id)
      .maybeSingle()

    if (existing && existing.payment_status === 'paid') {
      // Already saved — just return success
      return new Response(JSON.stringify({
        msg:       'Payment verified',
        orderId:   order_id,
        paymentId: orderData.cf_order_id,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    if (existing) {
      // Row exists as pending — UPDATE to paid
      const { error } = await supabase
        .from('registrations')
        .update({
          payment_status: 'paid',
          name:    name    || existing.name,
          email:   email   || existing.email,
          phone:   phone   || existing.phone,
          address: address || existing.address,
          city:    city    || existing.city,
          state:   state   || existing.state,
          pincode: pincode || existing.pincode,
          distance:distance || existing.distance,
        })
        .eq('cashfree_order_id', order_id)

      if (error) {
        return new Response(JSON.stringify({ error: 'DB update failed: ' + error.message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        })
      }
    } else {
      // No pending row found — insert fresh (fallback)
      const { error } = await supabase.from('registrations').insert({
        name, email, phone, address, city, state, pincode, distance,
        cashfree_order_id: order_id,
        payment_status:    'paid',
      })

      if (error) {
        return new Response(JSON.stringify({ error: 'DB insert failed: ' + error.message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        })
      }
    }

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

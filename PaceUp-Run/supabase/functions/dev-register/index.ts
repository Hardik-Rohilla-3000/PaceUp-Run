// Edge Function: dev-register
// DEV ONLY - skips Cashfree, directly inserts a "paid" registration.
// Remove or disable this before going live with real payments.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const {
      customer_name, customer_email, customer_phone,
      address, city, state, pincode, distance,
    } = await req.json()

    if (!customer_name || !customer_email || !customer_phone) {
      return json({ error: 'Name, email, and phone are required' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    )

    const order_id = `dev_${Date.now()}`

    const { error } = await supabase.from('registrations').insert({
      name:              customer_name,
      email:             customer_email,
      phone:             customer_phone,
      address:           address  || '',
      city:              city     || '',
      state:             state    || '',
      pincode:           pincode  || '',
      distance:          distance || '',
      cashfree_order_id: order_id,
      payment_status:    'paid',
    })

    if (error) throw new Error(error.message)

    return json({ msg: 'Dev registration created', order_id })
  } catch (err) {
    console.error(err)
    return json({ error: err.message }, 500)
  }
})

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

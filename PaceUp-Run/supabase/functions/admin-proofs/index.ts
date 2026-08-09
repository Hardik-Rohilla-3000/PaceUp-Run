import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, password } = await req.json()

    if (
      email !== Deno.env.get('ADMIN_EMAIL') ||
      password !== Deno.env.get('ADMIN_PASSWORD')
    ) {
      return json({ error: 'Unauthorized' }, 401)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    )

    const { data, error } = await supabase
      .from('proof_submissions')
      .select(`
        id, email, screenshot_url, km_logged, created_at,
        registrations ( name, phone, distance, city, state, address, delivery_status, cashfree_order_id )
      `)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)

    return json(data ?? [])
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

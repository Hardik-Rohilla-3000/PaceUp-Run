import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, screenshot_url, km_logged, registration_id } = await req.json()
    if (!email || !screenshot_url || !km_logged || !registration_id) {
      return json({ error: 'Missing required fields' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    )

    // Prevent duplicate submissions
    const { data: existing } = await supabase
      .from('proof_submissions')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existing) {
      return json({ error: 'You have already submitted your proof.' }, 409)
    }

    const { error: insertErr } = await supabase
      .from('proof_submissions')
      .insert({ email, screenshot_url, km_logged, registration_id })

    if (insertErr) throw new Error('DB insert failed: ' + insertErr.message)

    return json({ msg: 'Proof submitted successfully' })
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

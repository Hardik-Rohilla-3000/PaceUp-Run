import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const body = await req.json()
    const email = String(body?.email ?? '').trim().toLowerCase()
    const { screenshot_url, km_logged, registration_id } = body ?? {}
    if (!email || !screenshot_url || !km_logged || !registration_id) {
      return json({ error: 'Missing required fields' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    )

    // Check if already submitted
    // Case-insensitive exact match, so "A@x.com" and "a@x.com" are one runner.
    const { data: existingRows } = await supabase
      .from('proof_submissions')
      .select('id')
      .ilike('email', exactPattern(email))
      .order('created_at', { ascending: false })
      .limit(1)
    const existing = existingRows?.[0]

    if (existing) {
      // Update existing submission
      const { error: updateErr } = await supabase
        .from('proof_submissions')
        .update({ screenshot_url, km_logged })
        .eq('id', existing.id)

      if (updateErr) throw new Error('DB update failed: ' + updateErr.message)
      return json({ msg: 'Proof updated successfully' })
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

// Case-insensitive exact match for .ilike(): escape LIKE wildcards (_ is common in emails).
function exactPattern(email) {
  return email.replace(/[\\%_]/g, (c) => '\\' + c)
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

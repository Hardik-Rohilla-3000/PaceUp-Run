import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const body = await req.json()
    // Same normalization as send-otp, which stores the OTP under this key.
    const email = String(body?.email ?? '').trim().toLowerCase()
    const otp = String(body?.otp ?? '').trim()
    if (!email || !otp) return json({ error: 'email and otp are required' }, 400)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    )

    const { data: otpRecord } = await supabase
      .from('otps')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    if (!otpRecord) return json({ error: 'No OTP found. Please request a new one.' }, 400)
    if (otpRecord.otp !== otp) return json({ error: 'Invalid OTP. Please try again.' }, 400)
    if (new Date() > new Date(otpRecord.expires_at)) {
      await supabase.from('otps').delete().eq('email', email)
      return json({ error: 'OTP has expired. Please request a new one.' }, 400)
    }

    // Delete used OTP
    await supabase.from('otps').delete().eq('email', email)

    // Case-insensitive exact match; newest paid registration if there are two.
    const { data: users, error: userErr } = await supabase
      .from('registrations')
      .select('id, name, email, phone, city, state, distance, address')
      .ilike('email', exactPattern(email))
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false })
      .limit(1)
    const user = users?.[0]

    if (userErr || !user) return json({ error: 'Registration not found.' }, 404)

    // Check if user already submitted proof
    const { data: proofs } = await supabase
      .from('proof_submissions')
      .select('id, screenshot_url, km_logged, created_at')
      .ilike('email', exactPattern(email))
      .order('created_at', { ascending: false })
      .limit(1)
    const existingProof = proofs?.[0]

    return json({ user, existingProof: existingProof || null })
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

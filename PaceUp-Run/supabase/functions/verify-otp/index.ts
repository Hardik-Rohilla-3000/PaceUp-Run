import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, otp } = await req.json()
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

    const { data: user, error: userErr } = await supabase
      .from('registrations')
      .select('id, name, email, phone, city, state, distance, address')
      .eq('email', email)
      .eq('payment_status', 'paid')
      .maybeSingle()

    if (userErr || !user) return json({ error: 'Registration not found.' }, 404)

    return json({ user })
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

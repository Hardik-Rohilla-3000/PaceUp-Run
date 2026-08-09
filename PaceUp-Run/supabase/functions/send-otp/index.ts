import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email } = await req.json()
    if (!email) return json({ error: 'email is required' }, 400)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    )

    // Only allow paid registrations to submit proof
    const { data: registration } = await supabase
      .from('registrations')
      .select('id')
      .eq('email', email)
      .eq('payment_status', 'paid')
      .maybeSingle()

    if (!registration) {
      return json({ error: 'No paid registration found for this email. Please register first.' }, 404)
    }

    // Check if already submitted proof
    const { data: existing } = await supabase
      .from('proof_submissions')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existing) {
      return json({ error: 'You have already submitted your proof. Contact support if you need to update it.' }, 409)
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes

    const { error: otpErr } = await supabase
      .from('otps')
      .upsert({ email, otp, expires_at }, { onConflict: 'email' })

    if (otpErr) throw new Error('Failed to save OTP: ' + otpErr.message)

    // Send email via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'PaceUp Run <noreply@paceuprun.in>',
        to: email,
        subject: 'Your OTP – PaceUp Run Record Submission',
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #040D1D; border-radius: 16px; padding: 32px; color: #fff;">
            <h2 style="margin: 0 0 8px; color: #F5A800; font-size: 24px;">PaceUp Run</h2>
            <p style="margin: 0 0 24px; color: #94A3B8; font-size: 14px;">Your one-time verification code for record submission:</p>
            <div style="background: #0B1A35; border: 1px solid #F5A800; border-radius: 12px; padding: 28px; text-align: center; margin-bottom: 24px;">
              <span style="font-size: 42px; font-weight: 900; color: #F5A800; letter-spacing: 12px; font-family: monospace;">${otp}</span>
            </div>
            <p style="color: #64748B; font-size: 12px; margin: 0;">This OTP expires in <strong style="color:#94A3B8;">10 minutes</strong>. Do not share it with anyone.<br/>If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      }),
    })

    if (!emailRes.ok) {
      const errBody = await emailRes.text()
      throw new Error('Resend error: ' + errBody)
    }

    return json({ msg: 'OTP sent successfully' })
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

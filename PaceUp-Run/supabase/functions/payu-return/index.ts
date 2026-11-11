// PayU posts the payment result here (surl / furl) as an HTML form POST.
// The Vercel site is a static SPA and cannot receive a POST, so this function
// only reads the txnid and redirects the runner back to /register, where the
// frontend calls the `validate` function to verify the payment with PayU.
//
// PayU does not send a Supabase JWT, so deploy this function with JWT
// verification turned off:
//   supabase functions deploy payu-return --no-verify-jwt

Deno.serve(async (req) => {
  const SITE_URL = (Deno.env.get('SITE_URL') || 'https://www.paceuprun.in').replace(/\/+$/, '')

  let txnid = ''
  let status = ''
  try {
    if (req.method === 'POST') {
      const form = await req.formData()
      txnid = String(form.get('txnid') ?? '')
      status = String(form.get('status') ?? '')
    } else {
      const params = new URL(req.url).searchParams
      txnid = params.get('txnid') ?? ''
      status = params.get('status') ?? ''
    }
  } catch {
    // Fall through: an empty txnid sends the runner back to the form.
  }

  const target = txnid
    ? `${SITE_URL}/register?order_id=${encodeURIComponent(txnid)}&payment_status=${encodeURIComponent(status)}`
    : `${SITE_URL}/register`

  return new Response(null, { status: 303, headers: { Location: target } })
})

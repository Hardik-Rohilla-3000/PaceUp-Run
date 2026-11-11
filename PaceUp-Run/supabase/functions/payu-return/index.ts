// PayU posts the payment result here (surl / furl) as an HTML form POST.
// The Vercel site is a static SPA and cannot receive a POST, so this function
// only reads the txnid and redirects the runner back to /register, where the
// frontend calls the `validate` function to verify the payment with PayU.
//
// PayU does not send a Supabase JWT, so deploy this function with JWT
// verification turned off:
//   supabase functions deploy payu-return --no-verify-jwt

// Sites the runner may be sent back to. Anything else falls back to SITE_URL,
// so this can never be used to redirect people to a random website.
const ALLOWED_SITES = new Set([
  'https://www.paceuprun.in',
  'https://paceuprun.in',
  'https://pace-up-run.vercel.app',
  'http://localhost:5173',
])

Deno.serve(async (req) => {
  const defaultSite = (Deno.env.get('SITE_URL') || 'https://www.paceuprun.in').replace(/\/+$/, '')
  const requestedSite = (new URL(req.url).searchParams.get('site') || '').replace(/\/+$/, '')
  const SITE_URL = ALLOWED_SITES.has(requestedSite) || requestedSite === defaultSite
    ? requestedSite
    : defaultSite

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

// payu-return: PayU calls this in two ways.
//
// 1. Browser return (surl / furl): PayU's page form-POSTs the result here and
//    we redirect the runner to /register?order_id=... on the site they came from.
// 2. Webhook (server to server): PayU posts the result directly, even if the
//    runner closed the tab or never came back from a UPI app. Set this URL as the
//    "Successful payment" webhook in the PayU dashboard:
//      https://<project>.supabase.co/functions/v1/payu-return?webhook=1
//
// In BOTH cases, a successful payment is confirmed right here on the server by
// calling `validate` (which checks with PayU, marks the registration paid and
// sends the confirmation email once). So the runner is registered and emailed
// even if their browser never finishes loading.
//
// PayU does not send a Supabase JWT, so deploy with JWT verification OFF:
//   supabase functions deploy payu-return --no-verify-jwt

// Sites the runner may be sent back to. Anything else falls back to SITE_URL,
// so this can never be used to redirect people to a random website.
const ALLOWED_SITES = new Set([
  'https://www.paceuprun.in',
  'https://paceuprun.in',
  'https://pace-up-run.vercel.app',
  'http://localhost:5173',
])

// Ask `validate` to confirm this txnid with PayU. Safe to call many times:
// validate only marks paid / emails once. Never throws.
async function confirmOnServer(txnid: string) {
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!SUPABASE_URL || !SERVICE_KEY) return

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ order_id: txnid }),
      signal: controller.signal,
    })
    if (!response.ok) {
      console.error('payu-return: validate said', response.status, await response.text())
    }
  } catch (error) {
    console.error('payu-return: validate call failed', error)
  } finally {
    clearTimeout(timer)
  }
}

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const isWebhook = url.searchParams.get('webhook') === '1'

  const defaultSite = (Deno.env.get('SITE_URL') || 'https://www.paceuprun.in').replace(/\/+$/, '')
  const requestedSite = (url.searchParams.get('site') || '').replace(/\/+$/, '')
  const SITE_URL = ALLOWED_SITES.has(requestedSite) || requestedSite === defaultSite
    ? requestedSite
    : defaultSite

  let txnid = ''
  let status = ''
  try {
    if (req.method === 'POST') {
      const contentType = req.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const body = await req.json()
        txnid = String(body?.txnid ?? '')
        status = String(body?.status ?? '')
      } else {
        const form = await req.formData()
        txnid = String(form.get('txnid') ?? '')
        status = String(form.get('status') ?? '')
      }
    } else {
      txnid = url.searchParams.get('txnid') ?? ''
      status = url.searchParams.get('status') ?? ''
    }
  } catch {
    // Fall through: an empty txnid sends the runner back to the form.
  }

  // Confirm successful payments on the server before anything else.
  if (txnid && status.toLowerCase() === 'success') {
    await confirmOnServer(txnid)
  }

  if (isWebhook) {
    return new Response('ok', { status: 200 })
  }

  const target = txnid
    ? `${SITE_URL}/register?order_id=${encodeURIComponent(txnid)}&payment_status=${encodeURIComponent(status)}`
    : `${SITE_URL}/register`

  return new Response(null, { status: 303, headers: { Location: target } })
})

// reconcile-pending: safety net for paid runners stuck as "pending".
//
// Checks every recent pending registration with PayU (through `validate`).
// Any order PayU reports as paid gets marked paid and the runner gets the
// confirmation email (validate sends it only once). Unpaid orders are left
// untouched. Nothing is ever deleted here.
//
// Runs when the admin page loads (admin-data calls it), and should also be
// scheduled every 10 minutes with Supabase Cron, so a runner is confirmed even
// if their browser never came back and the PayU webhook did not arrive.
//
// Safe to call by anyone, any number of times: it only confirms orders PayU
// itself says are paid, and returns counts only (no personal data).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LOOKBACK_DAYS = 14   // only recheck orders from the last 14 days
const MAX_ORDERS = 60      // per run
const CONCURRENCY = 4
const TIME_BUDGET_MS = 25000

// Supabase Edge Runtime global for background work after the response.
declare const EdgeRuntime: { waitUntil(promise: Promise<unknown>): void } | undefined

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  // Body {"background": true} (used by Supabase Cron, whose HTTP timeout is
  // only 5s): answer at once and finish the checks in the background.
  let background = false
  try {
    const body = await req.json()
    background = body?.background === true
  } catch {
    // empty / non-JSON body -> normal (wait for the result)
  }

  if (background && typeof EdgeRuntime !== 'undefined' && EdgeRuntime?.waitUntil) {
    EdgeRuntime.waitUntil(
      reconcile()
        .then((result) => console.log('reconcile-pending (background):', JSON.stringify(result)))
        .catch((error) => console.error('reconcile-pending (background) failed', error)),
    )
    return json({ started: true })
  }

  try {
    return json(await reconcile())
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

async function reconcile() {
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error('Server configuration missing')

  const started = Date.now()
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
  const since = new Date(Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString()

  const { data: pending, error } = await supabase
    .from('registrations')
    .select('cashfree_order_id')
    .eq('payment_status', 'pending')
    .gte('created_at', since)
    .like('cashfree_order_id', 'paceup%')
    .order('created_at', { ascending: false })
    .limit(MAX_ORDERS)

  if (error) throw new Error('DB lookup failed: ' + error.message)

  const queue = (pending ?? []).map((row) => String(row.cashfree_order_id))
  let checked = 0
  let confirmed = 0

  async function worker() {
    while (queue.length > 0 && Date.now() - started < TIME_BUDGET_MS) {
      const txnid = queue.shift()!
      checked++
      if (await confirm(SUPABASE_URL!, SERVICE_KEY!, txnid)) confirmed++
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  return { checked, confirmed, skipped: queue.length }
}

// true when validate confirmed the payment (paid), false otherwise. Never throws.
async function confirm(supabaseUrl: string, serviceKey: string, txnid: string) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ order_id: txnid }),
      signal: controller.signal,
    })
    return response.ok
  } catch (error) {
    console.error('reconcile-pending: validate failed for', txnid, error)
    return false
  } finally {
    clearTimeout(timer)
  }
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

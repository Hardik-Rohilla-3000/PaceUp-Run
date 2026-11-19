import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// 'paid' = PayU confirmed payment, 'unpaid' = PayU says not paid,
// 'unknown' = could not reach PayU / validate (then we must not delete).
async function checkPaidWithPayU(txnid: string): Promise<'paid' | 'unpaid' | 'unknown'> {
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!SUPABASE_URL || !SERVICE_KEY) return 'unknown'
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
    if (response.ok) return 'paid'
    // validate answers 400 "Payment not verified" when PayU says not paid.
    if (response.status === 400) {
      const body = await response.json().catch(() => ({}))
      return body?.msg === 'Payment not verified' ? 'unpaid' : 'unknown'
    }
    return 'unknown'
  } catch {
    return 'unknown'
  } finally {
    clearTimeout(timer)
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, password, id } = await req.json()

    if (
      email !== Deno.env.get('ADMIN_EMAIL') ||
      password !== Deno.env.get('ADMIN_PASSWORD')
    ) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    )

    // Never delete a runner who has actually paid. For a pending ("draft")
    // order, ask PayU first (via validate). If PayU says paid, validate marks
    // it paid and emails the runner, and the delete is refused.
    const { data: row, error: lookupError } = await supabase
      .from('registrations')
      .select('payment_status, cashfree_order_id')
      .eq('id', id)
      .maybeSingle()

    if (lookupError) {
      return new Response(JSON.stringify({ error: lookupError.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    const txnid = String(row?.cashfree_order_id ?? '')
    if (row && row.payment_status !== 'paid' && txnid.startsWith('paceup')) {
      const check = await checkPaidWithPayU(txnid)
      if (check === 'paid') {
        return new Response(JSON.stringify({
          error: 'This runner HAS PAID on PayU. Not deleted. Marked as paid and confirmation email sent. Refresh the page.',
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 409,
        })
      }
      if (check === 'unknown') {
        return new Response(JSON.stringify({
          error: 'Could not check this payment with PayU right now. Not deleted. Try again in a few minutes.',
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 503,
        })
      }
    }

    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', id)

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    return new Response(JSON.stringify({ msg: 'deleted' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

async function reconcilePending() {
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!SUPABASE_URL || !SERVICE_KEY) return
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/reconcile-pending`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: '{}',
      signal: controller.signal,
    })
  } catch (error) {
    console.error('admin-data: reconcile-pending failed', error)
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
    const { email, password } = await req.json()

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

    // Before listing, re-check pending ("draft") orders with PayU so a runner
    // who actually paid is shown as paid (and emailed), never left as a draft
    // someone might delete. Time-boxed; any failure is ignored.
    await reconcilePending()

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    return new Response(JSON.stringify(data ?? []), {
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

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const VALID_STATUSES = ['not_shipped', 'processing', 'shipped', 'delivered']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, password, id, delivery_status, tracking_id } = await req.json()

    if (
      email !== Deno.env.get('ADMIN_EMAIL') ||
      password !== Deno.env.get('ADMIN_PASSWORD')
    ) {
      return json({ error: 'Unauthorized' }, 401)
    }

    if (!id) return json({ error: 'id is required' }, 400)
    if (!VALID_STATUSES.includes(delivery_status)) {
      return json({ error: 'Invalid delivery_status value' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    )

    const updatePayload: Record<string, string> = { delivery_status }
    if (tracking_id !== undefined) updatePayload.tracking_id = tracking_id

    const { error: updateErr } = await supabase
      .from('registrations')
      .update(updatePayload)
      .eq('id', id)

    if (updateErr) throw new Error(updateErr.message)

    return json({ msg: 'Updated successfully' })
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

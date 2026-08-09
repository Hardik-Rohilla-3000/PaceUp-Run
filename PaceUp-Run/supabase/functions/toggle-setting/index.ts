import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const body = await req.json()
    const email = body.email
    const password = body.password
    const key = body.key
    const value = body.value

    if (email !== Deno.env.get('ADMIN_EMAIL') || password !== Deno.env.get('ADMIN_PASSWORD')) {
      return json({ error: 'Unauthorized' }, 401)
    }

    if (!key || value === undefined) {
      return json({ error: 'key and value are required' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { error } = await supabase
      .from('app_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

    if (error) throw new Error(error.message)

    return json({ msg: 'Setting updated', key, value })
  } catch (err) {
    return json({ error: String(err) }, 500)
  }
})

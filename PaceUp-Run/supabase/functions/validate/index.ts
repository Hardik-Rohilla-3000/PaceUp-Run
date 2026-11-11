import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const REGISTRATION_FEE = 499.00

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { order_id } = await req.json()
    if (!order_id) return json({ error: 'order_id is required' }, 400)

    const PAYU_MERCHANT_KEY = Deno.env.get('PAYU_MERCHANT_KEY')
    const PAYU_SALT = Deno.env.get('PAYU_SALT')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!PAYU_MERCHANT_KEY || !PAYU_SALT || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: 'Required server configuration is missing' }, 500)
    }

    const txnid = String(order_id)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // The `order` function always saves a pending row first, with the coupon
    // and discount it decided on. Anything without that row is rejected.
    const { data: existing, error: lookupError } = await supabase
      .from('registrations')
      .select('*')
      .eq('cashfree_order_id', txnid)
      .maybeSingle()

    if (lookupError) return json({ error: 'DB lookup failed: ' + lookupError.message }, 500)
    if (!existing) return json({ msg: 'Order not found' }, 404)

    // Ask PayU directly whether this txnid was paid (never trust the redirect alone).
    const isLive = (Deno.env.get('PAYU_MODE') || '').toLowerCase() === 'live'
    const verifyUrl = isLive
      ? 'https://info.payu.in/merchant/postservice.php?form=2'
      : 'https://test.payu.in/merchant/postservice.php?form=2'
    const command = 'verify_payment'
    const hash = await sha512(`${PAYU_MERCHANT_KEY}|${command}|${txnid}|${PAYU_SALT}`)

    const verifyResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ key: PAYU_MERCHANT_KEY, command, var1: txnid, hash }),
    })

    const verifyData = await verifyResponse.json().catch(() => null)
    const orderData = verifyData?.transaction_details?.[txnid]
    if (!verifyResponse.ok || !orderData || String(orderData.status).toLowerCase() !== 'success') {
      return json({ msg: 'Payment not verified', status: orderData?.status ?? null }, 400)
    }

    // The amount PayU received must match exactly what `order` charged.
    const couponCode = String(existing.coupon_code || '')
    const discountAmount = Number(existing.discount_amount || 0)
    const expectedAmount = REGISTRATION_FEE - discountAmount
    const amountPaid = Number(orderData.transaction_amount ?? orderData.amt)
    if (!Number.isFinite(amountPaid) || Math.abs(amountPaid - expectedAmount) > 0.001) {
      return json({ error: 'Unexpected payment amount' }, 400)
    }

    if (existing.payment_status !== 'paid') {
      const { error } = await supabase
        .from('registrations')
        .update({ payment_status: 'paid', amount_paid: amountPaid })
        .eq('cashfree_order_id', txnid)

      if (error) return json({ error: 'DB update failed: ' + error.message }, 500)
    }

    return json({
      msg: 'Payment verified',
      orderId: txnid,
      paymentId: orderData.mihpayid,
      amountPaid,
      couponCode,
      discountAmount,
    })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

async function sha512(text: string) {
  const digest = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  })
}

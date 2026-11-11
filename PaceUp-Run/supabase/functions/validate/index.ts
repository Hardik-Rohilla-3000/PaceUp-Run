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
      // Only flip rows that are still not paid, so the email goes out once
      // even if the runner's page calls validate twice.
      const { data: updated, error } = await supabase
        .from('registrations')
        .update({ payment_status: 'paid', amount_paid: amountPaid })
        .eq('cashfree_order_id', txnid)
        .neq('payment_status', 'paid')
        .select('id')

      if (error) return json({ error: 'DB update failed: ' + error.message }, 500)

      if (updated && updated.length > 0) {
        // A failed email must never fail a verified payment.
        try {
          await sendConfirmationEmail({
            ...existing,
            amount_paid: amountPaid,
            order_id: txnid,
            payment_id: String(orderData.mihpayid ?? ''),
          })
        } catch (mailError) {
          console.error('Confirmation email failed:', mailError)
        }
      }
    }

    return json({
      msg: 'Payment verified',
      orderId: txnid,
      paymentId: orderData.mihpayid,
      amountPaid,
      couponCode,
      discountAmount,
      // Lets the success page and ticket render even when the browser lost
      // the form data it saved before going to PayU.
      registration: {
        name: existing.name ?? '',
        email: existing.email ?? '',
        phone: existing.phone ?? '',
        distance: existing.distance ?? '',
        address: existing.address ?? '',
        city: existing.city ?? '',
        state: existing.state ?? '',
        pincode: existing.pincode ?? '',
      },
    })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

const WHATSAPP_URL = 'https://whatsapp.com/channel/0029VbD5Aj684Om3hsOSTK2N'

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Registration confirmation email, sent through Resend (same sender as the OTP email).
async function sendConfirmationEmail(reg: Record<string, unknown>) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  if (!RESEND_API_KEY || !reg.email) {
    console.error('Confirmation email skipped: missing RESEND_API_KEY or email')
    return
  }

  const row = (label: string, value: unknown) => `
    <tr>
      <td style="padding: 8px 0; color: #94A3B8; font-size: 13px;">${label}</td>
      <td style="padding: 8px 0; color: #FFFFFF; font-size: 13px; text-align: right; font-weight: 600;">${escapeHtml(value)}</td>
    </tr>`

  const amount = `₹${Number(reg.amount_paid ?? 0).toFixed(2)}`
  const shipping = [reg.address, reg.city, reg.state].filter(Boolean).join(', ') +
    (reg.pincode ? ` - ${reg.pincode}` : '')

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #040D1D; border-radius: 16px; padding: 32px; color: #fff;">
      <h2 style="margin: 0 0 4px; color: #F5A800; font-size: 24px;">PaceUp Run</h2>
      <p style="margin: 0 0 24px; color: #22C55E; font-size: 16px; font-weight: 700;">Registration Confirmed ✓</p>
      <p style="margin: 0 0 20px; color: #CBD5E1; font-size: 14px; line-height: 1.6;">
        Hi ${escapeHtml(reg.name) || 'Runner'}, your payment was successful and your spot in the
        Run for India's Glory 2026 virtual challenge is secured.
      </p>
      <table style="width: 100%; border-collapse: collapse; background: #0B1A35; border-radius: 12px; padding: 16px 20px; display: block; margin-bottom: 24px;">
        <tbody style="display: table; width: 100%;">
          ${row('Distance', String(reg.distance ?? '').toUpperCase())}
          ${row('Amount paid', amount)}
          ${reg.coupon_code ? row('Coupon', reg.coupon_code) : ''}
          ${row('Order ID', reg.order_id)}
          ${reg.payment_id ? row('Payment ID', reg.payment_id) : ''}
        </tbody>
      </table>
      <p style="margin: 0 0 6px; color: #94A3B8; font-size: 12px;">Your trophy will be shipped to:</p>
      <p style="margin: 0 0 24px; color: #FFFFFF; font-size: 13px; line-height: 1.5;">${escapeHtml(shipping)}</p>
      <a href="${WHATSAPP_URL}" style="display: block; background: #22C55E; color: #FFFFFF; text-decoration: none; text-align: center; font-weight: 800; font-size: 16px; padding: 16px; border-radius: 12px; margin-bottom: 24px;">
        Join WhatsApp for Updates
      </a>
      <p style="color: #64748B; font-size: 12px; margin: 0;">
        Questions? Write to <a href="mailto:paceuprunofficial@gmail.com" style="color: #F5A800;">paceuprunofficial@gmail.com</a>
      </p>
    </div>`

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'PaceUp Run <noreply@paceuprun.in>',
      to: String(reg.email),
      reply_to: 'paceuprunofficial@gmail.com',
      subject: 'Registration Confirmed – PaceUp Run 2026',
      html,
    }),
  })

  if (!response.ok) throw new Error('Resend error: ' + (await response.text()))
}

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

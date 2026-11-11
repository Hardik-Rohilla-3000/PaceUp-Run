# Payment gateway: PayU (replaces Cashfree)

Payments now go through PayU. Cashfree is no longer used.

## Supabase secrets (Edge Functions → Secrets)

| Name | Value |
|---|---|
| `PAYU_MERCHANT_KEY` | PayU Key |
| `PAYU_SALT` | PayU Salt |
| `PAYU_MODE` | `live` for real payments. Leave it out (or anything else) for PayU test mode. |
| `SITE_URL` | Optional. Where runners land after paying. Default `https://www.paceuprun.in`. |

Test keys only work with test mode, and live keys only work with `PAYU_MODE=live`.

## Deploy the functions

```bash
supabase functions deploy order
supabase functions deploy validate
supabase functions deploy payu-return --no-verify-jwt
```

`payu-return` must have JWT verification off, because PayU posts to it without a Supabase token. In the Dashboard, turn off "Enforce JWT verification" for that function.

## Coupons (`coupon` function, not in this repo)

Coupon codes are kept out of this repository on purpose. They live only in an Edge Function named `coupon`, created and edited directly in the Supabase Dashboard (Edge Functions → `coupon`). Keep JWT verification **on** for it.

- The website calls it with one code to show the discount. It never returns the full list.
- `order` (and `dev-register`) call it to decide the discount before charging.
- `validate` does not need it: it checks that PayU received exactly the amount `order` saved.

To add, change or stop a coupon, edit the list in that function in the Dashboard and deploy it. No website deploy is needed. Do not commit the `coupon` function to Git.

## Flow

1. `order` saves a pending registration and returns the signed PayU form fields.
2. The browser posts those fields to PayU's payment page.
3. PayU posts the result to `payu-return`, which redirects to `/register?order_id=<txnid>`.
4. The frontend calls `validate`, which checks the payment with PayU's `verify_payment` API and marks the registration paid.

The `cashfree_order_id` column is kept as is and now stores the PayU txnid.

---

# Deploying participant fields and discount coupons

Deploy these changes in the order shown below. Vercel deploys the frontend only. It does not deploy Supabase migrations or Supabase Edge Functions.

## 1. Apply the database migration

1. Open the Supabase project.
2. Go to **SQL Editor** and create a new query.
3. Copy the full contents of `supabase/migrations/20260829000000_add_participant_details_and_coupon.sql` into the query.
4. Run the query once. The migration is safe to run again if needed.

## 2. Deploy the Supabase Edge Functions

Deploy the production payment functions from the repository root:

```bash
supabase functions deploy order
supabase functions deploy validate
```

If the project uses `dev-register` for test registrations, deploy it too:

```bash
supabase functions deploy dev-register
```

The same code can be pasted into the matching functions in the Supabase Dashboard if the project owner uses the Dashboard editor instead of the CLI.

No new Supabase or Cashfree secrets are required.

## 3. Deploy the frontend

Deploy `Front-end` through the existing Vercel project. A merge may trigger this automatically if Vercel is connected to the repository.

## 4. Verify the release

1. Register without a coupon and confirm that PayU requests ₹499.
2. Apply each coupon from the `coupon` function and confirm that PayU requests ₹499 minus its discount.
3. Enter a made-up coupon and confirm that it shows "Invalid coupon code".
4. Confirm that the Supabase registration row contains gender, age, employment status, coupon code, discount amount, and amount paid.
5. Confirm that the admin dashboard and Excel export contain the new fields.

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

1. Register without a coupon and confirm that Cashfree requests ₹499.
2. Register with `NIT 100` or `NIT100` and confirm that Cashfree requests ₹399.
3. Register with `Athelete50` and confirm that Cashfree requests ₹449.
4. Confirm that the Supabase registration row contains gender, age, employment status, coupon code, discount amount, and amount paid.
5. Confirm that the admin dashboard and Excel export contain the new fields.

alter table public.registrations
  add column if not exists gender text,
  add column if not exists age smallint,
  add column if not exists employment_status text,
  add column if not exists coupon_code text,
  add column if not exists discount_amount numeric(10, 2) not null default 0,
  add column if not exists amount_paid numeric(10, 2);

update public.registrations
set discount_amount = 0
where discount_amount is null;

alter table public.registrations
  alter column discount_amount set default 0,
  alter column discount_amount set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'registrations_gender_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_gender_check
      check (gender in ('Male', 'Female', 'Other', 'Prefer not to say'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'registrations_age_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_age_check
      check (age between 5 and 100);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'registrations_employment_status_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_employment_status_check
      check (employment_status in ('School Student', 'College Student', 'Working Professional'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'registrations_discount_amount_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_discount_amount_check
      check (discount_amount >= 0);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'registrations_amount_paid_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_amount_paid_check
      check (amount_paid >= 0);
  end if;
end $$;

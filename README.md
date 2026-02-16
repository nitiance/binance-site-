# BinanceXI Site

Vite + React + TypeScript + Tailwind.

## Local development

```sh
npm i
npm run dev
```

Note: `/api/leads` is a Vercel Function. In local `vite` dev, the forms will fall back to `mailto:` unless you run through Vercel's local dev server.

## Production build

```sh
npm run build
npm run preview
```

## Deploy to Vercel

This repo uses SPA fallback in `vercel.json` and includes a serverless lead endpoint at `/api/leads`.

In Vercel:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

## Lead Capture Configuration

Set these environment variables in Vercel (and locally if needed):

### Required for spam protection

- `VITE_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

### Required for backend email delivery

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (must be a verified sender in Resend)
- `LEAD_RECEIVER_EMAIL` (defaults to `nitiance@gmail.com` if unset)

### Optional persistent storage (Supabase)

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_LEADS_TABLE` (default: `lead_requests`)

If backend delivery is unavailable, the frontend falls back to `mailto:` for email continuity.

## Optional Supabase Table

```sql
create table if not exists public.lead_requests (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  lead_type text not null,
  full_name text,
  business_name text not null,
  business_email text not null,
  phone text,
  message text,
  industry text,
  mode text,
  devices_count integer,
  branches_count integer,
  modules text[],
  timeline text,
  budget_range text,
  page_url text,
  referrer text,
  attribution jsonb,
  ip_address text,
  user_agent text
);
```

# GameFi Airdrop Radar

Public MVP scanner untuk menemukan dan memprioritaskan project GameFi yang punya potensi airdrop.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase-ready
- Vercel-ready + cron route

## Fitur MVP

- Landing page publik
- Scanner board project GameFi
- Airdrop score
- Risk profile
- Action plan per project
- Public API: `/api/projects`
- Cron scanner: `/api/cron/scan`
- Admin ingest API: `/api/admin/ingest`
- Supabase schema: `supabase/schema.sql`

## Run local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Buat project Supabase.
2. Jalankan SQL di `supabase/schema.sql` via Supabase SQL Editor.
3. Isi env:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CRON_SECRET`
   - `ADMIN_INGEST_SECRET`
4. Seed data:

```bash
pnpm seed
```

Tanpa Supabase env, app otomatis fallback ke seed data lokal.

## Deploy Vercel

```bash
pnpm build
```

Lalu import repo ini ke Vercel dan pasang env yang sama. Cron sudah dikonfigurasi di `vercel.json` setiap 6 jam.

## GitHub

```bash
git init
git branch -M main
git add .
git commit -m "Initial GameFi Airdrop Radar MVP"
gh repo create gamefi-airdrop-radar --private --source=. --remote=origin --push
```

## Roadmap berikutnya

1. Provider adapters: Galxe, Zealy, Layer3, QuestN, DappRadar, CryptoRank
2. Admin dashboard protected login
3. Telegram alert untuk score tinggi
4. Wallet task tracker
5. Premium watchlist

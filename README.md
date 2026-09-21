# Karibu Connect

Kenya-first, location-based dating demo.

## What this repo is
A static frontend you can deploy on Netlify from GitHub:

- Landing page
- Registration / login (browser localStorage only)
- Discover + swipe with county / distance / mode filters
- Optional GPS prompt
- Matches + chat mock
- Report button stub
- Student / Professional / Church modes

## What it is not (yet)
Live matching across real users, photo uploads to a server, WebSocket chat, push notifications, or M-Pesa billing. Those need a backend (recommended: **Supabase** + Netlify, or Node API).

## Local
Open `index.html` or serve the folder:

```bash
npx serve .
```

## Deploy
1. Push this repo to GitHub
2. Create a Netlify site from the repo
3. Publish directory: `/` (this folder)
4. Build command: leave empty

## Suggested production stack
| Layer | Choice |
|---|---|
| Frontend | This UI, later React/Next |
| Auth + DB | Supabase (Postgres + Auth + Storage + Realtime) |
| Distance | `earthdistance` / PostGIS |
| Payments | Safaricom Daraja M-Pesa |
| Host | Netlify (frontend) + Supabase |

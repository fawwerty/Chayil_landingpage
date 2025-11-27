# Chayil SecureX — Frontend

A modern, responsive Vite + React frontend for Chayil SecureX with serverless API functions for contact, appointments and feed aggregation.

This repository contains the public-facing site (SPA) and serverless endpoints intended to be deployed to Vercel (or similar).

---

## Quick Overview

- Frontend: Vite + React (JSX), Tailwind-like classes.
- Serverless APIs: located in `/api` (serverless functions for `contact`, `appointments`, and `feeds`). These are designed to run on Vercel/Netlify/AWS Lambda.
- Feed aggregator: `/api/feeds` fetches RSS/JSON feeds (set in `FEED_URLS`) and returns normalized posts.
- Contact & Appointments: POST endpoints that send emails via SMTP (configured using environment variables).

---

## Project Structure (important files)

- `index.html` — app entry
- `vite.config.js` — Vite configuration (uses `VITE_BASE_PATH` if set)
- `src/` — React app source
  - `src/pages/Contact.jsx` — contact form (posts to `/api/contact`)
  - `src/pages/Blog.jsx` — blog page (fetches `/api/feeds`)
- `api/` — serverless functions (suitable for Vercel)
  - `api/contact.js` — POST /api/contact
  - `api/appointments.js` — POST /api/appointments
  - `api/feeds.js` — GET /api/feeds
- `backend_proxy/` — legacy express proxy (kept for local reference; not required when deploying serverless functions)
- `DEPLOYMENT.md` — detailed deployment guide (Vercel)
- `vercel.json` — Vercel routing & env placeholders

---

## Local development

1. Install dependencies

```powershell
cd d:\\Chayil\\chayil_frontend
npm install
```

2. Start the dev server

```powershell
npm run dev
```

3. Run serverless functions locally with Vercel CLI (optional)

```powershell
npm install -g vercel
vercel dev
# functions will be available at http://localhost:3000/api/*
```

Notes:
- The frontend expects the serverless APIs at `/api/*` when running with `vercel dev` or deployed on Vercel.
- You can also test the API endpoints directly with `curl` or Postman against `http://localhost:3000/api/*` when running `vercel dev`.

---

## Environment Variables

Create a `.env.local` (for local dev) or set project env vars in Vercel Dashboard. The key variables include:

- `SMTP_HOST` — SMTP host (e.g., `smtp.sendgrid.net`, `smtp.gmail.com`, or Ethereal for testing)
- `SMTP_PORT` — SMTP port (e.g., `587`)
- `SMTP_USER` — SMTP username
- `SMTP_PASS` — SMTP password
- `SITE_EMAIL` — site email that receives contact/appointment messages (e.g., `info@chayilsecurex.com`)
- `FEED_URLS` — comma-separated list of RSS/JSON feed URLs for `/api/feeds` to aggregate
- `VITE_BASE_PATH` — optional base path for Vite builds (useful if not serving at `/`)

Example `.env.local`:

```env
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_user
SMTP_PASS=your_ethereal_pass
SITE_EMAIL=info@chayilsecurex.com
FEED_URLS=https://news.ycombinator.com/rss,https://example.com/feed.xml
VITE_BASE_PATH=/
```

---

## Serverless Endpoints (usage)

- POST `/api/contact`
  - Body: `{ name, email, phone, message }`
  - Sends: email to `SITE_EMAIL` and confirmation email to the sender.

- POST `/api/appointments`
  - Body: `{ name, email, phone, date, time, notes }`
  - Sends: email to `SITE_EMAIL` and confirmation email to the sender.

- GET `/api/feeds` or `/api/feeds?url=<feedUrl>`
  - Returns aggregated and normalized feed items (top 20 by default).

---

## Deployment (recommended: Vercel)

1. Push repository to GitHub
2. Import project in Vercel
3. Set environment variables in Project Settings (see above)
4. Deploy — Vercel will build the frontend and publish serverless functions under `/api`

See `DEPLOYMENT.md` for step-by-step instructions and troubleshooting tips.

---

## GitHub Pages vs Vercel

- GitHub Pages: static-only. The `/api` endpoints will not run on GitHub Pages. If you want to host frontend on GitHub Pages, set `VITE_BASE_PATH` appropriately and either:
  - use third-party serverless services for your API, or
  - keep the site static (Contact form falls back to static message or directs to an email link).

- Vercel: supports serverless functions and is recommended for this project.

---

## Troubleshooting

- `Uncaught SyntaxError: The requested module ... does not provide an export named 'useState'` — ensure `useState` is imported from `react`, not `react-router-dom`. (Fixed in `src/pages/Contact.jsx`.)
- Contact emails returning 500 — check SMTP credentials and Vercel logs (`vercel logs`) or run `vercel dev` locally to inspect function output.
- Feeds not loading — ensure `FEED_URLS` env var is set and reachable; test an RSS URL like `https://news.ycombinator.com/rss`.

---

## Next steps (recommended)

- Configure production SMTP credentials (SendGrid/Mailgun/Gmail with App Passwords/AWS SES).
- Verify `FEED_URLS` includes valid RSS/JSON sources.
- Test serverless functions locally with `vercel dev` before production deploy.

---

## License

This repository does not include a license by default. Add a license file (e.g., `LICENSE`) if you want to make the repo open source.

---

If you'd like, I can also:
- Add a short project logo and badge to the README
- Add quick `curl` examples for each API endpoint
- Add CI checks or a `predeploy` script for Vercel

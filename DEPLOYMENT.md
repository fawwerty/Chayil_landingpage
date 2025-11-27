# Vercel Deployment Guide

This project is now configured for **Vercel** serverless deployment with email and feed functionality.

## Setup Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Add Dependencies
```bash
npm install nodemailer rss-parser axios
```

### 3. Create `.env.local` (Development)
```env
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_email@ethereal.email
SMTP_PASS=your_ethereal_password
SITE_EMAIL=info@chayilsecurex.com
FEED_URLS=https://feed1.com/rss,https://feed2.com/rss
VITE_BASE_PATH=/
```

### 4. Generate Ethereal Test Credentials (Development)
Visit https://ethereal.email and create a test account.

### 5. Deploy to Vercel

#### Option A: Using Vercel Dashboard
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects the Vite + serverless setup
6. Add environment variables in Project Settings → Environment Variables:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SITE_EMAIL`
   - `FEED_URLS`
7. Deploy!

#### Option B: Using CLI
```bash
vercel login
vercel --prod
```

### 6. Set Environment Variables in Vercel
```bash
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add SITE_EMAIL
vercel env add FEED_URLS
```

## Production SMTP Setup

For production, replace Ethereal credentials with a real SMTP service:

- **SendGrid**: `smtp.sendgrid.net` (port 587)
- **Gmail**: `smtp.gmail.com` (port 587) + App Password
- **AWS SES**: `email-smtp.{region}.amazonaws.com` (port 587)
- **Mailgun**: `smtp.mailgun.org` (port 587)

## Project Structure

```
api/
  ├── contact.js        # POST /api/contact endpoint
  ├── appointments.js   # POST /api/appointments endpoint
  └── feeds.js          # GET /api/feeds endpoint

src/
  ├── pages/
  │   ├── Contact.jsx   # Updated to POST to /api/contact
  │   └── Blog.jsx      # Updated to GET from /api/feeds
```

## Endpoints

- **POST /api/contact** - Submit contact form
  - Body: `{ name, email, phone, message }`

- **POST /api/appointments** - Book appointment
  - Body: `{ name, email, phone, date, time, notes }`

- **GET /api/feeds** - Fetch all configured feeds
  - Query: `?url=https://...` (optional, fetch single URL)

## Testing Locally

```bash
npm run dev
```

Then in another terminal:
```bash
vercel dev
```

This runs serverless functions locally at `http://localhost:3000/api/*`

## Troubleshooting

### Contact form returns 500 error
- Check SMTP credentials in `.env.local`
- Test with Ethereal credentials first
- Check Vercel logs: `vercel logs`

### Feeds not loading
- Set `FEED_URLS` environment variable with comma-separated feed URLs
- Test with a known RSS feed: `https://news.ycombinator.com/rss`

### Routes not working
- Ensure `vercel.json` has the rewrite rule for SPA routing
- Clear browser cache

## Monitoring

View deployment logs:
```bash
vercel logs --follow
```

## Cleanup

To remove from Vercel:
```bash
vercel remove
```

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');
const axios = require('axios');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const parser = new Parser();

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Parse JSON bodies
app.use(bodyParser.json());

// In-memory cache with TTL
const feedCache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function isCacheValid(feedKey) {
  return feedCache[feedKey] && (Date.now() - feedCache[feedKey].timestamp < CACHE_TTL);
}

// Helper to normalize feed items
function normalizeItem(item) {
  return {
    title: item.title || item.name || 'Untitled',
    excerpt: (item.description || item.summary || item.content || '').replace(/<[^>]+>/g, '').slice(0, 200),
    date: item.pubDate || item.published || item.isoDate || new Date().toISOString(),
    link: item.link || item.url || '#',
    socialLink: item.link || item.url || '#'
  };
}

// Fetch RSS feed
async function fetchRssFeed(url) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).map(normalizeItem);
  } catch (err) {
    console.error(`RSS Feed error for ${url}:`, err.message);
    return [];
  }
}

// Fetch from a JSON API endpoint
async function fetchJsonFeed(url) {
  try {
    const response = await axios.get(url, { timeout: 10000 });
    const data = response.data;
    const items = data.items || data.posts || data.results || data.data || [];
    return items.map(normalizeItem);
  } catch (err) {
    console.error(`JSON Feed error for ${url}:`, err.message);
    return [];
  }
}

// Main feed fetcher
async function fetchFeed(url) {
  // Check cache first
  const cacheKey = `feed_${url}`;
  if (isCacheValid(cacheKey)) {
    console.log(`Cache hit for ${url}`);
    return feedCache[cacheKey].data;
  }

  let items = [];

  // Try RSS first, then JSON
  if (url.includes('.xml') || url.includes('feed') || url.includes('rss')) {
    items = await fetchRssFeed(url);
  } else {
    items = await fetchJsonFeed(url);
  }

  // If RSS failed, try JSON
  if (items.length === 0 && !url.includes('.xml')) {
    items = await fetchJsonFeed(url);
  }

  // Cache the result
  feedCache[cacheKey] = {
    data: items,
    timestamp: Date.now()
  };

  return items;
}

// API Endpoint: Get all feeds
app.get('/api/feeds', async (req, res) => {
  const feedUrls = (process.env.FEED_URLS || '').split(',').filter(u => u.trim());

  if (feedUrls.length === 0) {
    return res.json({
      message: 'No feeds configured. Set FEED_URLS environment variable.',
      feeds: []
    });
  }

  try {
    const allPosts = [];
    for (const url of feedUrls) {
      const posts = await fetchFeed(url.trim());
      allPosts.push(...posts);
    }

    // Sort by date (newest first)
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      total: allPosts.length,
      feeds: allPosts.slice(0, 20) // Return top 20 posts
    });
  } catch (err) {
    console.error('Error fetching feeds:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Contact form endpoint - send email to site and user
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!email || !name || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Configure transporter (use environment variables for credentials)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || process.env.ETHEREAL_USER,
        pass: process.env.SMTP_PASS || process.env.ETHEREAL_PASS,
      },
    });

    const siteEmail = process.env.SITE_EMAIL || 'info@chayilsecurex.com';

    // Mail to site
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: siteEmail,
      subject: `Contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
    });

    // Acknowledgement to user
    await transporter.sendMail({
      from: siteEmail,
      to: email,
      subject: 'We received your message',
      text: `Hi ${name},\n\nThank you for contacting Chayil SecureX. We have received your message and will get back to you shortly.\n\nBest regards,\nChayil SecureX`,
    });

    res.json({ success: true, message: 'Messages sent' });
  } catch (err) {
    console.error('Contact email failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API Endpoint: Get a specific feed by URL
app.get('/api/feeds/by-url', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const posts = await fetchFeed(url);
    res.json({
      success: true,
      url,
      total: posts.length,
      feeds: posts.slice(0, 20)
    });
  } catch (err) {
    console.error('Error fetching feed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Appointment booking endpoint - send emails to site and the user
app.post('/api/appointments', async (req, res) => {
  const { name, email, phone, date, time, notes } = req.body || {};
  if (!email || !name || !date || !time) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || process.env.ETHEREAL_USER,
        pass: process.env.SMTP_PASS || process.env.ETHEREAL_PASS,
      },
    });

    const siteEmail = process.env.SITE_EMAIL || 'info@chayilsecurex.com';

    const details = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nDate: ${date}\nTime: ${time}\nNotes: ${notes || ''}`;

    // Email to site
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: siteEmail,
      subject: `New appointment requested: ${name} - ${date} ${time}`,
      text: details,
    });

    // Confirmation to user
    await transporter.sendMail({
      from: siteEmail,
      to: email,
      subject: 'Your appointment request received',
      text: `Hi ${name},\n\nWe received your appointment request for ${date} at ${time}. We'll confirm shortly.\n\nThanks,\nChayil SecureX`,
    });

    res.json({ success: true, message: 'Appointment requested' });
  } catch (err) {
    console.error('Appointment email failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Feed proxy server running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  GET /api/feeds - Fetch all configured feeds`);
  console.log(`  GET /api/feeds/by-url?url=... - Fetch a specific feed`);
  console.log(`  POST /api/contact - Submit contact form`);
  console.log(`  POST /api/appointments - Request appointment`);
  console.log(`  GET /health - Health check`);
});

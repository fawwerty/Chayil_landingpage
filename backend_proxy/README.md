# Chayil SecureX Feeds Proxy

A lightweight Node.js/Express server that fetches social media feeds and blog posts server-side, exposing them as a JSON API to avoid CORS issues.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in this directory:
```
PORT=3001
FEED_URLS=https://yourblog.com/feed,https://linkedin.com/company/chayil/feed,https://twitter.com/chayilsecurex/rss
```

Add your public RSS/feed URLs separated by commas. Examples:
- Blog RSS: `https://yourblog.com/feed` or `/rss.xml`
- LinkedIn RSS proxy: `https://api.rss2json.com/v1/api.json?rss_url=https://linkedin.com/company/chayil`
- Twitter RSS proxy: `https://api.rss2json.com/v1/api.json?rss_url=https://twitter.com/chayilsecurex`

3. Run the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm install -D nodemon
npm run dev
```

## API Endpoints

### GET /api/feeds
Returns all configured feeds (combined and sorted by date).

**Response:**
```json
{
  "success": true,
  "total": 15,
  "feeds": [
    {
      "title": "Post Title",
      "excerpt": "Post excerpt...",
      "date": "2024-01-15T10:00:00Z",
      "link": "https://example.com/post",
      "socialLink": "https://example.com/post"
    }
  ]
}
```

### GET /api/feeds/by-url?url=...
Returns posts from a specific feed URL.

**Query Parameters:**
- `url` (required): The RSS or JSON feed URL

**Response:** Same as above

### GET /health
Health check endpoint.

## Usage with Frontend

Update `src/pages/Blog.jsx` to fetch from this proxy:

```javascript
const response = await fetch('http://localhost:3001/api/feeds');
const data = await response.json();
if (data.success) {
  setPosts(data.feeds);
}
```

## Deployment

For production (GitHub Pages + proxy):

1. **Deploy proxy to a simple hosting service** (Heroku, Railway, Render, Vercel, etc.):
   - Push this directory to your git repo
   - Set `FEED_URLS` environment variable in your hosting platform
   - Get your proxy URL (e.g., `https://chayil-feeds.herokuapp.com`)

2. **Update frontend** to use the deployed proxy URL:
   - In `Blog.jsx`, replace `http://localhost:3001` with your deployed proxy URL
   - Or use an environment variable `VITE_PROXY_URL` and set it in your Vite config

3. **Add proxy URL to Vite config** (vite.config.js):
```javascript
export default {
  define: {
    'import.meta.env.VITE_PROXY_URL': JSON.stringify(process.env.VITE_PROXY_URL || 'http://localhost:3001')
  }
}
```

## Real-Time Updates

The proxy caches results for 5 minutes to reduce API calls. To change the cache TTL, edit `server.js` line 18:

```javascript
const CACHE_TTL = 5 * 60 * 1000; // Change this (in milliseconds)
```

For more frequent updates, lower the TTL. For less frequent, increase it.

## Environment Variables

- `PORT` (default: 3001) - Server port
- `FEED_URLS` - Comma-separated list of RSS/JSON feed URLs

## Troubleshooting

- **"No feeds configured"**: Set the `FEED_URLS` environment variable
- **Feed not loading**: Check that the URL is publicly accessible and returns valid RSS or JSON
- **CORS errors**: This proxy eliminates CORS by fetching server-side; if you see CORS errors in the frontend, ensure the proxy and frontend are on the same domain or the proxy has CORS headers enabled

## License

Same as the Chayil SecureX project.

import Parser from 'rss-parser';
import axios from 'axios';

const parser = new Parser();
const feedCache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function isCacheValid(feedKey) {
  return feedCache[feedKey] && (Date.now() - feedCache[feedKey].timestamp < CACHE_TTL);
}

function normalizeItem(item) {
  return {
    title: item.title || item.name || 'Untitled',
    excerpt: (item.description || item.summary || item.content || '').replace(/<[^>]+>/g, '').slice(0, 200),
    date: item.pubDate || item.published || item.isoDate || new Date().toISOString(),
    link: item.link || item.url || '#',
    socialLink: item.link || item.url || '#'
  };
}

async function fetchRssFeed(url) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).map(normalizeItem);
  } catch (err) {
    console.error(`RSS Feed error for ${url}:`, err.message);
    return [];
  }
}

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

async function fetchFeed(url) {
  const cacheKey = `feed_${url}`;
  if (isCacheValid(cacheKey)) {
    console.log(`Cache hit for ${url}`);
    return feedCache[cacheKey].data;
  }

  let items = [];

  if (url.includes('.xml') || url.includes('feed') || url.includes('rss')) {
    items = await fetchRssFeed(url);
  } else {
    items = await fetchJsonFeed(url);
  }

  if (items.length === 0 && !url.includes('.xml')) {
    items = await fetchJsonFeed(url);
  }

  feedCache[cacheKey] = {
    data: items,
    timestamp: Date.now()
  };

  return items;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  try {
    if (url) {
      // Fetch specific feed by URL
      const posts = await fetchFeed(url);
      return res.status(200).json({
        success: true,
        url,
        total: posts.length,
        feeds: posts.slice(0, 20)
      });
    } else {
      // Fetch all configured feeds
      const feedUrls = (process.env.FEED_URLS || '').split(',').filter(u => u.trim());

      if (feedUrls.length === 0) {
        return res.json({
          message: 'No feeds configured. Set FEED_URLS environment variable.',
          feeds: []
        });
      }

      const allPosts = [];
      for (const feedUrl of feedUrls) {
        const posts = await fetchFeed(feedUrl.trim());
        allPosts.push(...posts);
      }

      // Sort by date (newest first)
      allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

      return res.status(200).json({
        success: true,
        total: allPosts.length,
        feeds: allPosts.slice(0, 20)
      });
    }
  } catch (err) {
    console.error('Error fetching feeds:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

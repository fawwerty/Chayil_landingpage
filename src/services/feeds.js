// Minimal feed fetcher: tries to fetch RSS or JSON feed and normalize items.
export async function fetchFeed(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch feed');
    const text = await res.text();

    // Try parse as JSON first
    try {
      const data = JSON.parse(text);
      // attempt to find items in common keys
      const items = data.items || data.posts || data.results || data.data || [];
      return items.map(normalizeFromJson);
    } catch (e) {
      // Not JSON, try XML (RSS/Atom)
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'application/xml');
      const parseError = xml.querySelector('parsererror');
      if (parseError) throw new Error('Invalid XML');

      const items = Array.from(xml.querySelectorAll('item, entry'));
      return items.map((node) => {
        const title = node.querySelector('title')?.textContent || '';
        const link = node.querySelector('link')?.textContent || node.querySelector('link')?.getAttribute('href') || '';
        const pubDate = node.querySelector('pubDate')?.textContent || node.querySelector('published')?.textContent || '';
        const description = node.querySelector('description')?.textContent || node.querySelector('summary')?.textContent || '';
        return {
          title,
          link,
          date: pubDate,
          excerpt: description
        };
      });
    }
  } catch (err) {
    console.error('fetchFeed error', url, err);
    return [];
  }
}

function normalizeFromJson(item) {
  return {
    title: item.title || item.name || '',
    link: item.link || item.url || item.permalink || '',
    date: item.pubDate || item.published || item.created_at || '',
    excerpt: item.description || item.excerpt || item.summary || ''
  };
}

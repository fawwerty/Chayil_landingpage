import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";

const staticPosts = [
  {
    title: "The Future of Cybersecurity in Africa",
    excerpt:
      "Exploring emerging trends and challenges in African cybersecurity landscape.",
    date: "2024-01-15",
    readTime: "5 min read",
    socialLink: "https://twitter.com/ChayilSecureX/status/1234567890",
  },
  {
    title: "GDPR Compliance for African Businesses",
    excerpt:
      "Understanding GDPR requirements and implementation strategies for African organizations.",
    date: "2024-01-10",
    readTime: "7 min read",
    socialLink:
      "https://linkedin.com/posts/chayilsecurex_gdpr-compliance-africa",
  },
  {
    title: "Building Resilient Digital Infrastructure",
    excerpt:
      "Best practices for creating robust cybersecurity frameworks in developing economies.",
    date: "2024-01-05",
    readTime: "6 min read",
    socialLink: "https://facebook.com/ChayilSecureX/posts/1234567890",
  },
];

export default function Blog() {
  const { isDark } = useTheme();
  const [posts, setPosts] = useState(staticPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts from API with fallback
  async function loadFeedsFromAPI() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/feeds", {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      if (data.success && data.feeds && data.feeds.length > 0) {
        setPosts(data.feeds.slice(0, 20));
      } else {
        setPosts(staticPosts);
      }
    } catch (err) {
      console.warn("Feed API not available, using static posts:", err.message);
      setError(err.message);
      setPosts(staticPosts);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    let pollInterval = null;
    async function init() {
      if (mounted) {
        await loadFeedsFromAPI();
        pollInterval = setInterval(() => {
          if (mounted) loadFeedsFromAPI();
        }, 10 * 60 * 1000); // every 10 minutes
      }
    }
    init();
    return () => {
      mounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/50 -z-5" />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl mx-auto px-4 py-12"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-400 mb-4">Blog</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Insights and updates from the world of GRC and cybersecurity.{" "}
            {loading && (
              <span className="ml-2 text-teal-400 text-sm">(Updating...)</span>
            )}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-6 rounded-xl shadow-lg border transition cursor-pointer backdrop-blur-sm ${isDark ? 'bg-gray-900/92 border-teal-500/20 text-gray-100' : 'bg-white/95 border-gray-200/40 text-gray-900'}`}
              onClick={() => window.open(post.socialLink || "#", "_blank")}
            >
              <h3 className="text-teal-400 font-semibold text-xl md:text-2xl mb-3 leading-tight">
                {post.title}
              </h3>
              <p className={`mb-4 text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                {post.excerpt}
              </p>
              <div className="text-sm text-gray-500">{post.date}</div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-teal-500 dark:bg-teal-600 text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">
            Stay updated with the latest insights in GRC and cybersecurity.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Newsletter subscription successful!");
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-teal-400"
              required
            />
            <button
              type="submit"
              className="bg-black text-teal-400 px-6 py-2 rounded hover:bg-gray-800 transition font-semibold"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
}

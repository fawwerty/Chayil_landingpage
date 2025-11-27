import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useEffect, useState } from 'react'

const staticPosts = [
  {
    title: 'The Future of Cybersecurity in Africa',
    excerpt: 'Exploring emerging trends and challenges in African cybersecurity landscape.',
    date: '2024-01-15',
    readTime: '5 min read',
    socialLink: 'https://twitter.com/ChayilSecureX/status/1234567890',
    comments: [
      { user: '@CyberAfrica', comment: 'Great insights on African cybersecurity!' },
      { user: '@TechGhana', comment: 'Looking forward to more content like this.' }
    ]
  },
  {
    title: 'GDPR Compliance for African Businesses',
    excerpt: 'Understanding GDPR requirements and implementation strategies for African organizations.',
    date: '2024-01-10',
    readTime: '7 min read',
    socialLink: 'https://linkedin.com/posts/chayilsecurex_gdpr-compliance-africa',
    comments: [
      { user: '@GDPRExpert', comment: 'Excellent guide for African businesses.' },
      { user: '@ComplianceAfrica', comment: 'Very helpful for our clients.' }
    ]
  },
  {
    title: 'Building Resilient Digital Infrastructure',
    excerpt: 'Best practices for creating robust cybersecurity frameworks in developing economies.',
    date: '2024-01-05',
    readTime: '6 min read',
    socialLink: 'https://facebook.com/ChayilSecureX/posts/1234567890',
    comments: [
      { user: '@InfraBuild', comment: 'Solid advice for infrastructure development.' },
      { user: '@DigitalAfrica', comment: 'Thanks for sharing these best practices.' }
    ]
  }
]

export default function Blog() {
  const { isDark } = useTheme()
  const [posts, setPosts] = useState(staticPosts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch posts from the serverless API
  async function loadFeedsFromAPI() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/feeds', {
        headers: { 'Accept': 'application/json' }
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success && data.feeds && data.feeds.length > 0) {
        setPosts(data.feeds.slice(0, 20))
      } else {
        // Fallback to static posts if API has no feeds
        setPosts(staticPosts)
      }
    } catch (err) {
      console.warn('Feed API not available, using static posts:', err.message)
      setError(err.message)
      setPosts(staticPosts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    let pollInterval = null

    async function init() {
      if (mounted) {
        await loadFeedsFromAPI()
        
        // Poll for updates every 10 minutes
        pollInterval = setInterval(() => {
          if (mounted) {
            loadFeedsFromAPI()
          }
        }, 10 * 60 * 1000)
      }
    }

    init()

    return () => {
      mounted = false
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-6xl mx-auto px-4 py-12 min-h-screen"
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Blog</h1>
        <p className="text-gray-300 mb-6 max-w-4xl mx-auto">
          Insights and updates from the world of GRC and cybersecurity.
          {loading && <span className="ml-2 text-teal-400 text-sm">(Updating...)</span>}
          {error && <span className="ml-2 text-amber-400 text-sm">(Using cached posts)</span>}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg border border-teal-500/20 cursor-pointer hover:border-teal-400/60 hover:shadow-teal-500/20 transition" onClick={() => window.open(post.link || post.socialLink || '#', '_blank')}>
              <h3 className="font-semibold text-lg mb-2 text-teal-400">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
              <div className="text-xs text-gray-500 mb-4">
                {post.date}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 bg-teal-500 text-black p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">Stay updated with the latest insights in GRC and cybersecurity.</p>
          <form onSubmit={e => { e.preventDefault(); alert('Newsletter subscription successful!'); }} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded border border-gray-300 text-gray-900 placeholder-gray-500"
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
  )
}

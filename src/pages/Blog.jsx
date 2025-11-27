import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const blogPosts = [
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

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background5.jpg')" }}>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-6xl mx-auto px-4 py-12 min-h-screen"
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Blog</h1>
        <p className="text-gray-300 mb-6 max-w-4xl mx-auto">
          Insights and updates from the world of GRC and cybersecurity.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg border border-teal-500/20 cursor-pointer hover:border-teal-400/60 hover:shadow-teal-500/20 transition" onClick={() => window.open(post.socialLink, '_blank')}>
              <h3 className="font-semibold text-lg mb-2 text-teal-400">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
              <div className="text-xs text-gray-500 mb-4">
                {post.date} • {post.readTime}
              </div>
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-semibold text-sm mb-2 text-cyan-300">Recent Comments:</h4>
                {post.comments.map((comment, j) => (
                  <div key={j} className="text-xs text-gray-400 mb-1">
                    <span className="font-medium text-teal-400">{comment.user}:</span> {comment.comment}
                  </div>
                ))}
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

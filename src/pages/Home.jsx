import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const homeCards = [
  {
    to: '/services',
    title: 'Our Services',
    description: 'Explore our comprehensive GRC and cybersecurity solutions',
  },
  {
    to: '/faq',
    title: 'FAQ',
    description: 'Find answers to common questions about our services',
  },
  {
    to: '/contact',
    title: 'Contact Us',
    description: 'Get in touch for consultations and partnerships',
  },
]

export default function Home() {
  const { isDark } = useTheme()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  // Resolve background image reliably both in dev (root or subpath) and production
  const _base = import.meta.env.BASE_URL || '/'
  let bgImage = `${_base}images/background4.jpg`
  if (typeof window !== 'undefined') {
    try {
      // If the current location pathname doesn't start with the Vite base,
      // build an absolute URL using origin + base so the image resolves correctly.
      if (!window.location.pathname.startsWith(_base)) {
        bgImage = `${window.location.origin}${_base}images/background4.jpg`
      }
    } catch (e) {
      // fallback to the base path
      bgImage = `${_base}images/background4.jpg`
    }
  }

  // Newsletter submit
  const handleNewsletter = () => {
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      setMessage('Enter a valid email')
      return
    }

    try {
      const list = JSON.parse(localStorage.getItem('newsletter') || '[]')
      if (!list.includes(trimmed)) list.push(trimmed)

      localStorage.setItem('newsletter', JSON.stringify(list))
      setEmail('')
      setStatus('success')
      setMessage('Subscribed!')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      setMessage('Something went wrong')
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">
        {/* Header */}
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-teal-400 drop-shadow-lg leading-tight">
          Chayil SecureX - Africa’s Trusted Partner in GRC & Cybersecurity
        </h1>

        <p className="text-white font-medium max-w-4xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
          Chayil SecureX is a Governance, Risk & Compliance (GRC) and Cybersecurity Advisory firm headquartered at the Accra Digital Centre, Ghana. Positioned at the intersection of global security standards and Africa's emerging digital economy, we specialize in enabling governments, enterprises, and SMEs to build digital trust, comply with international and local regulations, and strengthen cyber resilience.
        </p>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2">
          {homeCards.map((card, index) => (
            <Link
              key={index}
              to={card.to}
              className="
                backdrop-blur-lg bg-white/10 border border-teal-500/20
                p-8 rounded-2xl shadow-lg transition-all duration-300
                hover:bg-white/20 hover:shadow-teal-400/20
                hover:-translate-y-2 hover:border-teal-400/40
              "
            >
              <h3 className="text-xl font-bold text-teal-400 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-200">{card.description}</p>
            </Link>
          ))}
        </div>

        {/* Newsletter removed from Home (footer-only newsletter kept) */}
      </div>
    </div>
  )
}

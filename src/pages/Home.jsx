import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const homeCards = [
  {
    to: '/services',
    title: 'Our Services',
    description: 'Explore our comprehensive GRC and cybersecurity solutions',
    bgColor: 'bg-gray-800/50',
    hoverBg: 'hover:bg-gray-700/50',
    textColor: 'text-teal-400',
    borderColor: 'border-teal-500/20',
    hoverBorder: 'hover:border-teal-400/60'
  },
  {
    to: '/faq',
    title: 'FAQ',
    description: 'Find answers to common questions about our services',
    bgColor: 'bg-gray-800/50',
    hoverBg: 'hover:bg-gray-700/50',
    textColor: 'text-teal-400',
    borderColor: 'border-teal-500/20',
    hoverBorder: 'hover:border-teal-400/60'
  },
  {
    to: '/contact',
    title: 'Contact Us',
    description: 'Get in touch for consultations and partnerships',
    bgColor: 'bg-gray-800/50',
    hoverBg: 'hover:bg-gray-700/50',
    textColor: 'text-teal-400',
    borderColor: 'border-teal-500/20',
    hoverBorder: 'hover:border-teal-400/60'
  }
]

export default function Home() {
  const { isDark } = useTheme()

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background4.jpg')" }}>
      <div className="text-center max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-cyan-300">
        Chayil SecureX - Africa's Trusted Partner in GRC & Cybersecurity
      </h1>
      <p className="text-white mb-6 max-w-4xl mx-auto">
        Chayil SecureX is a Governance, Risk & Compliance (GRC) and Cybersecurity Advisory firm headquartered at the Accra Digital Centre, Ghana. Positioned at the intersection of global security standards and Africa's emerging digital economy, we specialize in enabling governments, enterprises, and SMEs to build digital trust, comply with international and local regulations, and strengthen cyber resilience.
      </p>
      <div className="flex justify-center mb-8">
        <Link to="/signup" className="bg-teal-500 text-black px-6 py-3 rounded-lg hover:bg-teal-400 transition font-semibold">Get Started</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {homeCards.map((card, index) => (
          <Link key={index} to={card.to} className={`block p-8 ${card.bgColor} ${card.hoverBg} rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 border ${card.borderColor} ${card.hoverBorder} hover:shadow-teal-500/20`}>
            <h3 className={`font-bold text-xl mb-3 ${card.textColor}`}>{card.title}</h3>
            <p className="text-white leading-relaxed">{card.description}</p>
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}

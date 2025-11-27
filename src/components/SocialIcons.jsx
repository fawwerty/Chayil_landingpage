import { motion } from 'framer-motion'
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'

const socials = [
  { icon: <FaTwitter />, color: '#1da1f2', name: 'Twitter', href: 'https://x.com/chayilsecurex?s=21' },
  { icon: <FaLinkedin />, color: '#0a66c2', name: 'LinkedIn', href: 'https://www.linkedin.com/company/chayil-securex/' },
  { icon: <FaFacebook />, color: '#1877f2', name: 'Facebook', href: 'https://www.facebook.com/share/16Fugw5xgH/?mibextid=wwXIfr' },
  { icon: <FaInstagram />, color: 'rgba(175, 27, 118, 1)', name: 'Instagram', href: '#' },
  { icon: <FaEnvelope />, color: '#EA4335', name: 'Email', href: 'mailto:info@chayilsecurex.com' },
  { icon: <FaPhone />, color: '#34A853', name: 'Phone', href: 'tel:+233123456789' },
]

export default function SocialIcons() {
  return (
    <div className="text-center">
      <div className="flex gap-3 justify-center mb-4">
        {socials.map((s, i) => (
          <motion.a
            key={i}
            href={s.href}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700"
            whileHover={{ backgroundColor: s.color, color: '#fff', y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label={s.name}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>

    </div>
  )
}

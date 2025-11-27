import SocialIcons from './SocialIcons'

import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { isDark } = useTheme()

  return (
    <footer className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'} mt-8 py-4 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4">
        <SocialIcons />
        <p className="text-sm text-center mt-2 font-semibold">© 2025 Chayil SecureX — Africa's trusted partner in GRC & Cybersecurity.</p>
      </div>
    </footer>
  )
}

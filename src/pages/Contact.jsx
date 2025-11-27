import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Contact() {
  const { isDark } = useTheme()

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background5.jpg')" }}>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-6xl mx-auto px-4 py-12 min-h-screen"
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
        <p className="text-gray-300 mb-6 max-w-4xl mx-auto">
          Get in touch for consultations, demos, or partnerships.
        </p>
        <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-teal-500/20">
          <form onSubmit={e => { e.preventDefault(); alert('Contact form submitted'); }} className="space-y-4">
            <input type="text" placeholder="Name" className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
            <input type="email" placeholder="Email" className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
            <textarea placeholder="Message" className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" rows="4" required></textarea>
            <button type="submit" className="w-full bg-teal-500 text-black py-2 rounded hover:bg-teal-400 transition font-semibold">Send Message</button>
          </form>
        </div>
      </motion.section>
    </div>
  )
}

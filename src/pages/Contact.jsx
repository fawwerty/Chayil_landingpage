import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Contact() {
  const { isDark } = useTheme()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      if (result.success) {
        setMessage('✓ Message sent successfully! We\'ll get back to you shortly.')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setMessage(`✗ Error: ${result.error}`)
      }
    } catch (err) {
      setMessage(`✗ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center max-w-6xl mx-auto px-4 py-12 min-h-screen z-10"
      >
        <div className="flex flex-col items-center">
          <img src={`${import.meta.env.BASE_URL}images/logo.jpg`} alt="Chayil SecureX" className="h-20 w-auto mb-4 rounded-full" />
          <h1 className="text-4xl font-bold mb-2 text-white">Contact Us</h1>
          <p className="text-cyan-200 mb-6 max-w-4xl px-2 text-center">
            Get in touch for consultations, demos, partnerships, or general enquiries. We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-6 px-4">
          <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg border border-teal-500/20">
            <h2 className="text-xl font-semibold text-teal-400 mb-4">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
              <input name="phone" type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" />
              <textarea name="message" placeholder="Message" value={formData.message} onChange={handleInputChange} className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" rows="5" required></textarea>
              <button type="submit" disabled={loading} className="w-full bg-teal-500 text-black py-2 rounded hover:bg-teal-400 transition font-semibold disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {message && (
                <p className={`text-sm text-center ${message.includes('✓') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>

          <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg border border-teal-500/20">
            <h2 className="text-xl font-semibold text-teal-400 mb-4">Our Office</h2>
            <p className="text-gray-300 mb-2">Accra Digital Centre, Accra, Ghana</p>
            <p className="text-gray-300 mb-2">Email: <a href="mailto:info@chayilsecurex.com" className="text-teal-400">info@chayilsecurex.com</a></p>
            <p className="text-gray-300 mb-4">Phone: <a href="tel:+233123456789" className="text-teal-400">+233 123 456 789</a></p>
            <div className="mt-4">
              <a href="https://maps.google.com?q=Accra+Digital+Centre" target="_blank" rel="noreferrer" className="text-sm text-teal-400 underline">View on Google Maps</a>
            </div>
            <div className="mt-6">
              <h3 className="text-sm text-gray-400 mb-2">Connect with us</h3>
              <div className="flex space-x-3">
                <a href="#" className="text-teal-400 hover:text-cyan-300">Twitter</a>
                <a href="#" className="text-teal-400 hover:text-cyan-300">LinkedIn</a>
                <a href="#" className="text-teal-400 hover:text-cyan-300">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

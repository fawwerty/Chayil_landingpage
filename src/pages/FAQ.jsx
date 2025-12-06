import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const faqs = [
  {
    question: 'What services does Chayil SecureX offer?',
    answer: 'We offer comprehensive GRC consulting, cybersecurity assurance, IT audit, regulatory compliance, capacity building, and GRC automation services tailored for African organizations. Our services are designed to address the unique challenges faced by African businesses in the global digital economy.'
  },
  {
    question: 'Do you work with small and medium enterprises?',
    answer: 'Yes, we specialize in serving SMEs, governments, and enterprises across Africa, providing scalable solutions that fit different organizational sizes and budgets. Our approach ensures that even small businesses can access world-class cybersecurity and compliance services.'
  },
  {
    question: 'What certifications do you help with?',
    answer: 'We assist with ISO 27001, SOC 2, PCI DSS, GDPR, HIPAA, NIST, SOX, FISMA, and CCPA compliance, among others. Our team stays current with evolving regulatory requirements and provides comprehensive support throughout the certification process.'
  },
  {
    question: 'Where are you located?',
    answer: 'We are headquartered at the Accra Digital Centre in Ghana and serve clients across Africa and internationally. Our strategic location allows us to understand local contexts while maintaining global standards.'
  },
  {
    question: 'How do you approach cybersecurity for African markets?',
    answer: 'We combine global best practices with deep understanding of African market realities. Our solutions address local infrastructure challenges, regulatory environments, and cultural contexts while ensuring compliance with international standards.'
  },
  {
    question: 'What makes Chayil SecureX different from other cybersecurity firms?',
    answer: 'Our deep roots in Africa, combined with international expertise, allow us to provide contextually relevant solutions. We focus on capacity building, policy influence, and sustainable security practices that drive long-term digital transformation.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const { isDark } = useTheme()

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index)

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />
      <div className="absolute inset-0 bg-transparent -z-5" />

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-6xl mx-auto px-6 py-16"
      >
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8 rounded-lg p-6 bg-gray-900 text-white border border-teal-500/20">
          <h1 className="text-4xl font-bold mb-4 text-white text-center">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-center">
            Find answers to common questions about our services and approach.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (

            <motion.div
              key={i}
              className={`${isDark ? 'bg-gray-900 text-gray-100 border-teal-500/20' : 'bg-white text-gray-900 border-gray-200'} p-4 rounded-lg shadow-lg border transition`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className={`w-full text-left font-bold flex justify-between items-center transition ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                <span className="text-lg md:text-2xl leading-tight">{faq.question}</span>
                <span className="text-2xl text-teal-400 font-semibold">{openIndex === i ? '−' : '+'}</span>
              </button>

              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-4 text-left leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'} text-base md:text-lg`}
                >
                  <div className="prose prose-lg max-w-none">{faq.answer}</div>
                  <div className="mt-4 pt-4 border-t border-teal-500/20">
                    <p className="text-sm text-gray-500 mb-2">Need more help?</p>
                    <Link
                      to="/customer-service"
                      className="text-teal-400 hover:text-cyan-300 transition text-sm underline"
                    >
                      Contact Customer Service
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

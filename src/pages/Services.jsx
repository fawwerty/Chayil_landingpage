import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const services = [
  {
    id: 'grc-consulting',
    title: 'Governance, Risk & Compliance (GRC) Consulting',
    desc: 'We design, implement, and optimize governance frameworks that align with both global standards and local regulatory requirements. Frameworks Covered: ISO 27001, SOC 2, PCI DSS, GDPR, HIPAA, NIST, SOX, FISMA, and CCPA.',
    details: 'Our GRC consulting services include comprehensive framework design, implementation strategies, and ongoing optimization. We specialize in aligning global standards with local African regulatory requirements, ensuring your organization maintains compliance while achieving operational excellence. Our expert consultants work closely with your leadership team to establish governance structures that support business objectives while managing risks effectively.',
    features: ['Framework Design & Implementation', 'Compliance Mapping & Assessment', 'Risk Management Strategy', 'Policy Development', 'Training & Awareness Programs', 'Ongoing Compliance Monitoring']
  },
  {
    id: 'cybersecurity-assurance',
    title: 'Cybersecurity Assurance & Risk Management',
    desc: 'We provide proactive and defensive cybersecurity solutions that go beyond compliance to build resilience. Services Offered: Cybersecurity audits, penetration testing, vulnerability assessments, ransomware resilience planning, insider threat monitoring, and incident response.',
    details: 'Our cybersecurity assurance services focus on building robust defenses against modern threats. We conduct thorough assessments, implement proactive monitoring, and develop comprehensive incident response plans to protect your digital assets. Our team of certified security professionals uses industry-leading tools and methodologies to identify vulnerabilities and strengthen your security posture.',
    features: ['Comprehensive Security Audits', 'Penetration Testing & Ethical Hacking', 'Vulnerability Assessments', 'Ransomware Protection Planning', 'Insider Threat Detection', '24/7 Incident Response', 'Security Awareness Training']
  },
  {
    id: 'it-audit',
    title: 'IT Audit & Vendor Risk Management',
    desc: 'We assess IT controls, governance structures, and third-party/vendor risks to ensure compliance and security across the value chain. Scope: IT governance, system controls evaluation, vendor due diligence, and third-party risk assessments.',
    details: 'Our IT audit services provide comprehensive evaluation of your technology infrastructure and vendor relationships. We identify control weaknesses, assess vendor risks, and provide actionable recommendations for improvement. Our systematic approach ensures that your IT environment supports business objectives while maintaining security and compliance standards.',
    features: ['IT Governance Review', 'System Controls Evaluation', 'Vendor Due Diligence', 'Third-Party Risk Assessment', 'Compliance Reporting', 'Remediation Planning', 'Continuous Monitoring Setup']
  },
  {
    id: 'regulatory-alignment',
    title: 'Regulatory Alignment & Compliance Readiness',
    desc: 'We prepare organizations to meet both local and international regulatory requirements. Services Offered: Pre-audit assessments, gap analysis, certification readiness programs, and regulator engagement support.',
    details: 'We help organizations navigate complex regulatory landscapes with confidence. Our experts provide gap analysis, readiness assessments, and strategic guidance to ensure successful regulatory compliance. We stay current with evolving regulations and help you build sustainable compliance programs that adapt to changing requirements.',
    features: ['Regulatory Gap Analysis', 'Certification Readiness Programs', 'Pre-Audit Assessments', 'Regulator Engagement Support', 'Compliance Roadmap Development', 'Documentation & Evidence Preparation']
  },
  {
    id: 'capacity-building',
    title: 'Capacity Building & Training',
    desc: 'We invest in building the next generation of cyber leaders through structured training and development initiatives. Programs: Corporate training workshops in GRC, cybersecurity, and IT audit. University partnerships to deliver cybersecurity learning modules.',
    details: 'Our training programs are designed to build cybersecurity expertise across your organization. From executive awareness to technical deep-dives, we provide comprehensive education to empower your team. Our university partnerships ensure that the next generation of African cyber professionals receives world-class training aligned with industry needs.',
    features: ['Executive Cybersecurity Awareness', 'Technical Training Workshops', 'Certification Preparation', 'Custom Training Programs', 'University Partnerships', 'Ongoing Skill Development', 'Knowledge Transfer Programs']
  },
  {
    id: 'grc-automation',
    title: 'GRC Automation',
    desc: 'Chayil SecureX is investing in automation tools to transform compliance from a manual, costly exercise into a seamless, technology-enabled process. Platform Partner: Swiss GRC. Capabilities: Real-time monitoring, automated reporting, risk dashboards, regulatory updates, and workflow management.',
    details: 'We leverage cutting-edge automation tools to streamline your compliance processes. Our Swiss GRC platform integration provides real-time monitoring, automated reporting, and intelligent risk management. This transformation reduces manual effort, improves accuracy, and enables proactive compliance management.',
    features: ['Real-time Compliance Monitoring', 'Automated Reporting & Dashboards', 'Risk Assessment Automation', 'Regulatory Update Alerts', 'Workflow Management', 'Integration Capabilities', 'Custom Automation Solutions']
  }
]

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const { isDark } = useTheme()

  const handleServiceClick = (service) => {
    if (selectedService && selectedService.id === service.id) {
      setSelectedService(null)
    } else {
      setSelectedService(service)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBookAppointment = () => {
    setShowAppointmentForm(true)
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background5.jpg')" }}>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-6xl mx-auto px-4 py-12 min-h-screen"
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Our Services</h1>
        <p className="text-gray-300 mb-6 max-w-4xl mx-auto">
          Comprehensive GRC and Cybersecurity solutions tailored for African organizations.
        </p>

        {selectedService && !showAppointmentForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-8 rounded-lg mb-8 border border-teal-500/30 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-teal-400">{selectedService.title}</h2>
            <p className="text-gray-300 mb-6">{selectedService.details}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {selectedService.features.map((feature, i) => (
                <div key={i} className="bg-gray-800 p-3 rounded text-cyan-300 border border-teal-500/20">
                  {feature}
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleBookAppointment}
                className="bg-teal-500 text-black px-6 py-2 rounded hover:bg-teal-400 transition font-semibold"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="bg-gray-700 text-gray-300 px-6 py-2 rounded hover:bg-gray-600 transition border border-teal-500/20"
              >
                Back to Services
              </button>
            </div>
          </motion.div>
        )}

        {showAppointmentForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-8 rounded-lg mb-8 border border-teal-500/30 shadow-lg max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-teal-400">Book Appointment</h2>
            <p className="text-gray-300 mb-4">Service: {selectedService.title}</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Appointment booked!'); setShowAppointmentForm(false); setSelectedService(null); }} className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
              <input type="email" placeholder="Email" className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
              <input type="tel" placeholder="Phone" className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" required />
              <input type="date" className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300" required />
              <select className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300" required>
                <option value="">Select Time</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
              <textarea placeholder="Additional Notes" className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500" rows="3"></textarea>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-teal-500 text-black py-2 rounded hover:bg-teal-400 transition font-semibold">Book Appointment</button>
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-2 rounded hover:bg-gray-600 transition border border-teal-500/20"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              onClick={() => handleServiceClick(service)}
              className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg border border-teal-500/20 cursor-pointer hover:border-teal-400/60 hover:shadow-teal-500/20 transition"
            >
              <h3 className="font-semibold text-lg mb-2 text-teal-400">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

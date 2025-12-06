import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Services() {
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const { isDark } = useTheme();

  const services = [
    {
      id: "grc-consulting",
      title: "GRC Consulting",
      desc: "Comprehensive Governance, Risk & Compliance advisory services.",
      details: "Our GRC Consulting services help organizations establish robust governance frameworks, manage risks effectively, and ensure compliance with international standards and local regulations.",
      features: ["Risk Assessment", "Compliance Audits", "Policy Development", "Governance Frameworks"]
    },
    {
      id: "cybersecurity-assurance",
      title: "Cybersecurity Assurance",
      desc: "Advanced cybersecurity solutions to protect your digital assets.",
      details: "We provide end-to-end cybersecurity assurance, including threat detection, incident response, and continuous monitoring to safeguard your organization against cyber threats.",
      features: ["Vulnerability Scanning", "Penetration Testing", "Incident Response", "Security Monitoring"]
    },
    {
      id: "it-audit",
      title: "IT Audit",
      desc: "Thorough IT audits to ensure system integrity and compliance.",
      details: "Our IT audit services evaluate your information systems, controls, and processes to identify vulnerabilities and ensure alignment with best practices and regulatory requirements.",
      features: ["Control Assessment", "System Reviews", "Compliance Checks", "Audit Reporting"]
    },
    {
      id: "regulatory-alignment",
      title: "Regulatory Alignment",
      desc: "Navigate complex regulatory landscapes with expert guidance.",
      details: "We help organizations understand and comply with evolving regulations, including data protection laws, financial regulations, and industry-specific standards.",
      features: ["Regulatory Mapping", "Compliance Strategies", "Documentation Support", "Training Programs"]
    },
    {
      id: "capacity-building",
      title: "Capacity Building",
      desc: "Empower your team with knowledge and skills in GRC and cybersecurity.",
      details: "Our training programs build internal capabilities, equipping your staff with the knowledge and skills needed to maintain strong security postures and compliance.",
      features: ["Technical Training", "Awareness Programs", "Certification Preparation", "Ongoing Support"]
    }
  ];

  useEffect(() => {
    if (id) {
      const service = services.find(s => s.id === id);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [id, services]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleBookAppointment = () => {
    setShowAppointmentForm(true);
  };

  // Appointment form state
  const [apptName, setApptName] = useState("");
  const [apptEmail, setApptEmail] = useState("");
  const [apptPhone, setApptPhone] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [apptTime, setApptTime] = useState("");
  const [apptNotes, setApptNotes] = useState("");
  const [apptStatus, setApptStatus] = useState("idle");
  const [apptMessage, setApptMessage] = useState("");

  const getAppointmentsEndpoint = () => {
    // In development, backend proxy runs on port 3001 (backend_proxy/server.js)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return 'http://localhost:3001/api/appointments';
    }
    // In production (Vercel), the serverless function lives at /api/appointments
    return '/api/appointments';
  };

  const handleApptSubmit = async (e) => {
    e.preventDefault();
    setApptStatus('loading');

    try {
      const payload = {
        name: apptName,
        email: apptEmail,
        phone: apptPhone,
        date: apptDate,
        time: apptTime,
        notes: apptNotes,
        service: selectedService?.title || ''
      };

      const res = await fetch(getAppointmentsEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      setApptStatus('success');
      setApptMessage('Appointment requested — we will confirm shortly.');
      // clear
      setApptName(''); setApptEmail(''); setApptPhone(''); setApptDate(''); setApptTime(''); setApptNotes('');

      setTimeout(() => {
        setShowAppointmentForm(false);
        setSelectedService(null);
        setApptStatus('idle');
        setApptMessage('');
      }, 2200);
    } catch (err) {
      console.error('Appointment submission failed:', err);
      setApptStatus('error');
      setApptMessage(err.message || 'Submission failed');
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 -z-5" />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center max-w-6xl mx-auto px-4 py-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-teal-400">Our Services</h1>

        {/* Intro Box */}
        <div className={`p-6 rounded-lg shadow-lg border max-w-4xl mx-auto mb-8 transition backdrop-blur-sm ${isDark ? 'bg-gray-900/92 border-teal-500/20 text-gray-100' : 'bg-white/95 border-teal-500/10 text-gray-900'}`}>
          <p className="text-base leading-relaxed md:text-lg">
            Comprehensive GRC and Cybersecurity solutions tailored for African organizations.
          </p>
        </div>

        {/* Selected Service Details */}
          {selectedService && !showAppointmentForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-lg mb-8 border shadow-lg transition backdrop-blur-md ${isDark ? 'bg-gray-900/94 border-teal-500/30 text-gray-100' : 'bg-white/95 border-teal-500/20 text-gray-900'}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-teal-400">{selectedService.title}</h2>
            <p className="mb-6 leading-relaxed text-base md:text-lg">{selectedService.details}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {selectedService.features.map((feature, i) => (
                <div key={i} className={`p-3 rounded text-cyan-300 border transition ${isDark ? 'bg-gray-800/80 border-teal-500/10 text-gray-100' : 'bg-white/90 border-teal-500/10 text-gray-800'}`}>
                  <div className="text-sm md:text-base leading-snug">{feature}</div>
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

        {/* Appointment Form */}
        {showAppointmentForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-lg mb-8 border shadow-lg max-w-md mx-auto transition backdrop-blur-md ${isDark ? 'bg-gray-900/94 border-teal-500/30 text-gray-100' : 'bg-white/95 border-teal-500/20 text-gray-900'}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-teal-400">Book Appointment</h2>
            <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Service: {selectedService?.title}</p>
            <form onSubmit={handleApptSubmit} className="space-y-4">
              <input value={apptName} onChange={e=>setApptName(e.target.value)} type="text" placeholder="Full Name" className={`w-full p-3 rounded border ${isDark ? 'bg-gray-800/80 border-teal-500/10 text-gray-100 placeholder-gray-400' : 'bg-white/95 border-gray-200 text-gray-900 placeholder-gray-500'}`} required />
              <input value={apptEmail} onChange={e=>setApptEmail(e.target.value)} type="email" placeholder="Email" className={`w-full p-3 rounded border ${isDark ? 'bg-gray-800/80 border-teal-500/10 text-gray-100 placeholder-gray-400' : 'bg-white/95 border-gray-200 text-gray-900 placeholder-gray-500'}`} required />
              <input value={apptPhone} onChange={e=>setApptPhone(e.target.value)} type="tel" placeholder="Phone" className={`w-full p-3 rounded border ${isDark ? 'bg-gray-800/80 border-teal-500/10 text-gray-100 placeholder-gray-400' : 'bg-white/95 border-gray-200 text-gray-900 placeholder-gray-500'}`} required />
              <input value={apptDate} onChange={e=>setApptDate(e.target.value)} type="date" className={`w-full p-3 rounded border ${isDark ? 'bg-gray-800/80 border-teal-500/10 text-gray-100' : 'bg-white/95 border-gray-200 text-gray-900'}`} required />
              <select value={apptTime} onChange={e=>setApptTime(e.target.value)} className={`w-full p-3 rounded border ${isDark ? 'bg-gray-800/80 border-teal-500/10 text-gray-100' : 'bg-white/95 border-gray-200 text-gray-900'}`} required>
                <option value="">Select Time</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
              <textarea value={apptNotes} onChange={e=>setApptNotes(e.target.value)} placeholder="Additional Notes" className={`w-full p-3 rounded border ${isDark ? 'bg-gray-800/80 border-teal-500/10 text-gray-100 placeholder-gray-400' : 'bg-white/95 border-gray-200 text-gray-900 placeholder-gray-500'}`} rows="3"></textarea>

              {apptStatus === 'error' && <p className="text-xs text-red-400">{apptMessage}</p>}
              {apptStatus === 'success' && <p className="text-xs text-green-400">{apptMessage}</p>}

              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-teal-500 text-black py-2 rounded hover:bg-teal-400 transition font-semibold">{apptStatus === 'loading' ? 'Sending...' : 'Book Appointment'}</button>
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className={`p-6 rounded-lg shadow-lg border cursor-pointer transition hover:-translate-y-1 backdrop-blur-sm ${isDark ? 'bg-gray-900/98 border-teal-500/20 text-gray-100 hover:border-teal-400/40 hover:shadow-teal-500/20' : 'bg-white border-teal-500/10 text-gray-900 hover:border-teal-500/30'}`}
            >
              <Link to={`/services/${service.id}`} onClick={() => handleServiceClick(service)}>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white text-xl' : 'text-teal-600 text-xl'}`}>{service.title}</h3>
                <p className={`${isDark ? 'text-gray-200' : 'text-gray-700'} text-base leading-relaxed`}>{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

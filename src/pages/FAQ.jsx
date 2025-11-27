import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const faqs = [
  {
    question: "What services does Chayil SecureX offer?",
    answer:
      "We offer comprehensive GRC consulting, cybersecurity assurance, IT audit, regulatory compliance, capacity building, and GRC automation services tailored for African organizations. Our services are designed to address the unique challenges faced by African businesses in the global digital economy.",
  },
  {
    question: "Do you work with small and medium enterprises?",
    answer:
      "Yes, we specialize in serving SMEs, governments, and enterprises across Africa, providing scalable solutions that fit different organizational sizes and budgets. Our approach ensures that even small businesses can access world-class cybersecurity and compliance services.",
  },
  {
    question: "What certifications do you help with?",
    answer:
      "We assist with ISO 27001, SOC 2, PCI DSS, GDPR, HIPAA, NIST, SOX, FISMA, and CCPA compliance, among others. Our team stays current with evolving regulatory requirements and provides comprehensive support throughout the certification process.",
  },
  {
    question: "Where are you located?",
    answer:
      "We are headquartered at the Accra Digital Centre in Ghana and serve clients across Africa and internationally. Our strategic location allows us to understand local contexts while maintaining global standards.",
  },
  {
    question: "How do you approach cybersecurity for African markets?",
    answer:
      "We combine global best practices with deep understanding of African market realities. Our solutions address local infrastructure challenges, regulatory environments, and cultural contexts while ensuring compliance with international standards.",
  },
  {
    question:
      "What makes Chayil SecureX different from other cybersecurity firms?",
    answer:
      "Our deep roots in Africa, combined with international expertise, allow us to provide contextually relevant solutions. We focus on capacity building, policy influence, and sustainable security practices that drive long-term digital transformation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { isDark } = useTheme();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background5.jpg')" }}
    >
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-6xl mx-auto px-4 py-12 min-h-screen"
      >
        <h1 className="text-4xl font-bold mb-4 text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-300 mb-6 max-w-4xl mx-auto">
          Find answers to common questions about our services and approach.
        </p>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-gray-900 text-gray-300 p-4 rounded-lg shadow-lg border border-teal-500/20"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full text-left font-semibold text-lg flex justify-between items-center text-teal-400 hover:text-cyan-300 transition"
              >
                {faq.question}
                <span className="text-2xl text-cyan-300">
                  {openIndex === i ? "-" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-gray-400 mt-4 text-left leading-relaxed"
                >
                  {faq.answer}
                  <div className="mt-4 pt-4 border-t border-teal-500/20">
                    <p className="text-sm text-gray-500 mb-2">
                      Need more help?
                    </p>
                    <a
                      href="/customer-service"
                      className="text-teal-400 hover:text-cyan-300 transition text-sm underline"
                    >
                      Contact Customer Service
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'John Doe',
    role: 'CEO, TechCorp Ghana',
    content: 'Chayil SecureX helped us achieve ISO 27001 certification seamlessly. Their expertise in African regulatory requirements was invaluable.'
  },
  {
    name: 'Jane Smith',
    role: 'CTO, FinancePlus Nigeria',
    content: 'Outstanding cybersecurity assessment and risk management services. Highly recommend their professional approach.'
  },
  {
    name: 'Michael Johnson',
    role: 'Director, HealthCare Kenya',
    content: 'Their HIPAA compliance consulting was exceptional. They understood our unique healthcare security challenges perfectly.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

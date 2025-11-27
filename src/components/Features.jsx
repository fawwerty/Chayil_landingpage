import { motion } from 'framer-motion'

const features = [
  {
    title: 'Expert Team',
    description: 'Certified professionals with deep expertise in GRC and cybersecurity.'
  },
  {
    title: 'Local Expertise',
    description: 'Understanding of African regulatory landscape and business environment.'
  },
  {
    title: 'Global Standards',
    description: 'Compliance with international frameworks and best practices.'
  },
  {
    title: 'Proven Track Record',
    description: 'Successful implementations across various industries and sectors.'
  }
]

export default function Features() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Chayil SecureX?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

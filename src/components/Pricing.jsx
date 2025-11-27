import { motion } from 'framer-motion'

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Contact Us',
    description: 'Perfect for small businesses getting started with compliance.',
    features: [
      'Basic GRC Assessment',
      'Compliance Gap Analysis',
      'Email Support',
      'Documentation Templates'
    ]
  },
  {
    name: 'Professional',
    price: 'Contact Us',
    description: 'Comprehensive solutions for growing organizations.',
    features: [
      'Full GRC Implementation',
      'Cybersecurity Audits',
      'Training Workshops',
      'Priority Support',
      'Regulatory Monitoring'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'Complete cybersecurity and compliance ecosystem.',
    features: [
      'Everything in Professional',
      'Advanced Threat Detection',
      'Incident Response',
      'Custom Solutions',
      'Dedicated Account Manager'
    ]
  }
]

      "Dedicated security team",
      "Custom compliance frameworks",
      "Advanced threat detection",
      "Executive reporting",
      "24/7 phone support",
      "On-site assessments"
    ],
    popular: false
  }
]

export default function Pricing() {
  return (
    <section className="py-16 bg-brand-gradient">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-brand-white">Service Packages</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Choose the right protection level for your organization's needs. All packages include our core GRC and cybersecurity services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`bg-white/10 backdrop-blur-sm rounded-lg shadow-brand-glow p-8 border border-brand-teal/20 ${plan.popular ? 'border-brand-cyan relative' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-brand-teal to-brand-cyan text-brand-white px-4 py-1 rounded-full text-sm font-medium shadow-brand-glow">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-brand-white">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-brand-white">₵{plan.price}</span>
                  <span className="text-brand-muted">/{plan.period}</span>
                </div>
                <p className="text-brand-muted">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <FaCheck className="text-brand-cyan mr-3 flex-shrink-0" />
                    <span className="text-brand-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                plan.popular
                  ? 'bg-gradient-to-r from-brand-teal to-brand-cyan text-brand-white hover:shadow-brand-glow'
                  : 'bg-brand-black text-brand-white hover:bg-brand-dark border border-brand-teal/20'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-brand-muted mb-4">
            Need a custom solution? Contact us for enterprise pricing and tailored packages.
          </p>
          <button className="bg-brand-black text-brand-white px-8 py-3 rounded-lg hover:bg-brand-dark transition-colors border border-brand-teal/20">
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  )
}

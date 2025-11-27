import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const teamMembers = [
  {
    name: 'Charles Fiifi Hagan',
    role: 'Founder & CEO – Chayil SecureX',
    description: 'Expertise in GRC, IT Audit, Cybersecurity Compliance (ISO 27001, SOC 2, GDPR, HIPAA, PCI DSS, SOX, NIST). Active in African cyber policy dialogues.',
    details: 'Charles Fiifi Hagan is the visionary founder and CEO of Chayil SecureX. With extensive expertise in Governance, Risk & Compliance (GRC), IT Audit, and Cybersecurity Compliance, Charles has been instrumental in shaping cybersecurity policies across Africa. His certifications include ISO 27001 Lead Auditor, SOC 2, GDPR DPO, HIPAA, PCI DSS, SOX, and NIST frameworks. Charles actively participates in African cyber policy dialogues and has advised governments and enterprises on digital transformation strategies. His leadership has positioned Chayil SecureX as a key player in Africa\'s cybersecurity landscape, focusing on bridging the gap between global standards and local regulatory requirements.',
    achievements: ['ISO 27001 Lead Auditor Certified', 'Active African Cyber Policy Contributor', 'Government Cybersecurity Advisor', 'Enterprise Digital Transformation Consultant']
  },
  {
    name: 'Ebenezer Oduro',
    role: 'Chief Operating Officer (COO)',
    description: 'BSc. IT (Ghana), MSc. Cybersecurity (UK). Certified in Cybersecurity (CC), CEH, CISM.',
    details: 'Ebenezer Oduro serves as the Chief Operating Officer, bringing operational excellence to Chayil SecureX. With a BSc in IT from Ghana and an MSc in Cybersecurity from the UK, Ebenezer oversees day-to-day operations and ensures seamless delivery of our services. His certifications include Certified in Cybersecurity (CC), Certified Ethical Hacker (CEH), and Certified Information Security Manager (CISM). Ebenezer specializes in operational risk management and process optimization, ensuring that our clients receive world-class service delivery while maintaining the highest standards of security and compliance.',
    achievements: ['Certified in Cybersecurity (CC)', 'Certified Ethical Hacker (CEH)', 'Certified Information Security Manager (CISM)', 'Operational Excellence Specialist']
  },
  {
    name: 'Silas Asani Abudu',
    role: 'Chief Technology Officer (CTO) / Head of Cybersecurity',
    description: 'MSc Cybersecurity & Digital Forensics. Expertise in Healthcare Cybersecurity, EMR Security, ML for Threat Detection, DevSecOps.',
    details: 'Silas Asani Abudu leads our technology and cybersecurity initiatives as CTO and Head of Cybersecurity. Holding an MSc in Cybersecurity & Digital Forensics, Silas brings deep technical expertise in healthcare cybersecurity, EMR security, machine learning for threat detection, and DevSecOps practices. He has led numerous high-profile security assessments and implementations, focusing on protecting critical infrastructure and sensitive data across various industries. Silas\'s innovative approach combines cutting-edge technology with practical security solutions tailored for African markets.',
    achievements: ['MSc Cybersecurity & Digital Forensics', 'Healthcare Cybersecurity Expert', 'Machine Learning Threat Detection Specialist', 'DevSecOps Implementation Lead']
  }
]

const strategicAdvisors = [
  {
    name: 'Dr. Noah Darko-Adjei',
    role: 'Senior Cybersecurity and Compliance Analyst, CEO - Yesyoucan Cybersecure, Dallas, Texas',
    image: '/advisor1.jpg',
    details: 'Dr. Noah Darko-Adjei is a renowned cybersecurity expert and CEO of Yesyoucan Cybersecure in Dallas, Texas. As a Senior Cybersecurity and Compliance Analyst, Dr. Darko-Adjei provides strategic guidance on global cybersecurity trends and compliance frameworks. His expertise spans multiple regulatory environments and he serves as a key advisor for international cybersecurity initiatives. Dr. Darko-Adjei brings invaluable insights from the global cybersecurity landscape, helping Chayil SecureX stay at the forefront of industry developments.',
    expertise: ['Global Cybersecurity Trends', 'International Compliance Frameworks', 'Regulatory Analysis', 'Strategic Cybersecurity Planning']
  },
  {
    name: 'Ghana Digital Centres Limited',
    role: 'Accra Digital Centre - Agency of the Ghanaian Government',
    image: '/advisor2.jpg',
    details: 'Ghana Digital Centres Limited operates the Accra Digital Centre, a flagship initiative of the Ghanaian Government. As our strategic partner, they provide access to cutting-edge digital infrastructure and government-backed resources. This partnership enables us to deliver world-class cybersecurity solutions with local relevance and global standards. The collaboration with Ghana Digital Centres Limited gives us unique access to government-level resources and positions us to influence national cybersecurity policies and initiatives.',
    partnership: ['Digital Infrastructure Access', 'Government Resource Collaboration', 'Policy Influence Opportunities', 'National Cybersecurity Initiative Support']
  }
]

const tabs = [
  {
    id: 'mission',
    title: 'Our Mission',
    content: 'To simplify compliance, strengthen risk management, and accelerate growth for African organizations through world-class GRC advisory, cybersecurity assurance, and capacity-building initiatives.',
    details: 'Our mission is rooted in the understanding that African organizations face unique challenges in the global digital economy. We bridge the gap between international standards and local realities, providing practical, effective solutions that drive business growth while ensuring security and compliance. Through our comprehensive approach, we empower organizations to focus on their core business objectives while we handle the complexities of cybersecurity and regulatory compliance.'
  },
  {
    id: 'vision',
    title: 'Our Vision',
    content: 'To be Africa\'s trusted partner in building a secure, compliant, and resilient digital economy.',
    details: 'Our vision encompasses a future where African organizations lead in digital innovation, backed by robust cybersecurity frameworks and compliance systems. We envision a continent where businesses can confidently embrace digital transformation, knowing they have trusted partners who understand both global standards and local contexts. This vision drives our commitment to capacity building, technology adoption, and policy influence across Africa.'
  },
  {
    id: 'team',
    title: 'Our Team',
    content: teamMembers,
    details: 'Our diverse team brings together expertise from various domains of cybersecurity, compliance, and technology. Each member contributes unique perspectives shaped by their experiences in African markets and international standards. Together, we form a powerhouse of knowledge and innovation dedicated to advancing cybersecurity across the continent.'
  },
  {
    id: 'advisors',
    title: 'Strategic Advisors',
    content: strategicAdvisors,
    details: 'Our strategic advisors provide invaluable external perspectives and global insights that enhance our capabilities. Their expertise in international markets and regulatory frameworks helps us maintain the highest standards while ensuring our solutions remain relevant and effective in African contexts.'
  }
]

export default function About() {
  const [activeTab, setActiveTab] = useState('mission')
  const [selectedMember, setSelectedMember] = useState(null)
  const { isDark } = useTheme()

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setSelectedMember(null)
  }

  const handleMemberClick = (member) => {
    setSelectedMember(member)
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background5.jpg')" }}>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="min-h-screen py-12 px-4"
      >
        <h1 className={`text-4xl font-bold mb-4 ${
          isDark ? 'text-cyan-300' : 'text-white'
        }`}>About Chayil SecureX</h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-black'} mb-6 max-w-4xl mx-auto`}>
          Building Africa's digital trust through world-class GRC and cybersecurity solutions.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className={`backdrop-blur-sm rounded-lg p-1 flex border ${
            isDark ? 'bg-gray-900 border-teal-500/20' : 'bg-white border-gray-300'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-6 py-2 rounded-md transition ${
                  activeTab === tab.id
                    ? 'bg-teal-500 text-black shadow-lg'
                    : isDark
                      ? 'text-gray-300 hover:text-cyan-300'
                      : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`backdrop-blur-sm p-8 rounded-xl shadow-lg border ${
          isDark ? 'bg-gray-900 border-teal-500/20' : 'bg-white border-gray-300'
        }`}>
          {activeTab === 'mission' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                isDark ? 'text-teal-400' : 'text-gray-900'
              }`}>Our Mission</h2>
              <p className={`text-lg leading-relaxed max-w-4xl mx-auto mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {tabs[0].content}
              </p>
              <p className={`leading-relaxed max-w-4xl mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {tabs[0].details}
              </p>
            </motion.div>
          )}

          {activeTab === 'vision' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                isDark ? 'text-teal-400' : 'text-gray-900'
              }`}>Our Vision</h2>
              <p className={`text-lg leading-relaxed max-w-4xl mx-auto mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {tabs[1].content}
              </p>
              <p className={`leading-relaxed max-w-4xl mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {tabs[1].details}
              </p>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className={`text-3xl font-bold text-center mb-8 ${
                isDark ? 'text-teal-400' : 'text-gray-900'
              }`}>Our Team</h2>
              <p className={`leading-relaxed max-w-4xl mx-auto mb-8 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {tabs[2].details}
              </p>
              {selectedMember ? (
                <div className="text-center">
                  <img src={selectedMember.name === 'Charles Fiifi Hagan' ? '/ceo.jpg' : ''} alt={selectedMember.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-2 border-teal-500" />
                  <h3 className="text-2xl font-bold mb-4 text-cyan-300">{selectedMember.name}</h3>
                  <p className="text-teal-400 mb-4">{selectedMember.role}</p>
                  <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6">{selectedMember.details}</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {selectedMember.achievements.map((achievement, i) => (
                      <div key={i} className="bg-gray-800 p-3 rounded text-cyan-300 border border-teal-500/20">
                        {achievement}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="bg-gray-700 text-gray-300 px-6 py-2 rounded hover:bg-gray-600 transition border border-teal-500/20"
                  >
                    Back to Team
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      onClick={() => handleMemberClick(member)}
                      className="text-center cursor-pointer hover:bg-gray-800 p-4 rounded-lg transition border border-teal-500/20 hover:border-teal-400/60"
                    >
                      <img src={member.name === 'Charles Fiifi Hagan' ? '/ceo.jpg' : ''} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border border-teal-500" />
                      <h3 className="font-semibold text-cyan-300">{member.name}</h3>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                      <p className="text-gray-500 text-xs mt-2">{member.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'advisors' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className={`text-3xl font-bold text-center mb-8 ${
                isDark ? 'text-teal-400' : 'text-gray-900'
              }`}>Strategic Advisors</h2>
              <p className={`leading-relaxed max-w-4xl mx-auto mb-8 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {tabs[3].details}
              </p>
              {selectedMember ? (
                <div className="text-center">
                  <img src={selectedMember.image} alt={selectedMember.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-2 border-teal-500" />
                  <h3 className="text-2xl font-bold mb-4 text-cyan-300">{selectedMember.name}</h3>
                  <p className="text-teal-400 mb-4">{selectedMember.role}</p>
                  <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6">{selectedMember.details}</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {(selectedMember.expertise || selectedMember.partnership).map((item, i) => (
                      <div key={i} className="bg-gray-800 p-3 rounded text-cyan-300 border border-teal-500/20">
                        {item}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="bg-gray-700 text-gray-300 px-6 py-2 rounded hover:bg-gray-600 transition border border-teal-500/20"
                  >
                    Back to Advisors
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {strategicAdvisors.map((advisor, index) => (
                    <div
                      key={index}
                      onClick={() => handleMemberClick(advisor)}
                      className="text-center cursor-pointer hover:bg-gray-800 p-4 rounded-lg transition border border-teal-500/20 hover:border-teal-400/60"
                    >
                      <img src={advisor.image} alt={advisor.name} className="w-24 h-24 rounded-full mx-auto mb-4 border border-teal-500" />
                      <h3 className="font-semibold text-cyan-300">{advisor.name}</h3>
                      <p className="text-gray-400 text-sm">{advisor.role}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  )
}

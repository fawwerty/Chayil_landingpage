import SocialIcons from "./SocialIcons";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("")

  return (
    <footer
      // Added 'font-poppins' assuming this is configured in tailwind.config.js
      className={`${
        isDark ? "bg-gray-950 text-gray-300" : "bg-gray-50 text-gray-800"
      } mt-12 py-16 transition-colors duration-300 font-poppins`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section (Logo, Services, Explore, Contact/Newsletter) */}
        {/* Responsive grid: 1 col on mobile, 4 on medium screens */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Brand Name (Takes 2 cols on mobile, 1 on small screens, 1 on medium screens) */}
          {/* Note: Original was col-span-2 sm:col-span-1. Changed to col-span-1 for better alignment on small screens. */}
          <div className="col-span-1 flex flex-col justify-start items-start">
            <div className="flex items-center mb-4">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.jpg`}
                alt="Chayil SecureX Logo"
                className="h-10 w-auto mr-2 rounded-full"
              />
              <span className="text-xl font-extrabold tracking-wider">
                Chayil SecureX
              </span>
            </div>
            {/* Short descriptive line for context */}
            <p className="text-sm">
              Empowering digital resilience across Africa.
            </p>
          </div>

          {/* Service Section (Inherits responsiveness from parent grid) */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-teal-500"
                >
                  Governance, Risk & Compliance (GRC) Consulting
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-teal-500"
                >
                  Cybersecurity Assurance & Risk Management
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-teal-500"
                >
                  IT Audit & Vendor Risk Management
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-teal-500"
                >
                  Regulatory Alignment & Compliance Readiness
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-teal-500"
                >
                  Capacity Building & Training
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-teal-500"
                >
                  GRC Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Section (Inherits responsiveness from parent grid) */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="transition-colors hover:text-teal-500">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="transition-colors hover:text-teal-500"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="transition-colors hover:text-teal-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Office + Newsletter (Inherits responsiveness from parent grid) */}
          <div>
            <h3 className="font-bold mb-4 text-lg">OFFICE LOCATION</h3>
            <p className="text-sm mb-6">Accra Digital Centre, Accra, Ghana</p>

            <h3 className="font-bold mb-4 text-lg">Newsletter</h3>
            <p className="text-xs mb-4">
              Subscribe for insights on GRC, cybersecurity, and professional
              services.
            </p>

            <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`w-full border rounded-md py-2 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    isDark
                      ? "bg-gray-800 border-gray-600 placeholder-gray-400 text-white"
                      : "bg-white border-gray-300 placeholder-gray-500 text-gray-800"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                      alert('Please enter a valid email address')
                      return
                    }
                    try {
                      const list = JSON.parse(localStorage.getItem('newsletter') || '[]')
                      if (!list.includes(email)) list.push(email)
                      localStorage.setItem('newsletter', JSON.stringify(list))
                      setEmail('')
                      alert('Thanks — you are subscribed!')
                    } catch (e) {
                      console.warn(e)
                      alert('Subscribed (local).')
                    }
                  }}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 text-lg cursor-pointer transition-colors hover:text-teal-400"
                >
                  ✉
                </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t ${
            isDark ? "border-gray-700" : "border-gray-200"
          } mt-10 pt-6`}
        />

        {/* Social Icons */}
        <div className="flex justify-center mb-6">
          <SocialIcons />
        </div>

        {/* Copyright */}
        <p className="text-center text-sm font-medium mb-4">
          &copy; 2025 Chayil SecureX. All Rights Reserved.
        </p>

        {/* Introductory Sentence */}
        <p className="text-center max-w-2xl mx-auto text-xs font-medium mb-6">
          Chayil SecureX empowers organizations across Africa with GRC
          automation and cybersecurity solutions, helping businesses mitigate
          risk and achieve operational excellence.
        </p>

        {/* Bottom Paragraphs: Two Side-by-Side Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-xs leading-relaxed font-medium mt-6">
          <p>
            Our platform delivers a unified **Governance, Risk & Compliance
            (GRC)** solution, combining risk assessments, compliance monitoring,
            audit readiness, and security control management under one roof.
            Through automated workflows and real-time dashboards, you gain clear
            visibility into your compliance posture against global standards
            (ISO 27001, SOC 2, GDPR). Automated reporting and control-mapping
            are built in to ensure you stay audit-ready year-round, minimizing
            manual effort and error.
          </p>
          <p>
            Beyond the platform, we provide expert consulting services and
            certification-ready readiness programs, including security
            governance, vendor-risk assessments, and incident response
            preparation. We support continuous risk monitoring and compliance
            lifecycle management, helping you adapt swiftly to regulatory
            changes and emerging cyber threats. Our approach helps you turn
            compliance from a cost center into a strategic asset that builds
            trust and long-term business resilience.
          </p>
        </div>
      </div>
    </footer>
  );
}


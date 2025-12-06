import SocialIcons from "./SocialIcons";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  return (
    <footer
      className={`${
        isDark ? "bg-gray-950 text-gray-300" : "bg-gray-50 text-gray-800"
      } py-14 transition-all duration-300 border-t ${
        isDark ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* LOGO */}
          <div>
            <div className="flex items-center mb-2">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.jpg`}
                alt="Chayil SecureX Logo"
                className="h-8 w-8 rounded-full border border-gray-700 object-cover"
              />
              <span className="ml-2 text-base font-bold tracking-wide">
                Chayil SecureX
              </span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Empowering digital resilience across Africa.
            </p>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wide uppercase opacity-90">
              Services
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              {[
                ["grc-consulting", "GRC Consulting"],
                ["cybersecurity-assurance", "Cybersecurity"],
                ["it-audit", "IT Audit"],
                ["regulatory-alignment", "Compliance"],
                ["capacity-building", "Training"],
              ].map(([path, label]) => (
                <li key={path}>
                  <Link
                    to={`/services/${path}`}
                    className="hover:text-teal-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wide uppercase opacity-90">
              Explore
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              {[
                ["/", "Home"],
                ["/about", "About Us"],
                ["/contact", "Contact"],
                ["/policy", "Policy"],
                ["/terms-and-conditions", "Terms & Conditions"],
                ["/cookie-policy", "Cookie Policy"],
              ].map(([path, label]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="hover:text-teal-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wide uppercase opacity-90">
              Newsletter
            </h3>
            <p className="text-sm opacity-80 mb-3">
              Join our mailing list for updates.
            </p>

            {/* FIXED + MODERNIZED INPUT + BUTTON */}
            <div className="flex md:justify-start">
              <div className="flex items-center w-full max-w-md bg-gray-100 dark:bg-gray-800 
                              backdrop-blur-md rounded-full px-3 py-2 border 
                              border-gray-300 dark:border-gray-700 shadow-sm">
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent text-sm px-3 py-2 outline-none 
                             placeholder-gray-500 dark:placeholder-gray-400 
                             text-gray-800 dark:text-gray-200"
                />

                <button
                  onClick={() => {
                    const trimmed = email.trim();
                    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
                      setStatus("error");
                      setMessage("Invalid email");
                      return;
                    }

                    try {
                      const list = JSON.parse(localStorage.getItem("newsletter") || "[]");
                      if (!list.includes(trimmed)) list.push(trimmed);
                      localStorage.setItem("newsletter", JSON.stringify(list));

                      setEmail("");
                      setStatus("success");
                      setMessage("Subscribed!");
                      setTimeout(() => {
                        setStatus("idle");
                        setMessage("");
                      }, 2500);
                    } catch (e) {
                      setStatus("error");
                      setMessage("An error occurred");
                    }
                  }}
                  className="ml-2 px-5 py-2 rounded-full text-xs font-semibold text-white
                             bg-gradient-to-r from-teal-500 to-cyan-500 
                             hover:from-teal-400 hover:to-cyan-400 
                             active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {status === "error" && (
              <p className="text-xs text-red-400 mt-2">{message}</p>
            )}
            {status === "success" && (
              <p className="text-xs text-green-400 mt-2">{message}</p>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div
          className={`border-t ${
            isDark ? "border-gray-700" : "border-gray-300"
          } my-2`}
        />

        {/* BOTTOM */}
        <div className="flex flex-col items-center gap-2">
          <SocialIcons />
          <p className="text-xs opacity-70">
            © 2025 Chayil SecureX. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
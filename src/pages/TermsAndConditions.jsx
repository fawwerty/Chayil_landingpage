import { useTheme } from "../context/ThemeContext";

export default function TermsAndConditions() {
  const { isDark } = useTheme();

  const bgImage = `${import.meta.env.BASE_URL}images/background4.jpg`;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-white/40'}`} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-400">Terms and Conditions</h1>
        <div className={`p-6 rounded-lg shadow-lg backdrop-blur-sm ${isDark ? "bg-gray-900/70 text-gray-300 border border-gray-800" : "bg-white/80 text-gray-800 border border-gray-200"}`}>
          <p className="mb-4">
            Welcome to Chayil SecureX. These Terms and Conditions govern your use of our website and services.
          </p>
          <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing our website, you agree to be bound by these terms.
          </p>
          <h2 className="text-xl font-semibold mb-2">Use of Services</h2>
          <p className="mb-4">
            Our services are provided for informational and professional purposes only.
          </p>
          <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
          <p className="mb-4">
            Chayil SecureX shall not be liable for any indirect damages arising from your use of our services.
          </p>
          <p>
            For questions, contact us at legal@chayilsecurex.com.
          </p>
        </div>
      </div>
    </div>
  );
}

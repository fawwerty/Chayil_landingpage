import { Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import CustomerService from "./pages/CustomerService";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  // const { user, requires2FA } = useAuth();
  const isDashboard =
    location.pathname.includes("dashboard") || location.pathname === "/2fa";

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-black dark:bg-transparent dark:text-white transition-colors duration-300">
      {!isDashboard && <Header />}
      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="/contact" element={<Contact />} />
          {/* Admin and client routes removed (not publicly hosted) */}
          {/* Removed client/admin routes for deleted components */}

          {/* Redirects */}
          {/* <Route path="/dashboard" element={<DashboardRedirect />} /> */}

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

// Redirect user based on role
function DashboardRedirect() {
  const { user, requires2FA } = useAuth();

  if (requires2FA) return <Navigate to="/2fa" replace />;
  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    default:
      return <Navigate to="/login" replace />;
  }
}

// Unauthorized page
function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900/80">
      <div className="bg-gray-800/95 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl text-red-500 font-bold mb-4">Access Denied</h2>
        <p className="text-gray-300 mb-6">
          You don't have permission to view this page.
        </p>
        <Link
          to="/dashboard"
          className="text-teal-400 hover:text-cyan-300 font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

// 404 page
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900/80">
      <div className="bg-gray-800/95 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl text-red-400 font-bold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-300 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="text-teal-400 hover:text-cyan-300 font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

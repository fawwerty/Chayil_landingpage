import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  // Helper: redirect based on role
  const redirectByRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/');
        break;
      case 'client':
        navigate('/');
        break;
      case 'analyst':
        navigate('/');
        break;
      default:
        navigate('/'); // fallback
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.redirect) {
        // Use setTimeout to ensure state is updated before navigation
        setTimeout(() => navigate(result.redirect), 0);
      } else {
        redirectByRole(result.user.role);
      }
    } else {
      setError(result.error);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);

    const result = await googleLogin();
    setGoogleLoading(false);

    if (result.success) {
      redirectByRole(result.user.role);
    } else {
      setError(result.error || 'Google login failed');
    }
  };

  return (
    <div className="relative flex justify-center items-center py-20 min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/background5.jpg')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 -z-5"></div>

      {/* Main content */}
      <div className="bg-gray-900 p-8 rounded-lg shadow max-w-md w-full border border-teal-500/20 relative z-10">
        <h2 className="text-2xl font-semibold mb-2 text-cyan-300">Welcome back</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-black py-2 rounded hover:bg-teal-400 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {/* Google Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083h-1.27v-.002H24v7.831h11.185c-1.233 3.957-5.017 6.793-11.185 6.793-6.61 0-12-5.389-12-12s5.39-12 12-12c3.042 0 5.817 1.14 7.943 3l5.651-5.652C34.565 8.02 29.607 6 24 6 12.954 6 4 14.954 4 26s8.954 20 20 20c11.27 0 19.354-7.91 19.354-19.354 0-1.306-.131-2.565-.243-3.613z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.568 4.822c1.624-3.14 4.911-5.184 8.813-5.184 2.99 0 5.361 1.02 7.232 2.66l4.845-4.845C24.866 8.39 19.902 6 14 6 9.104 6 4.88 8.971 3.002 14.598z"/>
              <path fill="#4CAF50" d="M24 42c5.52 0 10.39-2.917 12.905-7.297l-6.01-4.92c-1.485 1.02-3.376 1.637-5.104 1.637-4.412 0-8.146-2.95-9.417-6.922l-6.162 4.74C11.686 37.234 17.277 42 24 42z"/>
              <path fill="#1976D2" d="M43.611 20.083h-1.27v-.002H24v7.831h11.185c-.766 2.448-2.89 4.428-5.63 5.304v.006l6.052 4.955c3.994-3.69 6.205-9.102 6.205-15.094 0-1.306-.131-2.565-.243-3.613z"/>
            </svg>
            <span>{googleLoading ? 'Signing in with Google...' : 'Sign in with Google'}</span>
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-4">Don't have an account? Please contact the site admin.</p>
      </div>
    </div>
  );
}

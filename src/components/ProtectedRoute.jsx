import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [], requireAuth = true }) {
  const { user, loading, requires2FA } = useAuth();

  // Show loading spinner while auth state is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <div className="text-cyan-300 text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // If auth is required but user is not logged in, redirect to home (no public login)
  if (requireAuth && !user) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in but needs 2FA, redirect to 2FA page
  if (user && requires2FA) {
    return <Navigate to="/2fa" replace />;
  }

  // If allowedRoles is defined and user role is not in allowedRoles, redirect to unauthorized
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If everything is fine, render children
  return children;
}

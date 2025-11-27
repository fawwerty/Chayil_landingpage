import { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);
  const [pending2FAEmail, setPending2FAEmail] = useState(null);

  // Wait until Google API loads
  const waitForGoogle = () => new Promise((resolve, reject) => {
    const timeout = 15000, intervalTime = 100;
    let elapsedTime = 0;

    if (window.googleApiLoaded) return resolve();
    if (window.googleApiLoadFailed) return reject(new Error('Google API failed to load'));

    const interval = setInterval(() => {
      if (window.googleApiLoaded) { clearInterval(interval); resolve(); }
      else if (window.googleApiLoadFailed) { clearInterval(interval); reject(new Error('Google API failed to load')); }
      else { elapsedTime += intervalTime; if (elapsedTime >= timeout) { clearInterval(interval); reject(new Error('Google API load timed out')); } }
    }, intervalTime);
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");
    const storedRedirect = localStorage.getItem("userRedirect");

    if (storedUser && storedToken) {
      const userData = JSON.parse(storedUser);
      // Set role based on stored redirect if not already set
      if (storedRedirect && !userData.role) {
        if (storedRedirect.includes('/admin')) {
          userData.role = 'admin';
        } else if (storedRedirect.includes('/client')) {
          userData.role = 'client';
        }
        // Update localStorage with the corrected user data
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setUser(userData);
      apiService.setAuthToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.login({ email, password });

      if (response?.requires2FA) {
        setRequires2FA(true);
        setPending2FAEmail(email);
        return { success: true, requires2FA: true };
      }

      const token = response?.token || response?.access_token || response?.data?.token || response?.data?.access_token;
      const userData = response?.user || response?.data?.user || response?.data?.userData || response?.data;
      const redirect = response?.redirect || response?.data?.redirect;

      // Set role based on redirect URL
      if (userData && redirect) {
        if (redirect.includes('/admin')) {
          userData.role = 'admin';
        } else if (redirect.includes('/client')) {
          userData.role = 'client';
        }
      }

      if (token && userData) {
        setUser(userData);
        apiService.setAuthToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", token);
        if (redirect) {
          localStorage.setItem("userRedirect", redirect);
        }
        return { success: true, user: userData, redirect };
      }

      return { success: false, error: "Invalid response from server" };
    } catch (error) {
      return { success: false, error: error.message };
    } finally { setLoading(false); }
  };

  const verify2FA = async (code) => {
    try {
      setLoading(true);
      const payload = { token: code, email: pending2FAEmail };
      const response = await apiService.verify2FA(payload);

      const token = response?.token || response?.access_token || response?.data?.token;
      const userData = response?.user || response?.data?.user || response?.data;

      if (token && userData) {
        setUser(userData);
        setRequires2FA(false);
        setPending2FAEmail(null);
        apiService.setAuthToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", token);
        return { success: true, user: userData };
      }

      return { success: false, error: "Invalid 2FA code" };
    } catch (error) { return { success: false, error: error.message }; }
    finally { setLoading(false); }
  };

  const logout = () => {
    setUser(null);
    setRequires2FA(false);
    setPending2FAEmail(null);
    apiService.clearAuthToken();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);

      const token = response?.token || response?.access_token || response?.data?.token;
      const user = response?.user || response?.data?.user || response?.data;

      if (token && user) {
        setUser(user);
        apiService.setAuthToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        return { success: true, user };
      }

      return { success: false, error: "Invalid response from server" };
    } catch (error) { return { success: false, error: error.message }; }
    finally { setLoading(false); }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      await apiService.forgotPassword(email);
      return { success: true };
    } catch (error) { return { success: false, error: error.message }; }
    finally { setLoading(false); }
  };

  const refreshToken = async () => {
    try {
      const response = await apiService.refreshToken();
      if (response.token) {
        apiService.setAuthToken(response.token);
        localStorage.setItem("authToken", response.token);
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      logout();
      return { success: false };
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      await waitForGoogle();
      return new Promise((resolve) => {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: async (credentialResponse) => {
            const idToken = credentialResponse.credential;
            if (!idToken) return resolve({ success: false, error: 'Google login failed' });

            try {
              const apiResponse = await apiService.googleLogin({ token: idToken });
              const token = apiResponse?.token || apiResponse?.access_token || apiResponse?.data?.token;
              const userData = apiResponse?.user || apiResponse?.data?.user || apiResponse?.data;

              if (token && userData) {
                setUser(userData);
                apiService.setAuthToken(token);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('authToken', token);
                resolve({ success: true, user: userData });
              } else resolve({ success: false, error: 'Google login failed' });
            } catch (error) { resolve({ success: false, error: error.message }); }
          },
        });
        google.accounts.id.prompt();
      });
    } catch (error) { return { success: false, error: error.message }; }
    finally { setLoading(false); }
  };

  const googleSignup = async () => {
    setLoading(true);
    try {
      await waitForGoogle();
      return new Promise((resolve) => {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: async (credentialResponse) => {
            const idToken = credentialResponse.credential;
            if (!idToken) return resolve({ success: false, error: 'Google signup failed' });

            try {
              const apiResponse = await apiService.googleSignup({ token: idToken });
              const token = apiResponse?.token || apiResponse?.access_token || apiResponse?.data?.token;
              const userData = apiResponse?.user || apiResponse?.data?.user || apiResponse?.data;

              if (token && userData) {
                setUser(userData);
                apiService.setAuthToken(token);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('authToken', token);
                resolve({ success: true, user: userData });
              } else resolve({ success: false, error: 'Google signup failed' });
            } catch (error) { resolve({ success: false, error: error.message }); }
          },
        });
        google.accounts.id.prompt();
      });
    } catch (error) { return { success: false, error: error.message }; }
    finally { setLoading(false); }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    googleLogin,
    googleSignup,
    forgotPassword,
    verify2FA,
    refreshToken,
    loading,
    requires2FA,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isClient: user?.role === "client",
    isAnalyst: user?.role === "analyst",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

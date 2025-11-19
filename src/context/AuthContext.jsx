import { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      apiService.setAuthToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.login({ email, password });

      if (response.requires2FA) {
        setRequires2FA(true);
        return { success: true, requires2FA: true };
      }

      if (response.token && response.user) {
        const userData = response.user;
        console.log(userData);
        setUser(userData);
        apiService.setAuthToken(response.token);

        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", response.token);

        return { success: true, user: userData };
      }

      return { success: false, error: "Invalid response from server" };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const verify2FA = async (code) => {
    try {
      setLoading(true);
      const response = await apiService.verify2FA(code);

      if (response.token && response.user) {
        const userData = response.user;
        setUser(userData);
        setRequires2FA(false);
        apiService.setAuthToken(response.token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", response.token);

        return { success: true, user: userData };
      }

      return { success: false, error: "Invalid 2FA code" };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setRequires2FA(false);
    apiService.clearAuthToken();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      await apiService.forgotPassword(email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
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
      logout(); // Token refresh failed, logout user
      return { success: false };
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
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

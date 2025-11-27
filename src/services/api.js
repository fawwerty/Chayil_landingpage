// Updated API endpoints with "api" prefix to match backend Laravel routes

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available (for non-auth endpoints)
    if (!endpoint.includes("/auth") && this.getAuthToken()) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${this.getAuthToken()}`;
    }

    try {
      // Use raw fetch so refresh flow below can call refresh without recursion
      let response = await this._rawFetch(url, config);

      // If unauthorized, attempt token refresh once and retry
      if (response.status === 401 && !options._retry) {
        try {
          const refreshResp = await this.refreshToken();
          // If refresh returned a token, set it and retry original request
          const newToken = refreshResp?.token || refreshResp?.access_token;
          if (newToken) {
            this.setAuthToken(newToken);
            // update header and retry
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${newToken}`;
            options._retry = true;
            response = await this._rawFetch(url, config);
          }
        } catch (refreshError) {
          // refresh failed — proceed to error handling below
          console.error("Token refresh failed:", refreshError);
        }
      }

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ message: `HTTP ${response.status}` }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Low-level fetch wrapper that doesn't perform token-refresh recursion
  async _rawFetch(url, config = {}) {
    // Ensure we don't send an undefined body
    const rawConfig = { ...config };
    if (rawConfig.body === undefined) delete rawConfig.body;
    return fetch(url, rawConfig);
  }

  async login(credentials) {
    // Send login to backend. Expects backend to return JSON like { user, token }
    const { email, password } = credentials;
    const payload = { email, password };

    const response = await this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return response;
  }

  async register(userData) {
    // Forward registration to backend
    const response = await this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return response;
  }

  async forgotPassword(email) {
    // Trigger forgot-password on backend
    const response = await this.request("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return response;
  }

  async verify2FA(code) {
    // Accept either a string code or an object { email, token }
    let bodyPayload;
    if (typeof code === "string") {
      bodyPayload = { token: code };
    } else if (typeof code === "object" && code !== null) {
      // expected shape: { email, token }
      bodyPayload = code;
    } else {
      throw new Error("Invalid payload for verify2FA");
    }

    // Verify 2FA code with backend (controller expects token + email)
    const response = await this.request("/api/auth/verify2fa", {
      method: "POST",
      body: JSON.stringify(bodyPayload),
    });
    return response;
  }

  async refreshToken() {
    // Refresh token using a raw fetch to avoid recursion with request()
    const url = `${this.baseURL}/api/auth/refresh`;
    try {
      // Include the current token in the request body so backend can refresh it
      const current = this.getAuthToken();
      const resp = await this._rawFetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: current }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ message: `HTTP ${resp.status}` }));
        throw new Error(err.message || `HTTP ${resp.status}`);
      }

      const data = await resp.json();
      return data;
    } catch (error) {
      console.error("refreshToken failed:", error);
      throw error;
    }
  }

  // Social / Google auth
  async googleLogin({ token }) {
    // Send Google access token to backend to verify and create/login user
    const response = await this.request("/api/auth/google-login", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    return response;
  }

  async googleSignup({ token }) {
    const response = await this.request("/api/auth/google-signup", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    return response;
  }

  // Admin endpoints
  async getAdminSummary() {
    return this.request("/api/admin/summary");
  }

  async getClientSummary() {
    return this.request("/api/client/summary");
  }

  async getClients(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/admin/clients?${queryString}`);
  }

  async createClient(clientData) {
    return this.request("/api/admin/clients", {
      method: "POST",
      body: JSON.stringify(clientData),
    });
  }

  async updateClient(clientId, clientData) {
    return this.request(`/api/admin/clients/${clientId}`, {
      method: "PATCH",
      body: JSON.stringify(clientData),
    });
  }

  async deleteClient(clientId) {
    return this.request(`/api/admin/clients/${clientId}`, {
      method: "DELETE",
    });
  }

  async getIncidents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/incidents?${queryString}`);
  }

  async createIncident(incidentData) {
    return this.request("/api/incidents", {
      method: "POST",
      body: JSON.stringify(incidentData),
    });
  }

  async updateIncident(incidentId, incidentData) {
    return this.request(`/api/incidents/${incidentId}`, {
      method: "PATCH",
      body: JSON.stringify(incidentData),
    });
  }

  async getReports(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/reports?${queryString}`);
  }

  async exportReport(reportData) {
    return this.request("/api/reports/export", {
      method: "POST",
      body: JSON.stringify(reportData),
    });
  }

  async getTeam() {
    return this.request("/api/admin/users");
  }

  async updateUserRole(userId, roleData) {
    return this.request(`/api/admin/roles/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(roleData),
    });
  }

  async getSettings() {
    return this.request("/api/settings");
  }

  async updateSettings(settingsData) {
    return this.request("/api/settings", {
      method: "PATCH",
      body: JSON.stringify(settingsData),
    });
  }

  // Client endpoints
  async getClientDashboard() {
    return this.request("/api/client/dashboard");
  }

  async getClientIncidents() {
    return this.request("/api/client/incidents");
  }

  async reportIncident(incidentData) {
    return this.request("/api/client/incidents/report", {
      method: "POST",
      body: JSON.stringify(incidentData),
    });
  }

  async getClientReports() {
    return this.request("/api/client/reports");
  }

  async getCompliance() {
    return this.request("/api/compliance");
  }

  async updateCompliance(complianceData) {
    return this.request("/api/compliance", {
      method: "PATCH",
      body: JSON.stringify(complianceData),
    });
  }

  async getTrainingModules() {
    return this.request("/api/training/modules");
  }

  async getTrainingProgress() {
    return this.request("/api/training/progress");
  }

  async updateTrainingProgress(progressData) {
    return this.request("/api/training/progress", {
      method: "POST",
      body: JSON.stringify(progressData),
    });
  }

  async getMessages() {
    return this.request("/api/messages");
  }

  async sendMessage(messageData) {
    return this.request("/api/messages", {
      method: "POST",
      body: JSON.stringify(messageData),
    });
  }

  async getBilling() {
    return this.request("/api/billing");
  }

  async getAccount() {
    return this.request("/api/account");
  }

  async updateAccount(accountData) {
    return this.request("/api/account", {
      method: "PATCH",
      body: JSON.stringify(accountData),
    });
  }

  // Utility methods
  getAuthToken() {
    // In production, token should be in HttpOnly cookie
    // For now, using localStorage for development
    return localStorage.getItem("authToken");
  }

  setAuthToken(token) {
    localStorage.setItem("authToken", token);
  }

  clearAuthToken() {
    localStorage.removeItem("authToken");
  }

  // WebSocket connection for real-time features
  connectWebSocket(endpoint) {
    const wsUrl = this.baseURL.replace("http", "ws") + endpoint;
    return new WebSocket(wsUrl);
  }
}

export const apiService = new ApiService();
export default apiService;

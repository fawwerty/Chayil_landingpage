import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        error: null
      }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call - replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Mock authentication logic
          if (email === 'admin@chayil.com' && password === 'admin123') {
            const user = {
              id: 1,
              email: 'admin@chayil.com',
              name: 'Admin User',
              role: 'admin',
              permissions: ['read', 'write', 'delete', 'manage_users']
            };
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return { success: true, user };
          } else if (email === 'client@chayil.com' && password === 'client123') {
            const user = {
              id: 2,
              email: 'client@chayil.com',
              name: 'Client User',
              role: 'client',
              permissions: ['read', 'write']
            };
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return { success: true, user };
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          set({
            error: error.message || 'Login failed',
            isLoading: false
          });
          return { success: false, error: error.message || 'Login failed' };
        }
      },

      logout: () => set({
        user: null,
        isAuthenticated: false,
        error: null
      }),

      updateProfile: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),

      // Computed getters
      hasPermission: (permission) => {
        const { user } = get();
        return user?.permissions?.includes(permission) || false;
      },

      hasRole: (role) => {
        const { user } = get();
        return user?.role === role;
      },

      // Clear all state
      reset: () => set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    }),
    {
      name: 'auth-storage', // Key for localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }) // Only persist these fields
    }
  )
);

export default useAuthStore;

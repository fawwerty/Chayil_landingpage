import { create } from 'zustand';

const useUIStore = create((set, get) => ({
  // Modal states
  modals: {
    addClient: false,
    clientDetail: false,
    incidentAssign: false,
    reportIncident: false,
    upgradePlan: false,
  },

  // Loading states
  loading: {
    global: false,
    auth: false,
    clients: false,
    incidents: false,
    reports: false,
    threats: false,
  },

  // Notification system
  notifications: [],

  // Sidebar/drawer states
  sidebar: {
    mobileOpen: false,
    desktopCollapsed: false,
  },

  // Theme (can be expanded)
  theme: 'dark',

  // Actions for modals
  openModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: true }
  })),

  closeModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: false }
  })),

  closeAllModals: () => set((state) => ({
    modals: Object.keys(state.modals).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  })),

  // Actions for loading states
  setLoading: (key, isLoading) => set((state) => ({
    loading: { ...state.loading, [key]: isLoading }
  })),

  setGlobalLoading: (isLoading) => set((state) => ({
    loading: { ...state.loading, global: isLoading }
  })),

  // Actions for notifications
  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      {
        id: Date.now(),
        timestamp: new Date(),
        ...notification
      }
    ]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),

  clearNotifications: () => set({ notifications: [] }),

  // Actions for sidebar
  toggleMobileSidebar: () => set((state) => ({
    sidebar: { ...state.sidebar, mobileOpen: !state.sidebar.mobileOpen }
  })),

  setMobileSidebar: (open) => set((state) => ({
    sidebar: { ...state.sidebar, mobileOpen: open }
  })),

  toggleDesktopSidebar: () => set((state) => ({
    sidebar: { ...state.sidebar, desktopCollapsed: !state.sidebar.desktopCollapsed }
  })),

  // Theme actions
  setTheme: (theme) => set({ theme }),

  toggleTheme: () => set((state) => ({
    theme: state.theme === 'dark' ? 'light' : 'dark'
  })),

  // Utility actions
  reset: () => set({
    modals: {
      addClient: false,
      clientDetail: false,
      incidentAssign: false,
      reportIncident: false,
      upgradePlan: false,
    },
    loading: {
      global: false,
      auth: false,
      clients: false,
      incidents: false,
      reports: false,
      threats: false,
    },
    notifications: [],
    sidebar: {
      mobileOpen: false,
      desktopCollapsed: false,
    },
    theme: 'dark',
  }),

  // Computed getters
  hasActiveModal: () => {
    const { modals } = get();
    return Object.values(modals).some(Boolean);
  },

  getActiveModals: () => {
    const { modals } = get();
    return Object.entries(modals)
      .filter(([, isOpen]) => isOpen)
      .map(([name]) => name);
  },

  isLoading: (key) => {
    const { loading } = get();
    return loading[key] || false;
  },

  hasNotifications: () => {
    const { notifications } = get();
    return notifications.length > 0;
  },
}));

export default useUIStore;

import { create } from 'zustand';
import websocketService from '../services/websocket';

const useRealtimeStore = create((set, get) => ({
  // Connection state
  isConnected: false,
  connectionState: 'disconnected', // 'connecting', 'connected', 'disconnected', 'error'

  // Real-time data
  incidents: [],
  threats: [],
  logs: [],
  notifications: [],

  // Chat/messages
  messages: [],
  activeChats: [],

  // Actions
  connect: async (url) => {
    set({ connectionState: 'connecting' });

    try {
      await websocketService.connect(url);
      set({ isConnected: true, connectionState: 'connected' });

      // Set up event listeners
      websocketService.on('message', (data) => {
        get().handleMessage(data);
      });

      websocketService.on('disconnected', () => {
        set({ isConnected: false, connectionState: 'disconnected' });
      });

      websocketService.on('error', (error) => {
        set({ connectionState: 'error' });
        console.error('WebSocket error:', error);
      });

    } catch (error) {
      set({ connectionState: 'error' });
      throw error;
    }
  },

  disconnect: () => {
    websocketService.disconnect();
    set({
      isConnected: false,
      connectionState: 'disconnected'
    });
  },

  sendMessage: (data) => {
    return websocketService.send(data);
  },

  handleMessage: (data) => {
    const { type, payload } = data;

    switch (type) {
      case 'incident_update':
        get().handleIncidentUpdate(payload);
        break;
      case 'threat_alert':
        get().handleThreatAlert(payload);
        break;
      case 'log_entry':
        get().handleLogEntry(payload);
        break;
      case 'notification':
        get().handleNotification(payload);
        break;
      case 'chat_message':
        get().handleChatMessage(payload);
        break;
      default:
        console.log('Unknown message type:', type, payload);
    }
  },

  handleIncidentUpdate: (incident) => set((state) => ({
    incidents: [incident, ...state.incidents.filter(i => i.id !== incident.id)].slice(0, 50)
  })),

  handleThreatAlert: (threat) => set((state) => ({
    threats: [threat, ...state.threats.filter(t => t.id !== threat.id)].slice(0, 50)
  })),

  handleLogEntry: (log) => set((state) => ({
    logs: [log, ...state.logs].slice(0, 100)
  })),

  handleNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications].slice(0, 20)
  })),

  handleChatMessage: (message) => set((state) => {
    const existingChat = state.activeChats.find(chat => chat.id === message.chatId);
    if (existingChat) {
      return {
        messages: [...state.messages, message],
        activeChats: state.activeChats.map(chat =>
          chat.id === message.chatId
            ? { ...chat, lastMessage: message, unreadCount: chat.unreadCount + 1 }
            : chat
        )
      };
    } else {
      // New chat
      const newChat = {
        id: message.chatId,
        participant: message.sender,
        lastMessage: message,
        unreadCount: 1,
        timestamp: message.timestamp
      };
      return {
        messages: [...state.messages, message],
        activeChats: [newChat, ...state.activeChats]
      };
    }
  }),

  // Chat actions
  sendChatMessage: (chatId, content, sender) => {
    const message = {
      id: Date.now(),
      chatId,
      content,
      sender,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    // Send via WebSocket
    get().sendMessage({
      type: 'chat_message',
      payload: message
    });

    // Optimistically add to local state
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },

  markChatAsRead: (chatId) => set((state) => ({
    activeChats: state.activeChats.map(chat =>
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    )
  })),

  // Data management
  clearIncidents: () => set({ incidents: [] }),
  clearThreats: () => set({ threats: [] }),
  clearLogs: () => set({ logs: [] }),
  clearNotifications: () => set({ notifications: [] }),

  // Getters
  getUnreadMessageCount: () => {
    const { activeChats } = get();
    return activeChats.reduce((total, chat) => total + chat.unreadCount, 0);
  },

  getChatMessages: (chatId) => {
    const { messages } = get();
    return messages.filter(msg => msg.chatId === chatId);
  },

  // Reset
  reset: () => set({
    isConnected: false,
    connectionState: 'disconnected',
    incidents: [],
    threats: [],
    logs: [],
    notifications: [],
    messages: [],
    activeChats: []
  })
}));

export default useRealtimeStore;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecentLogs() {
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  // Mock log data - in production this would come from WebSocket
  const mockLogs = [
    { id: 1, timestamp: '14:32:15', level: 'CRITICAL', message: 'DDoS attack detected from IP 192.168.1.100', source: 'Firewall' },
    { id: 2, timestamp: '14:31:42', level: 'WARNING', message: 'Multiple failed login attempts for user admin@chayil.com', source: 'Auth System' },
    { id: 3, timestamp: '14:30:18', level: 'INFO', message: 'Security scan completed for client XYZ Corp', source: 'Scanner' },
    { id: 4, timestamp: '14:29:55', level: 'ERROR', message: 'Database connection timeout on server-03', source: 'Database' },
    { id: 5, timestamp: '14:28:33', level: 'CRITICAL', message: 'Malware detected in uploaded file: suspicious.exe', source: 'Antivirus' },
    { id: 6, timestamp: '14:27:12', level: 'WARNING', message: 'Unusual traffic pattern from Russia (RU)', source: 'IDS' },
    { id: 7, timestamp: '14:26:48', level: 'INFO', message: 'User john.doe logged out successfully', source: 'Auth System' },
    { id: 8, timestamp: '14:25:29', level: 'ERROR', message: 'API rate limit exceeded for client ABC Ltd', source: 'API Gateway' },
  ];

  useEffect(() => {
    setLogs(mockLogs.slice(0, 5));

    // Simulate real-time log updates
    const interval = setInterval(() => {
      if (!isPaused) {
        setLogs(prevLogs => {
          const newLogs = [...prevLogs];
          // Remove oldest log and add a new one
          if (newLogs.length >= 5) {
            newLogs.shift();
          }
          const newLog = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            level: ['INFO', 'WARNING', 'ERROR', 'CRITICAL'][Math.floor(Math.random() * 4)],
            message: `New security event: ${Math.random().toString(36).substring(7)}`,
            source: ['Firewall', 'Auth System', 'Scanner', 'Database', 'Antivirus'][Math.floor(Math.random() * 5)]
          };
          newLogs.push(newLog);
          return newLogs;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-400 bg-red-500/20';
      case 'ERROR': return 'text-orange-400 bg-orange-500/20';
      case 'WARNING': return 'text-yellow-400 bg-yellow-500/20';
      case 'INFO': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cyan-300">Recent Security Logs</h3>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            isPaused
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
          }`}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-md border border-gray-700/50"
            >
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-500 font-mono">{log.timestamp}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(log.level)}`}>
                    {log.level}
                  </span>
                  <span className="text-xs text-gray-400">{log.source}</span>
                </div>
                <p className="text-sm text-gray-300 leading-tight">{log.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>Auto-refresh: {isPaused ? 'Paused' : 'Active'}</span>
        <span>WebSocket: Connected</span>
      </div>
    </motion.div>
  );
}

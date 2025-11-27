import React, { useEffect, useRef } from 'react';
import { FiAlertTriangle, FiInfo, FiX, FiEye } from 'react-icons/fi';

const LogStream = ({ logs }) => {
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = 0; // Auto-scroll to top for new logs
    }
  }, [logs]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'high': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'low': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'info': return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
      case 'high':
      case 'medium':
      case 'low':
        return <FiAlertTriangle className="w-4 h-4" />;
      default:
        return <FiInfo className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Log Stream</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Real-time security events and alerts
        </p>
      </div>

      <div
        ref={logContainerRef}
        className="h-96 overflow-y-auto p-4 space-y-2"
        style={{ maxHeight: '400px' }}
      >
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <FiEye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Waiting for log events...</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-lg border ${getSeverityColor(log.severity)} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5">
                    {getSeverityIcon(log.severity)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium uppercase tracking-wide">
                        {log.severity}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {log.source}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">
                      {log.message}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      {log.ip && (
                        <span>IP: {log.ip}</span>
                      )}
                      {log.user && (
                        <span>User: {log.user}</span>
                      )}
                    </div>
                  </div>
                </div>

                <button className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogStream;

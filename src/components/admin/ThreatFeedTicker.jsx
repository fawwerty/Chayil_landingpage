import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockThreatFeed } from '../../data/mockData';

export default function ThreatFeedTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockThreatFeed.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentThreat = mockThreatFeed[currentIndex];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'High':
        return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'Medium':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'Low':
        return 'text-green-400 border-green-500/30 bg-green-500/10';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-cyan-300 flex items-center">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Live Threat Feed
        </h3>
        <div className="flex space-x-1">
          {mockThreatFeed.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-teal-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`border-l-4 rounded-r-lg p-3 ${getSeverityColor(currentThreat.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${
                    currentThreat.severity === 'Critical' ? 'text-red-300 border-red-500/50 bg-red-500/20' :
                    currentThreat.severity === 'High' ? 'text-orange-300 border-orange-500/50 bg-orange-500/20' :
                    currentThreat.severity === 'Medium' ? 'text-yellow-300 border-yellow-500/50 bg-yellow-500/20' :
                    'text-green-300 border-green-500/50 bg-green-500/20'
                  }`}>
                    {currentThreat.severity}
                  </span>
                  <span className="text-xs text-gray-400">{currentThreat.source}</span>
                </div>
                <h4 className="text-sm font-medium text-white mb-1">{currentThreat.title}</h4>
                <p className="text-xs text-gray-300">{currentThreat.summary}</p>
              </div>
              <div className="text-right ml-4">
                <div className="text-xs text-gray-400">
                  {new Date(currentThreat.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

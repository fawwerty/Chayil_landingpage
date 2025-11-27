import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, label, color = 'blue', size = 'medium' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-600';
      case 'yellow':
        return 'bg-yellow-600';
      case 'red':
        return 'bg-red-600';
      case 'blue':
      default:
        return 'bg-blue-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-1';
      case 'large':
        return 'h-4';
      case 'medium':
      default:
        return 'h-2';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {progress}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${getSizeClasses()}`}>
        <motion.div
          className={`rounded-full ${getColorClasses()}`}
          style={{ height: '100%' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

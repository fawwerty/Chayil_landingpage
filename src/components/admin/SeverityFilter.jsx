import React from 'react';
import { FiFilter } from 'react-icons/fi';

const SeverityFilter = ({ value, onChange }) => {
  const severities = [
    { value: 'all', label: 'All Severities', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
    { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
    { value: 'info', label: 'Info', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' }
  ];

  return (
    <div className="flex items-center gap-2">
      <FiFilter className="text-gray-500 w-4 h-4" />
      <div className="flex gap-1">
        {severities.map((severity) => (
          <button
            key={severity.value}
            onClick={() => onChange(severity.value)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
              value === severity.value
                ? severity.color
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {severity.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeverityFilter;

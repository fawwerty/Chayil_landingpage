import React, { useState } from 'react';
import { FiDownload, FiFileText, FiFile, FiImage } from 'react-icons/fi';

const ReportExportButton = ({ onExport, isLoading = false }) => {
  const [showOptions, setShowOptions] = useState(false);

  const exportOptions = [
    { id: 'pdf', label: 'Export as PDF', icon: FiFileText, format: 'pdf' },
    { id: 'excel', label: 'Export as Excel', icon: FiFile, format: 'xlsx' },
    { id: 'csv', label: 'Export as CSV', icon: FiFile, format: 'csv' },
    { id: 'png', label: 'Export as PNG', icon: FiImage, format: 'png' }
  ];

  const handleExport = (format) => {
    onExport(format);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md transition-colors duration-200"
      >
        <FiDownload className="w-4 h-4" />
        {isLoading ? 'Exporting...' : 'Export Report'}
      </button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <div className="py-1">
            {exportOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleExport(option.format)}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <IconComponent className="w-4 h-4" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {showOptions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};

export default ReportExportButton;

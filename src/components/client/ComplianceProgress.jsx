import React from 'react';
import { FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';

const ComplianceProgress = ({ complianceData = [] }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      case 'non-compliant':
        return <FiAlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <FiClock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'non-compliant':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const overallProgress = complianceData.reduce((acc, item) => {
    if (item.status === 'compliant') return acc + 1;
    return acc;
  }, 0) / complianceData.length * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Compliance Progress
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Security compliance status
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(overallProgress)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Overall Score
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="space-y-4">
        {complianceData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(item.status)}
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {item.description}
                </div>
              </div>
            </div>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
              {item.status.replace('-', ' ')}
            </span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-green-600">
              {complianceData.filter(item => item.status === 'compliant').length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Compliant</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-yellow-600">
              {complianceData.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Pending</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-red-600">
              {complianceData.filter(item => item.status === 'non-compliant').length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Non-compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceProgress;

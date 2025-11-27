import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Calendar, User } from 'lucide-react';

const Certificate = ({ certificate, onDownload }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'expired':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'expiring_soon':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const isExpiringSoon = () => {
    if (!certificate.expiryDate) return false;
    const expiryDate = new Date(certificate.expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = () => {
    if (!certificate.expiryDate) return false;
    return new Date(certificate.expiryDate) < new Date();
  };

  const getStatus = () => {
    if (isExpired()) return 'expired';
    if (isExpiringSoon()) return 'expiring_soon';
    return certificate.status || 'active';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {certificate.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {certificate.moduleTitle}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(getStatus())}`}>
            {getStatus().replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <div>
              <p className="font-medium">Earned</p>
              <p>{new Date(certificate.earnedDate).toLocaleDateString()}</p>
            </div>
          </div>

          {certificate.expiryDate && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <div>
                <p className="font-medium">Expires</p>
                <p className={isExpired() ? 'text-red-600 dark:text-red-400' :
                             isExpiringSoon() ? 'text-yellow-600 dark:text-yellow-400' :
                             ''}>
                  {new Date(certificate.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {isExpiringSoon() && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              This certificate expires soon. Consider retaking the training module.
            </p>
          </div>
        )}

        {isExpired() && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-800 dark:text-red-200">
              This certificate has expired. Please retake the training module to renew.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={() => onDownload?.(certificate)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Certificate;

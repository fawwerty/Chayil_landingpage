import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, ArrowRight, CreditCard } from 'lucide-react';

const UpgradeModal = ({ plan, currentPlan, onClose, onUpgrade }) => {
  const priceDifference = plan.price - currentPlan.price;
  const proratedAmount = priceDifference > 0 ? priceDifference : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Upgrade to {plan.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Plan Comparison */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center flex-1">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Plan</div>
                <div className="font-semibold text-gray-900 dark:text-white">{currentPlan.name}</div>
                <div className="text-lg font-bold text-gray-600 dark:text-gray-400">${currentPlan.price}/mo</div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mx-4" />
              <div className="text-center flex-1">
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">New Plan</div>
                <div className="font-semibold text-blue-600 dark:text-blue-400">{plan.name}</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">${plan.price}/mo</div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              What's included in {plan.name}:
            </h3>
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Pricing Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Current plan ({currentPlan.name})</span>
                <span className="text-gray-900 dark:text-white">${currentPlan.price}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">New plan ({plan.name})</span>
                <span className="text-gray-900 dark:text-white">${plan.price}/month</span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900 dark:text-white">
                    {priceDifference > 0 ? 'Price increase' : 'Price decrease'}
                  </span>
                  <span className={`text-gray-900 dark:text-white ${
                    priceDifference > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {priceDifference > 0 ? '+' : ''}${Math.abs(priceDifference)}/month
                  </span>
                </div>
              </div>
              {proratedAmount > 0 && (
                <div className="flex justify-between text-orange-600 dark:text-orange-400">
                  <span>Prorated amount due today</span>
                  <span>${proratedAmount.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Billing Information
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your next billing cycle will start immediately. You can cancel or change your plan at any time.
                  Refunds are processed according to our refund policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onUpgrade(plan)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Upgrade to {plan.name}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpgradeModal;

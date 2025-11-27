import React from 'react';
import { CheckCircle, Star } from 'lucide-react';

const PlanInfo = ({ plan, isCurrent = false }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 ${
      isCurrent
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
        : 'border-gray-200 dark:border-gray-700'
    }`}>
      {isCurrent && (
        <div className="flex items-center space-x-2 mb-3">
          <Star className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Current Plan
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {plan.name}
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ${plan.price}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            /month
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {plan.description}
      </p>

      <div className="space-y-2 mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white">Features:</h4>
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {plan.nextBilling && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Next billing date:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {plan.nextBilling}
            </span>
          </div>
        </div>
      )}

      {plan.usage && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Usage:</h4>
          {Object.entries(plan.usage).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {value.used}/{value.total}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanInfo;

import React from 'react';
import { FiShield, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const SecurityScoreCard = ({ score = 0, trend, previousScore }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreText = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getScoreBgColor(score)} bg-opacity-20`}>
            <FiShield className={`w-6 h-6 ${getScoreColor(score)}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Security Score
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Overall security posture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {trend === 'up' ? (
            <FiTrendingUp className="w-4 h-4 text-green-500" />
          ) : trend === 'down' ? (
            <FiTrendingDown className="w-4 h-4 text-red-500" />
          ) : null}
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-600' :
            trend === 'down' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            {previousScore ? `${score - previousScore > 0 ? '+' : ''}${score - previousScore}` : ''}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {score}
          </div>
          <div className={`text-sm font-medium ${getScoreColor(score)}`}>
            {getScoreText(score)}
          </div>
        </div>

        <div className="w-20 h-20 relative">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${score}, 100`}
              className="text-gray-200 dark:text-gray-700"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${score}, 100`}
              className={`${getScoreColor(score)}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {score}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Last updated</span>
          <span className="text-gray-900 dark:text-white">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecurityScoreCard;

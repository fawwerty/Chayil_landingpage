import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, AlertTriangle, Clock, CheckSquare } from 'lucide-react';

const Checklist = ({ items, onItemToggle }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'High':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Medium':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'Low':
        return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-l-4 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${getPriorityColor(item.priority)}`}
          onClick={() => toggleExpanded(item.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(item.status)}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.category} • Due: {new Date(item.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {item.status.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {item.progress}%
              </span>
            </div>
          </div>

          {expandedItems.has(item.id) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {item.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Requirements:</h4>
                <ul className="space-y-1">
                  {item.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckSquare className="w-4 h-4" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {item.status !== 'completed' && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemToggle?.(item.id);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Update Progress
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Checklist;

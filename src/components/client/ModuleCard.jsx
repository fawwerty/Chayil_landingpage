import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Award, Play, CheckCircle, Lock } from 'lucide-react';

const ModuleCard = ({ module, onStart, onContinue }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Play className="w-5 h-5 text-blue-500" />;
      case 'not_started':
      default:
        return <BookOpen className="w-5 h-5 text-gray-400" />;
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-600';
    if (progress > 0) return 'bg-blue-600';
    return 'bg-gray-300 dark:bg-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon(module.status)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {module.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {module.category}
              </p>
            </div>
          </div>
          {module.certificateEarned && (
            <Award className="w-6 h-6 text-yellow-500" />
          )}
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {module.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{module.duration}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
              {module.difficulty}
            </span>
          </div>
        </div>

        {module.status !== 'not_started' && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {module.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${getProgressColor(module.progress)}`}
                initial={{ width: 0 }}
                animate={{ width: `${module.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {module.completionDate && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Completed: {new Date(module.completionDate).toLocaleDateString()}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {module.modules.filter(m => m.completed).length} of {module.modules.length} modules completed
          </div>

          <button
            onClick={() => {
              if (module.status === 'not_started') {
                onStart?.(module.id);
              } else {
                onContinue?.(module.id);
              }
            }}
            disabled={module.status === 'locked'}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              module.status === 'locked'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                : module.status === 'completed'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {module.status === 'locked' && <Lock className="w-4 h-4 inline mr-2" />}
            {module.status === 'completed' ? 'Review' :
             module.status === 'in_progress' ? 'Continue' :
             module.status === 'locked' ? 'Locked' : 'Start'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;

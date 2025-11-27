import { motion } from 'framer-motion';

export default function StatsCard({ title, value = 0, change, icon: Icon, color = 'teal' }) {
  const colorClasses = {
    teal: {
      bg: 'bg-teal-500/20',
      border: 'border-teal-500/30',
      text: 'text-teal-400',
      icon: 'text-teal-400'
    },
    blue: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      icon: 'text-blue-400'
    },
    green: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/30',
      text: 'text-green-400',
      icon: 'text-green-400'
    },
    red: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
      text: 'text-red-400',
      icon: 'text-red-400'
    },
    yellow: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      icon: 'text-yellow-400'
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${colors.bg} ${colors.border} border rounded-lg p-6 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-cyan-300 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`${colors.icon} opacity-80`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </motion.div>
  );
}

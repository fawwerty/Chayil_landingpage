import { motion } from 'framer-motion';

// Simple icon component as fallback
const DownloadIcon = () => <span>⬇️</span>;

export default function DownloadButton({ report, onDownload, disabled = false }) {
  const handleDownload = () => {
    if (!disabled && onDownload) {
      onDownload(report);
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={handleDownload}
      disabled={disabled}
      className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
        disabled
          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
          : 'bg-teal-500 text-black hover:bg-teal-400 shadow-lg hover:shadow-teal-500/25'
      }`}
    >
      <DownloadIcon className="h-4 w-4 mr-2" />
      {disabled ? 'Generating...' : 'Download'}
    </motion.button>
  );
}

import { motion } from 'framer-motion';

// Simple icon components as fallback
const DocumentTextIcon = () => <span>📄</span>;
const DownloadIcon = () => <span>⬇️</span>;
const CalendarIcon = () => <span>📅</span>;

export default function ReportCard({ report, onDownload }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-teal-500/20 hover:border-teal-500/40 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-teal-400 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-cyan-300">{report.title}</h3>
            <p className="text-sm text-gray-400">{report.type} Report</p>
          </div>
        </div>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(report.status)}`}>
          {report.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-400">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Period: {report.period}
        </div>
        <div className="text-sm text-gray-400">
          Generated: {new Date(report.generatedDate).toLocaleDateString()}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onDownload(report)}
          disabled={report.status !== 'Completed'}
          className={`flex items-center px-4 py-2 rounded transition ${
            report.status === 'Completed'
              ? 'bg-teal-500 text-black hover:bg-teal-400'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <DownloadIcon className="h-4 w-4 mr-2" />
          Download
        </button>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';

// Simple icon component as fallback
const XMarkIcon = () => <span>✕</span>;

export default function ReportIncidentForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    category: 'Authentication',
    affectedSystems: '',
    indicators: ''
  });

  const [errors, setErrors] = useState({});

  const severityOptions = [
    { value: 'Low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'Medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'High', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'Critical', label: 'Critical', color: 'bg-red-100 text-red-800' }
  ];

  const categoryOptions = [
    'Authentication',
    'Malware',
    'Data Breach',
    'Phishing',
    'Unauthorized Access',
    'DDoS',
    'Configuration',
    'Insider Threat',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.affectedSystems.trim()) newErrors.affectedSystems = 'Affected systems is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const incidentData = {
        ...formData,
        id: Date.now(), // Temporary ID for mock data
        status: 'Open',
        timestamp: new Date().toISOString(),
        client: 'TechCorp Inc', // Current client
        assignee: 'Unassigned',
        priority: formData.severity,
        indicators: formData.indicators.split(',').map(ind => ind.trim()).filter(ind => ind),
        affectedSystems: formData.affectedSystems.split(',').map(sys => sys.trim()).filter(sys => sys),
        comments: [{
          user: 'System',
          message: 'Incident reported by client',
          timestamp: new Date().toISOString()
        }]
      };

      onSubmit(incidentData);
      // Reset form
      setFormData({
        title: '',
        description: '',
        severity: 'Medium',
        category: 'Authentication',
        affectedSystems: '',
        indicators: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/95 backdrop-blur-md rounded-lg border border-teal-500/30 p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-cyan-300">Report New Incident</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Incident Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full bg-gray-800 border rounded px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-teal-400 ${
                errors.title ? 'border-red-500' : 'border-teal-500/20'
              }`}
              placeholder="Brief description of the incident"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full bg-gray-800 border rounded px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-teal-400 ${
                errors.description ? 'border-red-500' : 'border-teal-500/20'
              }`}
              placeholder="Detailed description of what happened, when, and how it was discovered"
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Severity
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-teal-500/20 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-teal-400"
              >
                {severityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-teal-500/20 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-teal-400"
              >
                {categoryOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Affected Systems *
            </label>
            <input
              type="text"
              name="affectedSystems"
              value={formData.affectedSystems}
              onChange={handleInputChange}
              className={`w-full bg-gray-800 border rounded px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-teal-400 ${
                errors.affectedSystems ? 'border-red-500' : 'border-teal-500/20'
              }`}
              placeholder="e.g., Email Server, Database, Web Application (comma-separated)"
            />
            {errors.affectedSystems && <p className="text-red-400 text-sm mt-1">{errors.affectedSystems}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Indicators (Optional)
            </label>
            <textarea
              name="indicators"
              value={formData.indicators}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-gray-800 border border-teal-500/20 rounded px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-teal-400"
              placeholder="IP addresses, file hashes, URLs, or other indicators (comma-separated)"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white border border-teal-500/20 rounded hover:border-teal-500/40 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-black rounded hover:bg-teal-400 transition"
            >
              Report Incident
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

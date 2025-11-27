import { useState } from 'react';
import { motion } from 'framer-motion';

export default function IncidentAssignForm({ incident, isOpen, onClose, onAssign }) {
  const [selectedTeam, setSelectedTeam] = useState(incident?.assignedTo || '');
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teams = [
    'Security Team A',
    'Security Team B',
    'Incident Response Team',
    'Network Security Team',
    'Internal Security Team',
    'Forensic Analysis Team'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onAssign(incident.id, {
        team: selectedTeam,
        priority,
        notes,
        assignedBy: 'Current Admin',
        assignedAt: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Failed to assign incident:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!incident) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-cyan-300">Assign Incident</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-800 rounded-md transition-colors duration-200"
            >
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-800/50 rounded-md">
            <h4 className="text-sm font-medium text-cyan-300 mb-1">{incident.title}</h4>
            <p className="text-xs text-gray-400">ID: #{incident.id} • {incident.severity} Priority</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Assign to Team
              </label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select a team...</option>
                {teams.map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Assignment Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes for the assigned team..."
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !selectedTeam}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200"
              >
                {isSubmitting ? 'Assigning...' : 'Assign Incident'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

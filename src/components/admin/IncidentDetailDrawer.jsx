import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IncidentDetailDrawer({ incident, isOpen, onClose, onStatusUpdate, onAssign }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIncident, setEditedIncident] = useState(incident || {});
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: 'Security Analyst',
      timestamp: '2024-01-10 14:30',
      content: 'Initial investigation started. Reviewing network logs.'
    },
    {
      id: 2,
      author: 'Incident Response Team',
      timestamp: '2024-01-10 16:45',
      content: 'Identified source IP and blocked access. Monitoring for additional attempts.'
    }
  ]);

  if (!incident) return null;

  const handleSave = () => {
    // In production, this would call an API
    console.log('Saving incident:', editedIncident);
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: notes.length + 1,
        author: 'Current User',
        timestamp: new Date().toLocaleString(),
        content: newNote.trim()
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase().replace(' ', '')) {
      case 'resolved': return 'text-green-400 bg-green-500/20';
      case 'inprogress': return 'text-blue-400 bg-blue-500/20';
      case 'underinvestigation': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gray-900/95 backdrop-blur-md border-l border-teal-500/30 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-cyan-300">Incident Details</h2>
                  <p className="text-gray-400 mt-1">ID: #{incident.id}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-md transition-colors duration-200"
                >
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Status and Severity Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                  {incident.severity} Severity
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident.status)}`}>
                  {incident.status}
                </div>
              </div>

              {/* Incident Information */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4">Incident Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedIncident.title || ''}
                          onChange={(e) => setEditedIncident({...editedIncident, title: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      ) : (
                        <p className="text-gray-300">{incident.title}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Client</label>
                      <p className="text-gray-300">{incident.clientName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Reported Date</label>
                      <p className="text-gray-300">{new Date(incident.reportedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Assigned To</label>
                      {isEditing ? (
                        <select
                          value={editedIncident.assignedTo || ''}
                          onChange={(e) => setEditedIncident({...editedIncident, assignedTo: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">Select Team</option>
                          <option value="Security Team A">Security Team A</option>
                          <option value="Security Team B">Security Team B</option>
                          <option value="Incident Response Team">Incident Response Team</option>
                          <option value="Network Security Team">Network Security Team</option>
                          <option value="Internal Security Team">Internal Security Team</option>
                        </select>
                      ) : (
                        <p className="text-gray-300">{incident.assignedTo}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    {isEditing ? (
                      <textarea
                        value={editedIncident.description || ''}
                        onChange={(e) => setEditedIncident({...editedIncident, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    ) : (
                      <p className="text-gray-300">{incident.description}</p>
                    )}
                  </div>
                </div>

                {/* Status Update */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4">Status Update</h3>
                  <div className="flex items-center space-x-4">
                    <select
                      value={incident.status.toLowerCase().replace(' ', '')}
                      onChange={(e) => onStatusUpdate(incident.id, e.target.value)}
                      className="px-3 py-2 bg-gray-700 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="underinvestigation">Under Investigation</option>
                      <option value="inprogress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button
                      onClick={() => onAssign(incident.id)}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-200"
                    >
                      Reassign
                    </button>
                  </div>
                </div>

                {/* Investigation Notes */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4">Investigation Notes</h3>
                  <div className="space-y-4 mb-4">
                    {notes.map((note) => (
                      <div key={note.id} className="border-l-2 border-teal-500/30 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-cyan-300">{note.author}</span>
                          <span className="text-xs text-gray-400">{note.timestamp}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{note.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add investigation note..."
                      rows={2}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-teal-500/30 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-teal-500/20">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors duration-200"
                      >
                        Edit Details
                      </button>
                      <button
                        onClick={onClose}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-200"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

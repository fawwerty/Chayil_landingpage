import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientDetailModal({ client, isOpen, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    status: 'active',
    contactPerson: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        industry: client.industry || '',
        status: client.status || 'active',
        contactPerson: client.contactPerson || '',
        phone: client.phone || '',
        address: client.address || '',
        notes: client.notes || ''
      });
    }
  }, [client]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...client, ...formData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-teal-500/20">
            <div>
              <h2 className="text-xl font-semibold text-cyan-300">
                {isEditing ? 'Edit Client' : 'Client Details'}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {client?.name} - {client?.industry}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-200 text-sm"
                >
                  Edit
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-md transition-colors duration-200"
              >
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                      <option value="Government">Government</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Additional notes about the client..."
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-teal-500/20">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Client Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-teal-500/20">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Basic Information</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-500">Company:</span>
                        <p className="text-sm text-cyan-300">{client?.name}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Email:</span>
                        <p className="text-sm text-gray-300">{client?.email}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Industry:</span>
                        <p className="text-sm text-gray-300">{client?.industry}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
                          client?.status === 'active' ? 'bg-green-100 text-green-800' :
                          client?.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {client?.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-teal-500/20">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Contact Details</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-500">Contact Person:</span>
                        <p className="text-sm text-gray-300">{client?.contactPerson || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Phone:</span>
                        <p className="text-sm text-gray-300">{client?.phone || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Last Activity:</span>
                        <p className="text-sm text-gray-300">{client?.lastActivity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address and Notes */}
                {(client?.address || client?.notes) && (
                  <div className="space-y-4">
                    {client?.address && (
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-teal-500/20">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Address</h3>
                        <p className="text-sm text-gray-300">{client.address}</p>
                      </div>
                    )}

                    {client?.notes && (
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-teal-500/20">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Notes</h3>
                        <p className="text-sm text-gray-300">{client.notes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-teal-500/20">
                  <button
                    onClick={() => onDelete(client)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                  >
                    Delete Client
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors duration-200"
                  >
                    Edit Client
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

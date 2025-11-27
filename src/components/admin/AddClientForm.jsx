import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Select, Button, Textarea } from '../shared';

export default function AddClientForm({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    contactPerson: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newClient = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        lastActivity: 'Just now',
        createdAt: new Date().toISOString()
      };

      onSave(newClient);
      onClose();

      // Reset form
      setFormData({
        name: '',
        email: '',
        industry: '',
        contactPerson: '',
        phone: '',
        address: '',
        notes: ''
      });
    } catch (error) {
      console.error('Failed to add client:', error);
      setErrors({ submit: 'Failed to add client. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
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
            <h2 className="text-xl font-semibold text-cyan-300">Add New Client</h2>
            <p className="text-sm text-gray-400 mt-1">Create a new client account</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-md transition-colors duration-200"
          >
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-md p-3">
              <p className="text-sm text-red-400">{errors.submit}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <Input
              label="Company Name"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              error={errors.name}
              placeholder="Enter company name"
              required
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              error={errors.email}
              placeholder="client@company.com"
              required
            />

            {/* Industry */}
            <Select
              label="Industry"
              value={formData.industry}
              onChange={(value) => handleInputChange('industry', value)}
              error={errors.industry}
              options={[
                { value: 'Technology', label: 'Technology' },
                { value: 'Finance', label: 'Finance' },
                { value: 'Healthcare', label: 'Healthcare' },
                { value: 'Retail', label: 'Retail' },
                { value: 'Manufacturing', label: 'Manufacturing' },
                { value: 'Education', label: 'Education' },
                { value: 'Government', label: 'Government' },
                { value: 'Consulting', label: 'Consulting' },
                { value: 'Other', label: 'Other' }
              ]}
              placeholder="Select Industry"
              required
            />

            {/* Contact Person */}
            <Input
              label="Contact Person"
              value={formData.contactPerson}
              onChange={(value) => handleInputChange('contactPerson', value)}
              placeholder="Primary contact name"
            />

            {/* Phone */}
            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              placeholder="+1 (555) 123-4567"
            />

            {/* Placeholder for future fields */}
            <div></div>
          </div>

          {/* Address */}
          <Textarea
            label="Address"
            value={formData.address}
            onChange={(value) => handleInputChange('address', value)}
            rows={3}
            placeholder="Company address..."
          />

          {/* Notes */}
          <Textarea
            label="Notes"
            value={formData.notes}
            onChange={(value) => handleInputChange('notes', value)}
            rows={4}
            placeholder="Additional notes about the client..."
          />

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-teal-500/20">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Client...' : 'Add Client'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

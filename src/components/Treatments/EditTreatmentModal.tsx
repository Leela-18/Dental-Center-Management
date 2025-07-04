import React, { useState, useEffect } from 'react';
import { X, FileText, User, Calendar, IndianRupee, AlertTriangle, Save } from 'lucide-react';
import { mockStaff } from '../../data/mockData';
import type { Treatment } from '../../types';

interface EditTreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatment: Treatment | null;
  onUpdateTreatment: (updatedTreatment: Treatment) => void;
}

const EditTreatmentModal: React.FC<EditTreatmentModalProps> = ({ 
  isOpen, 
  onClose, 
  treatment,
  onUpdateTreatment 
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    dentistId: '',
    dentistName: '',
    date: '',
    procedure: '',
    description: '',
    cost: 0,
    status: 'planned' as const,
    notes: '',
    followUpRequired: false,
    followUpDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const dentists = mockStaff.filter(staff => staff.role === 'dentist');
  
  const procedureTypes = [
    { value: 'Dental Cleaning', cost: 9960 }, // ₹9,960
    { value: 'Root Canal Therapy', cost: 70550 }, // ₹70,550
    { value: 'Composite Filling', cost: 14940 }, // ₹14,940
    { value: 'Dental Crown', cost: 78850 }, // ₹78,850
    { value: 'Tooth Extraction', cost: 24900 }, // ₹24,900
    { value: 'Orthodontic Consultation', cost: 12450 }, // ₹12,450
    { value: 'Teeth Whitening', cost: 33200 }, // ₹33,200
    { value: 'Dental Implant', cost: 99600 }, // ₹99,600
    { value: 'Periodontal Treatment', cost: 49800 }, // ₹49,800
    { value: 'Emergency Treatment', cost: 16600 } // ₹16,600
  ];

  const statusOptions = [
    { value: 'planned', label: 'Planned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  // Format INR currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    if (treatment) {
      setFormData({
        patientName: treatment.patientName,
        dentistId: treatment.dentistId,
        dentistName: treatment.dentistName,
        date: treatment.date,
        procedure: treatment.procedure,
        description: treatment.description,
        cost: treatment.cost,
        status: treatment.status,
        notes: treatment.notes || '',
        followUpRequired: treatment.followUpRequired,
        followUpDate: treatment.followUpDate || ''
      });
    }
  }, [treatment]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'dentistId') {
      const selectedDentist = dentists.find(d => d.id === value);
      setFormData(prev => ({
        ...prev,
        dentistId: value,
        dentistName: selectedDentist ? `${selectedDentist.firstName} ${selectedDentist.lastName}` : ''
      }));
    } else if (name === 'procedure') {
      const selectedProcedure = procedureTypes.find(p => p.value === value);
      setFormData(prev => ({
        ...prev,
        procedure: value,
        cost: selectedProcedure ? selectedProcedure.cost : prev.cost
      }));
    } else if (name === 'followUpRequired') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        followUpRequired: checked,
        followUpDate: checked ? prev.followUpDate : ''
      }));
    } else if (name === 'cost') {
      setFormData(prev => ({
        ...prev,
        cost: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
    if (!formData.dentistId) newErrors.dentistId = 'Dentist is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.procedure.trim()) newErrors.procedure = 'Procedure is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.cost <= 0) newErrors.cost = 'Cost must be greater than 0';
    if (!formData.status) newErrors.status = 'Status is required';
    if (formData.followUpRequired && !formData.followUpDate) {
      newErrors.followUpDate = 'Follow-up date is required when follow-up is needed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !treatment) return;

    const updatedTreatment: Treatment = {
      ...treatment,
      ...formData,
      patientId: treatment.patientId
    };

    onUpdateTreatment(updatedTreatment);
    handleClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen || !treatment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Edit Treatment</h2>
              <p className="text-sm text-gray-600">Update treatment details and information</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient and Dentist Information */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">Patient & Provider Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    errors.patientName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter patient name"
                />
                {errors.patientName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{errors.patientName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dentist *
                </label>
                <select
                  name="dentistId"
                  value={formData.dentistId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    errors.dentistId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a dentist</option>
                  {dentists.map((dentist) => (
                    <option key={dentist.id} value={dentist.id}>
                      {dentist.firstName} {dentist.lastName} - {dentist.specialization}
                    </option>
                  ))}
                </select>
                {errors.dentistId && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{errors.dentistId}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Treatment Details */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">Treatment Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Procedure *
                </label>
                <select
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    errors.procedure ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select procedure</option>
                  {procedureTypes.map((procedure) => (
                    <option key={procedure.value} value={procedure.value}>
                      {procedure.value} ({formatINR(procedure.cost)})
                    </option>
                  ))}
                </select>
                {errors.procedure && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{errors.procedure}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    errors.date ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{errors.date}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost (₹) *
                </label>
                <div className="relative">
                  <IndianRupee className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                      errors.cost ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                </div>
                {errors.cost && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{errors.cost}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    errors.status ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{errors.status}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Detailed description of the treatment"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Additional notes about the treatment"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="followUpRequired"
                  checked={formData.followUpRequired}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Follow-up Required
                  </label>
                  <p className="text-xs text-gray-500">Check if this treatment requires a follow-up appointment</p>
                </div>
              </div>

              {formData.followUpRequired && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-up Date *
                  </label>
                  <input
                    type="date"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleInputChange}
                    className={`w-full md:w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                      errors.followUpDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.followUpDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{errors.followUpDate}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTreatmentModal;
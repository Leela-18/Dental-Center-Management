import React from 'react';
import { X, AlertTriangle, Trash2, User } from 'lucide-react';
import type { Patient } from '../../types';

interface DeletePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onDeletePatient: (patientId: string) => void;
}

const DeletePatientModal: React.FC<DeletePatientModalProps> = ({ 
  isOpen, 
  onClose, 
  patient,
  onDeletePatient 
}) => {
  if (!isOpen || !patient) return null;

  const handleDelete = () => {
    onDeletePatient(patient.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-red-500 text-white px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 text-white p-2 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Delete Patient</h2>
                <p className="text-red-100 text-sm">This action cannot be undone</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Patient Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center font-semibold">
                {patient.firstName[0]}{patient.lastName[0]}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{patient.firstName} {patient.lastName}</h3>
                <p className="text-sm text-gray-600">{patient.email}</p>
                <p className="text-sm text-gray-600">{patient.phone}</p>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-red-800 mb-2">Warning: Permanent Deletion</h4>
                <div className="text-sm text-red-700 space-y-1">
                  <p>Deleting this patient will permanently remove:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>All patient information and medical records</li>
                    <li>All appointment history</li>
                    <li>All treatment records</li>
                    <li>All billing and invoice history</li>
                    <li>All associated files and documents</li>
                  </ul>
                  <p className="font-medium mt-3">This action cannot be undone!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Text */}
          <div className="mb-6">
            <p className="text-gray-700 text-center">
              Are you absolutely sure you want to delete <strong>{patient.firstName} {patient.lastName}</strong>?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Patient</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePatientModal;
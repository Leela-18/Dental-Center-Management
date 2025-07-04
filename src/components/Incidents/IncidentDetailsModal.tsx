import React from 'react';
import { X, AlertTriangle, User, Calendar, IndianRupee, FileText, Download, Eye, Edit } from 'lucide-react';
import type { Incident } from '../../types';

interface IncidentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onEditIncident?: (incident: Incident) => void;
}

const IncidentDetailsModal: React.FC<IncidentDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  incident,
  onEditIncident
}) => {
  if (!isOpen || !incident) return null;

  // Format INR currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'treatment':
        return '🦷';
      case 'consultation':
        return '💬';
      case 'emergency':
        return '🚨';
      case 'follow-up':
        return '📋';
      case 'preventive':
        return '🛡️';
      default:
        return '📄';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return '💰';
      case 'image':
        return '🖼️';
      case 'xray':
        return '🩻';
      case 'report':
        return '📊';
      case 'document':
        return '📄';
      default:
        return '📎';
    }
  };

  const handleEditIncident = () => {
    if (onEditIncident) {
      onEditIncident(incident);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 text-white p-3 rounded-lg text-2xl">
                {getCategoryIcon(incident.category)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{incident.title}</h2>
                <p className="text-sky-100">
                  Incident #{incident.id} • {incident.patientName}
                </p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(incident.status)}`}>
                    {incident.status.replace('-', ' ')}
                  </span>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(incident.priority)}`}>
                    {incident.priority}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Created</p>
                  <p className="text-lg font-bold text-blue-800">
                    {new Date(incident.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Cost</p>
                  <p className="text-lg font-bold text-green-800">
                    {formatINR(incident.cost)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Files</p>
                  <p className="text-lg font-bold text-purple-800">
                    {incident.files.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-600">Provider</p>
                  <p className="text-sm font-bold text-orange-800">
                    {incident.dentistName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">Incident Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-800 leading-relaxed">{incident.description}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(incident.category)}</span>
                    <span className="text-gray-800 font-medium capitalize">{incident.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Patient</label>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800 font-medium">{incident.patientName}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Dentist</label>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800 font-medium">{incident.dentistName}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Last Updated</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800">{new Date(incident.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {incident.resolvedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Resolved Date</label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">{new Date(incident.resolvedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Treatment Information */}
          {incident.treatment && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">Treatment Information</h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-gray-800 leading-relaxed">{incident.treatment}</p>
              </div>

              {incident.cost > 0 && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">Treatment Cost</span>
                    <span className="text-lg font-bold text-green-800">{formatINR(incident.cost)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Next Appointment */}
          {incident.nextAppointmentDate && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800">Next Appointment</h3>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-800">
                    {new Date(incident.nextAppointmentDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-blue-600">Scheduled follow-up appointment</p>
                </div>
              </div>
            </div>
          )}

          {/* File Attachments */}
          {incident.files.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">File Attachments</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {incident.files.map((file) => (
                  <div key={file.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getFileIcon(file.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 truncate">{file.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {file.type} • {(file.size / 1024).toFixed(1)} KB
                        </p>
                        <p className="text-xs text-gray-500">
                          Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-3">
                          <button className="flex items-center space-x-1 text-xs text-sky-600 hover:text-sky-800">
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>
                          <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800">
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {incident.notes && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">Notes</h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-gray-800 leading-relaxed">{incident.notes}</p>
              </div>
            </div>
          )}

          {/* Follow-up Information */}
          {incident.followUpRequired && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-yellow-800">Follow-up Required</h3>
              </div>
              
              <p className="text-yellow-800">
                This incident requires follow-up care. Please ensure appropriate scheduling and monitoring.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Close
            </button>
            {onEditIncident && (
              <button 
                onClick={handleEditIncident}
                className="px-6 py-3 bg-sky-500 text-white hover:bg-sky-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Incident</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailsModal;
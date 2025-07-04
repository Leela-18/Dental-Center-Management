import React from 'react';
import { X, Calendar, Clock, User, FileText, Phone, Mail } from 'lucide-react';
import type { Appointment, Treatment } from '../../types';

interface DayDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  appointments: Appointment[];
  treatments: Treatment[];
}

const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
  isOpen,
  onClose,
  date,
  appointments,
  treatments
}) => {
  if (!isOpen || !date) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTreatmentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sortedAppointments = [...appointments].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 text-white p-3 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{formatDate(date)}</h2>
                <p className="text-sky-100">
                  {appointments.length} appointments • {treatments.length} treatments
                </p>
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Appointments</p>
                  <p className="text-2xl font-bold text-blue-800">{appointments.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Treatments</p>
                  <p className="text-2xl font-bold text-purple-800">{treatments.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Total Duration</p>
                  <p className="text-2xl font-bold text-green-800">
                    {appointments.reduce((total, apt) => total + apt.duration, 0)} min
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          {appointments.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">Appointments</h3>
              </div>
              
              <div className="space-y-4">
                {sortedAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-sky-100 text-sky-600 p-3 rounded-full">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-lg">{appointment.patientName}</h4>
                          <p className="text-gray-600">{appointment.type}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time} ({appointment.duration} min)</span>
                        </div>
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <User className="w-4 h-4" />
                          <span><strong>Dentist:</strong> {appointment.dentistName}</span>
                        </div>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}

                    {appointment.treatmentPlan && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Treatment Plan:</strong> {appointment.treatmentPlan}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex space-x-3">
                      <button className="text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                        Edit
                      </button>
                      {appointment.status === 'scheduled' && (
                        <button className="text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Treatments Section */}
          {treatments.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">Treatments</h3>
              </div>
              
              <div className="space-y-4">
                {treatments.map((treatment) => (
                  <div key={treatment.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-lg">{treatment.procedure}</h4>
                          <p className="text-gray-600">{treatment.patientName}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800 mb-2">${treatment.cost}</div>
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getTreatmentStatusColor(treatment.status)}`}>
                          {treatment.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600">{treatment.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <User className="w-4 h-4" />
                          <span><strong>Dentist:</strong> {treatment.dentistName}</span>
                        </div>
                      </div>
                    </div>

                    {treatment.notes && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {treatment.notes}
                        </p>
                      </div>
                    )}

                    {treatment.followUpRequired && treatment.followUpDate && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Follow-up required:</strong> {new Date(treatment.followUpDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex space-x-3">
                      <button className="text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                        Edit
                      </button>
                      {treatment.status === 'planned' && (
                        <button className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                          Start Treatment
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {appointments.length === 0 && treatments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No appointments or treatments</h3>
              <p className="text-gray-600">This day has no scheduled appointments or treatments.</p>
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
            <button className="px-6 py-3 bg-sky-500 text-white hover:bg-sky-600 rounded-lg transition-colors font-medium flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayDetailsModal;
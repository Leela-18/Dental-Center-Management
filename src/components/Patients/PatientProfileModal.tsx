import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, AlertTriangle, FileText, Clock, Heart, Edit, Trash2 } from 'lucide-react';
import BookAppointmentModal from '../Appointments/BookAppointmentModal';
import type { Patient, Appointment } from '../../types';

interface PatientProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onBookAppointment?: (appointment: Omit<Appointment, 'id'>) => void;
  onEditPatient?: (patient: Patient) => void;
  onDeletePatient?: (patient: Patient) => void;
}

const PatientProfileModal: React.FC<PatientProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  patient,
  onBookAppointment,
  onEditPatient,
  onDeletePatient
}) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookAppointment = (appointment: Omit<Appointment, 'id'>) => {
    if (onBookAppointment) {
      onBookAppointment(appointment);
    }
    setIsBookingModalOpen(false);
  };

  const handleEditPatient = () => {
    if (onEditPatient && patient) {
      onEditPatient(patient);
    }
    onClose();
  };

  const handleDeletePatient = () => {
    if (onDeletePatient && patient) {
      onDeletePatient(patient);
    }
    onClose();
  };

  if (!isOpen || !patient) return null;

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                  {patient.firstName[0]}{patient.lastName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{patient.firstName} {patient.lastName}</h2>
                  <p className="text-sky-100">Patient ID: #{patient.id}</p>
                  <p className="text-sky-100">Age: {calculateAge(patient.dateOfBirth)} years old</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Patient Since</p>
                    <p className="text-lg font-bold text-blue-800">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">Last Visit</p>
                    <p className="text-lg font-bold text-green-800">
                      {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'No visits yet'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-600">Health Status</p>
                    <p className="text-lg font-bold text-purple-800">
                      {patient.allergies.length > 0 || patient.medicalHistory.length > 0 ? 'Needs Attention' : 'Good'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                    <p className="text-lg font-semibold text-gray-800">{patient.firstName} {patient.lastName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-800">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                      <span className="text-sm text-gray-500">({calculateAge(patient.dateOfBirth)} years old)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${patient.email}`} className="text-sky-600 hover:text-sky-800 hover:underline">
                        {patient.email}
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${patient.phone}`} className="text-sky-600 hover:text-sky-800 hover:underline">
                        {patient.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">Address</h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-gray-800 leading-relaxed">{patient.address}</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-800">Emergency Contact</h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                    <p className="font-semibold text-gray-800">{patient.emergencyContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                    <a href={`tel:${patient.emergencyContact.phone}`} className="text-sky-600 hover:text-sky-800 hover:underline font-medium">
                      {patient.emergencyContact.phone}
                    </a>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Relationship</label>
                    <p className="text-gray-800">{patient.emergencyContact.relationship}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">Medical Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Medical History */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-3">Medical History</label>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 min-h-[120px]">
                    {patient.medicalHistory.length > 0 ? (
                      <div className="space-y-2">
                        {patient.medicalHistory.map((condition, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-800">{condition}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <Heart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p>No medical history recorded</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-3">Allergies</label>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 min-h-[120px]">
                    {patient.allergies.length > 0 ? (
                      <div className="space-y-2">
                        {patient.allergies.map((allergy, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-gray-800 font-medium">{allergy}</span>
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">ALLERGY</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p>No known allergies</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
              {onDeletePatient && (
                <button 
                  onClick={handleDeletePatient}
                  className="px-6 py-3 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Patient</span>
                </button>
              )}
              {onEditPatient && (
                <button 
                  onClick={handleEditPatient}
                  className="px-6 py-3 bg-sky-500 text-white hover:bg-sky-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Patient</span>
                </button>
              )}
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        patient={patient}
        onBookAppointment={handleBookAppointment}
      />
    </>
  );
};

export default PatientProfileModal;
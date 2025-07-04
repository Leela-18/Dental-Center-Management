import React, { useState } from 'react';
import { Calendar, User, FileText, Clock, Phone, Mail, MapPin, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockAppointments, mockPatients, mockTreatments } from '../../data/mockData';
import BookAppointmentModal from '../Appointments/BookAppointmentModal';
import type { Appointment } from '../../types';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Find patient data based on user email
  const patientData = mockPatients.find(p => p.email === user?.email);
  
  // Get patient's appointments and treatments
  const patientAppointments = mockAppointments.filter(apt => 
    apt.patientName === `${user?.firstName} ${user?.lastName}` || 
    apt.patientId === patientData?.id
  );
  
  const patientTreatments = mockTreatments.filter(treatment => 
    treatment.patientName === `${user?.firstName} ${user?.lastName}` ||
    treatment.patientId === patientData?.id
  );

  // Get upcoming appointments
  const today = new Date();
  const upcomingAppointments = patientAppointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= today;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Get recent treatments
  const recentTreatments = patientTreatments
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Format INR currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBookAppointment = (appointment: Omit<Appointment, 'id'>) => {
    // In a real app, this would save to the appointments list
    console.log('Booking appointment:', appointment);
    alert(`Appointment request submitted for ${appointment.date} at ${appointment.time}`);
    setIsBookingModalOpen(false);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.firstName}!</h1>
              <p className="text-gray-600">Manage your dental appointments and health records</p>
            </div>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2 shadow-sm hover:shadow-md"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-gray-800">{upcomingAppointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Treatments</p>
                <p className="text-2xl font-bold text-gray-800">{patientTreatments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Visit</p>
                <p className="text-lg font-bold text-gray-800">
                  {patientData?.lastVisit ? new Date(patientData.lastVisit).toLocaleDateString() : 'No visits'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Patient Since</p>
                <p className="text-lg font-bold text-gray-800">
                  {patientData?.createdAt ? new Date(patientData.createdAt).getFullYear() : 'New'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>

              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">{appointment.type}</h3>
                          <p className="text-sm text-gray-600">Dr. {appointment.dentistName}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status.replace('-', ' ')}
                        </span>
                      </div>
                      {appointment.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No upcoming appointments</h3>
                  <p className="text-gray-600 mb-4">Schedule your next dental visit</p>
                  <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Patient Profile */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">Your Profile</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-sky-100 text-sky-600 w-12 h-12 rounded-full flex items-center justify-center font-semibold">
                    {user?.firstName[0]}{user?.lastName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-gray-600">Patient</p>
                  </div>
                </div>

                {patientData && (
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{patientData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{patientData.phone}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span className="text-xs">{patientData.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Health Alerts */}
            {patientData && (patientData.allergies.length > 0 || patientData.medicalHistory.length > 0) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Health Information</h3>
                </div>

                <div className="space-y-4">
                  {patientData.allergies.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Allergies</p>
                      <div className="space-y-1">
                        {patientData.allergies.map((allergy, index) => (
                          <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {patientData.medicalHistory.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Medical History</p>
                      <div className="space-y-1">
                        {patientData.medicalHistory.map((condition, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Treatments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Treatments</h2>
            <FileText className="w-5 h-5 text-gray-400" />
          </div>

          {recentTreatments.length > 0 ? (
            <div className="space-y-4">
              {recentTreatments.map((treatment) => (
                <div key={treatment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{treatment.procedure}</h3>
                      <p className="text-sm text-gray-600">{treatment.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(treatment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>Dr. {treatment.dentistName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getTreatmentStatusColor(treatment.status)}`}>
                        {treatment.status.replace('-', ' ')}
                      </span>
                      <p className="text-lg font-bold text-gray-800 mt-2">{formatINR(treatment.cost)}</p>
                    </div>
                  </div>
                  {treatment.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{treatment.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No treatments yet</h3>
              <p className="text-gray-600">Your treatment history will appear here</p>
            </div>
          )}
        </div>
      </div>

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        patient={patientData}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default PatientDashboard;
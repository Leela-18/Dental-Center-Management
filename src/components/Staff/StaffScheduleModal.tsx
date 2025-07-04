import React from 'react';
import { X, Calendar, Clock, User, MapPin, Phone, Mail } from 'lucide-react';
import { mockAppointments } from '../../data/mockData';
import type { Staff, Appointment } from '../../types';

interface StaffScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
}

const StaffScheduleModal: React.FC<StaffScheduleModalProps> = ({ 
  isOpen, 
  onClose, 
  staff
}) => {
  if (!isOpen || !staff) return null;

  // Get appointments for this staff member
  const staffAppointments = mockAppointments.filter(apt => apt.dentistId === staff.id);
  
  // Get today's date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Filter appointments by time periods
  const todayAppointments = staffAppointments.filter(apt => apt.date === todayStr);
  const upcomingAppointments = staffAppointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate > today;
  }).slice(0, 10); // Show next 10 appointments
  
  // Working hours for different roles
  const getWorkingHours = (role: string) => {
    switch (role) {
      case 'dentist':
        return 'Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM';
      case 'hygienist':
        return 'Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM';
      case 'assistant':
        return 'Monday - Friday: 7:30 AM - 6:30 PM, Saturday: 8:30 AM - 2:30 PM';
      case 'receptionist':
        return 'Monday - Friday: 7:00 AM - 7:00 PM, Saturday: 8:00 AM - 3:00 PM';
      default:
        return 'Monday - Friday: 9:00 AM - 5:00 PM';
    }
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
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate schedule statistics
  const totalAppointments = staffAppointments.length;
  const completedAppointments = staffAppointments.filter(apt => apt.status === 'completed').length;
  const upcomingCount = upcomingAppointments.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 text-white p-3 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{staff.firstName} {staff.lastName} - Schedule</h2>
                <p className="text-green-100">
                  {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)} Schedule & Appointments
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
          {/* Schedule Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-blue-800">{todayAppointments.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Upcoming</p>
                  <p className="text-2xl font-bold text-green-800">{upcomingCount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Total Appointments</p>
                  <p className="text-2xl font-bold text-purple-800">{totalAppointments}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-600">Completed</p>
                  <p className="text-2xl font-bold text-orange-800">{completedAppointments}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">Working Hours</h3>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-gray-800 font-medium">{getWorkingHours(staff.role)}</p>
              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Currently Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{staff.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">Today's Schedule</h3>
              <span className="text-sm text-gray-500">({today.toLocaleDateString()})</span>
            </div>
            
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-sky-100 text-sky-600 p-2 rounded-lg">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{appointment.patientName}</h4>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time} ({appointment.duration} min)</span>
                          </div>
                        </div>
                        
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Calendar className="w-12 h-12 mx-auto" />
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">No appointments today</h4>
                <p className="text-gray-600">This staff member has no scheduled appointments for today.</p>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">Upcoming Appointments</h3>
            </div>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{appointment.patientName}</h4>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time} ({appointment.duration} min)</span>
                          </div>
                        </div>
                        
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Clock className="w-12 h-12 mx-auto" />
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">No upcoming appointments</h4>
                <p className="text-gray-600">This staff member has no scheduled upcoming appointments.</p>
              </div>
            )}
          </div>

          {/* Weekly Schedule Overview */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">Weekly Schedule Overview</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                const dayAppointments = staffAppointments.filter(apt => {
                  const aptDate = new Date(apt.date);
                  return aptDate.getDay() === (index + 1) % 7;
                });
                
                return (
                  <div key={day} className="bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">{day}</h4>
                    {index < 6 ? ( // Monday to Saturday
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">
                          {staff.role === 'dentist' ? '8:00 AM - 6:00 PM' :
                           staff.role === 'hygienist' ? '8:00 AM - 5:00 PM' :
                           staff.role === 'assistant' ? '7:30 AM - 6:30 PM' :
                           '7:00 AM - 7:00 PM'}
                        </p>
                        <p className="text-xs font-medium text-blue-600">
                          {dayAppointments.length} appointments
                        </p>
                      </div>
                    ) : ( // Sunday
                      <p className="text-xs text-gray-500">Off</p>
                    )}
                  </div>
                );
              })}
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
            <button className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors font-medium flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffScheduleModal;
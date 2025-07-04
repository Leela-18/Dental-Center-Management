import React from 'react';
import { X, User, Mail, Phone, Badge, Calendar, MapPin, Award, Clock } from 'lucide-react';
import type { Staff } from '../../types';

interface StaffProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  onEditStaff?: (staff: Staff) => void;
  onViewSchedule?: (staff: Staff) => void;
}

const StaffProfileModal: React.FC<StaffProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  staff,
  onEditStaff,
  onViewSchedule
}) => {
  if (!isOpen || !staff) return null;

  const calculateYearsOfService = (hireDate: string) => {
    const today = new Date();
    const hire = new Date(hireDate);
    const years = today.getFullYear() - hire.getFullYear();
    const months = today.getMonth() - hire.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < hire.getDate())) {
      return years - 1;
    }
    
    return years;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'dentist':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hygienist':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'assistant':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'receptionist':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const handleEditStaff = () => {
    if (onEditStaff) {
      onEditStaff(staff);
    }
    onClose();
  };

  const handleViewSchedule = () => {
    if (onViewSchedule) {
      onViewSchedule(staff);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                {staff.firstName[0]}{staff.lastName[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{staff.firstName} {staff.lastName}</h2>
                <p className="text-sky-100">Staff ID: #{staff.id}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getRoleColor(staff.role)}`}>
                    {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                  </span>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(staff.status)}`}>
                    {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Years of Service</p>
                  <p className="text-lg font-bold text-blue-800">
                    {calculateYearsOfService(staff.hireDate)} years
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
                  <p className="text-sm font-medium text-green-600">Hire Date</p>
                  <p className="text-lg font-bold text-green-800">
                    {new Date(staff.hireDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Role</p>
                  <p className="text-lg font-bold text-purple-800">
                    {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
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
                  <p className="text-lg font-semibold text-gray-800">{staff.firstName} {staff.lastName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${staff.email}`} className="text-sky-600 hover:text-sky-800 hover:underline">
                      {staff.email}
                    </a>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a href={`tel:${staff.phone}`} className="text-sky-600 hover:text-sky-800 hover:underline">
                      {staff.phone}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                  <div className="flex items-center space-x-2">
                    <Badge className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800 font-medium">
                      {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                    </span>
                  </div>
                </div>
                
                {staff.specialization && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Specialization</label>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800 font-medium">{staff.specialization}</span>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Employment Status</label>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(staff.status)}`}>
                    {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">Professional Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Hire Date</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800">{new Date(staff.hireDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Years of Service</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800 font-medium">
                      {calculateYearsOfService(staff.hireDate)} years
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {staff.licenseNumber && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">License Number</label>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <span className="text-gray-800 font-mono text-sm">{staff.licenseNumber}</span>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <span className="text-gray-800">
                      {staff.role === 'dentist' ? 'Clinical Services' :
                       staff.role === 'hygienist' ? 'Preventive Care' :
                       staff.role === 'assistant' ? 'Clinical Support' :
                       staff.role === 'receptionist' ? 'Front Office' :
                       'Administration'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Badge className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">Performance Summary</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">98%</p>
                  <p className="text-sm text-gray-600">Patient Satisfaction</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">95%</p>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {staff.role === 'dentist' ? '150+' : 
                     staff.role === 'hygienist' ? '200+' : 
                     '100+'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {staff.role === 'dentist' ? 'Procedures' : 
                     staff.role === 'hygienist' ? 'Cleanings' : 
                     'Assists'} This Month
                  </p>
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
            <button 
              onClick={handleEditStaff}
              className="px-6 py-3 bg-sky-500 text-white hover:bg-sky-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Edit Staff Member</span>
            </button>
            <button 
              onClick={handleViewSchedule}
              className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>View Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileModal;
import React, { useState } from 'react';
import { UserCheck, Plus, Search, Mail, Phone, Badge, Eye, Edit } from 'lucide-react';
import { mockStaff } from '../../data/mockData';
import StaffProfileModal from './StaffProfileModal';
import EditStaffModal from './EditStaffModal';
import StaffScheduleModal from './StaffScheduleModal';
import type { Staff } from '../../types';

const StaffList: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const filteredStaff = staff.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setIsProfileModalOpen(true);
  };

  const handleEditStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setIsEditModalOpen(true);
  };

  const handleEditStaffFromProfile = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setIsProfileModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleViewSchedule = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setIsScheduleModalOpen(true);
  };

  const handleUpdateStaff = (updatedStaff: Staff) => {
    setStaff(prev => 
      prev.map(member => 
        member.id === updatedStaff.id ? updatedStaff : member
      )
    );
    setIsEditModalOpen(false);
    setSelectedStaff(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'dentist':
        return 'bg-blue-100 text-blue-800';
      case 'hygienist':
        return 'bg-green-100 text-green-800';
      case 'assistant':
        return 'bg-purple-100 text-purple-800';
      case 'receptionist':
        return 'bg-yellow-100 text-yellow-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff</h1>
          <p className="text-gray-600">Manage dental practice staff and team members</p>
        </div>
        <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredStaff.length} staff members
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-sky-100 text-sky-600 w-12 h-12 rounded-full flex items-center justify-center font-semibold">
                    {member.firstName[0]}{member.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{member.firstName} {member.lastName}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => handleViewProfile(member)}
                    className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEditStaff(member)}
                    className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="Edit Staff"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <div className={`w-3 h-3 rounded-full ${member.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                {member.specialization && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Badge className="w-4 h-4" />
                    <span className="truncate">{member.specialization}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-xs text-gray-500">
                {member.licenseNumber && (
                  <div>License: {member.licenseNumber}</div>
                )}
                <div>Hired: {new Date(member.hireDate).toLocaleDateString()}</div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                <button 
                  onClick={() => handleViewProfile(member)}
                  className="flex-1 text-sky-600 hover:bg-sky-50 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => handleEditStaff(member)}
                  className="flex-1 text-gray-600 hover:bg-gray-50 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <UserCheck className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No staff members found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <StaffProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        staff={selectedStaff}
        onEditStaff={handleEditStaffFromProfile}
        onViewSchedule={handleViewSchedule}
      />

      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staff={selectedStaff}
        onUpdateStaff={handleUpdateStaff}
      />

      <StaffScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        staff={selectedStaff}
      />
    </div>
  );
};

export default StaffList;
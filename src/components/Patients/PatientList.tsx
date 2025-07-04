import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Phone, Mail, Trash2 } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import AddPatientModal from './AddPatientModal';
import PatientProfileModal from './PatientProfileModal';
import EditPatientModal from './EditPatientModal';
import DeletePatientModal from './DeletePatientModal';
import type { Patient, Appointment } from '../../types';

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleAddPatient = (newPatientData: Omit<Patient, 'id' | 'createdAt'>) => {
    const newPatient: Patient = {
      ...newPatientData,
      id: (patients.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setPatients(prev => [...prev, newPatient]);
  };

  const handleViewProfile = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsProfileModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleDeletePatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (patientId: string) => {
    setPatients(prev => prev.filter(patient => patient.id !== patientId));
    setSelectedPatient(null);
    // You could add a toast notification here
    alert('Patient deleted successfully');
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setPatients(prev => 
      prev.map(patient => 
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
  };

  const handleBookAppointment = (appointment: Omit<Appointment, 'id'>) => {
    // In a real app, this would save to the appointments list
    console.log('Booking appointment:', appointment);
    // You could add a toast notification here
    alert(`Appointment booked for ${appointment.patientName} on ${appointment.date} at ${appointment.time}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-sky-100 text-sky-600 w-12 h-12 rounded-full flex items-center justify-center font-semibold">
                    {patient.firstName[0]}{patient.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{patient.firstName} {patient.lastName}</h3>
                    <p className="text-sm text-gray-500">
                      Born: {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => handleViewProfile(patient)}
                    className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="View Full Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEditPatient(patient)}
                    className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="Edit Patient"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeletePatient(patient)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Patient"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phone}</span>
                </div>
              </div>

              <div className="space-y-2">
                {patient.allergies.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                      Allergies: {patient.allergies.join(', ')}
                    </span>
                  </div>
                )}
                {patient.lastVisit && (
                  <div className="text-xs text-gray-500">
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                <button 
                  onClick={() => handleViewProfile(patient)}
                  className="flex-1 text-sky-600 hover:bg-sky-50 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => handleEditPatient(patient)}
                  className="flex-1 text-orange-600 hover:bg-orange-50 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePatient(patient)}
                  className="flex-1 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No patients found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPatient={handleAddPatient}
      />

      <PatientProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        patient={selectedPatient}
        onBookAppointment={handleBookAppointment}
      />

      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient={selectedPatient}
        onUpdatePatient={handleUpdatePatient}
      />

      <DeletePatientModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        patient={selectedPatient}
        onDeletePatient={handleConfirmDelete}
      />
    </div>
  );
};

export default PatientList;
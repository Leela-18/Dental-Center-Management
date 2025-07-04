import React, { useState } from 'react';
import { FileText, Plus, Search, User, Calendar, IndianRupee, Filter } from 'lucide-react';
import { mockTreatments } from '../../data/mockData';
import EditTreatmentModal from './EditTreatmentModal';
import type { Treatment } from '../../types';

const TreatmentList: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  // Format INR currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.dentistName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || treatment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEditTreatment = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsEditModalOpen(true);
  };

  const handleUpdateTreatment = (updatedTreatment: Treatment) => {
    setTreatments(prev => 
      prev.map(treatment => 
        treatment.id === updatedTreatment.id ? updatedTreatment : treatment
      )
    );
    setIsEditModalOpen(false);
    setSelectedTreatment(null);
  };

  const handleStartTreatment = (treatmentId: string) => {
    setTreatments(prev => 
      prev.map(treatment => 
        treatment.id === treatmentId 
          ? { ...treatment, status: 'in-progress' as const }
          : treatment
      )
    );
  };

  const handleCompleteTreatment = (treatmentId: string) => {
    setTreatments(prev => 
      prev.map(treatment => 
        treatment.id === treatmentId 
          ? { ...treatment, status: 'completed' as const }
          : treatment
      )
    );
  };

  const getStatusColor = (status: string) => {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Treatments</h1>
          <p className="text-gray-600">Track patient treatments and procedures</p>
        </div>
        <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Treatment</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredTreatments.length} treatments
          </div>
        </div>

        <div className="space-y-4">
          {filteredTreatments.map((treatment) => (
            <div key={treatment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{treatment.procedure}</h3>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(treatment.status)}`}>
                        {treatment.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{treatment.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{treatment.patientName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(treatment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <IndianRupee className="w-4 h-4" />
                        <span>{formatINR(treatment.cost)}</span>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      <strong>Dentist:</strong> {treatment.dentistName}
                    </div>

                    {treatment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {treatment.notes}
                        </p>
                      </div>
                    )}

                    {treatment.followUpRequired && treatment.followUpDate && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Follow-up required:</strong> {new Date(treatment.followUpDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditTreatment(treatment)}
                    className="text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  {treatment.status === 'planned' && (
                    <button 
                      onClick={() => handleStartTreatment(treatment.id)}
                      className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Start
                    </button>
                  )}
                  {treatment.status === 'in-progress' && (
                    <button 
                      onClick={() => handleCompleteTreatment(treatment.id)}
                      className="text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTreatments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No treatments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <EditTreatmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        treatment={selectedTreatment}
        onUpdateTreatment={handleUpdateTreatment}
      />
    </div>
  );
};

export default TreatmentList;
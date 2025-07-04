import React, { useState } from 'react';
import { AlertTriangle, Plus, Search, User, Calendar, IndianRupee, Filter, FileText, Clock } from 'lucide-react';
import { mockIncidents } from '../../data/mockData';
import AddIncidentModal from './AddIncidentModal';
import IncidentDetailsModal from './IncidentDetailsModal';
import EditIncidentModal from './EditIncidentModal';
import type { Incident } from '../../types';

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // Format INR currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || incident.category === filterCategory;
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    return matchesSearch && matchesStatus && matchesCategory && matchesSeverity;
  });

  const handleAddIncident = (incident: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIncident: Incident = {
      ...incident,
      id: (incidents.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setIncidents(prev => [...prev, newIncident]);
  };

  const handleViewDetails = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDetailsModalOpen(true);
  };

  const handleEditIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsEditModalOpen(true);
  };

  const handleUpdateIncident = (updatedIncident: Incident) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === updatedIncident.id 
          ? { ...updatedIncident, updatedAt: new Date().toISOString().split('T')[0] }
          : incident
      )
    );
    setIsEditModalOpen(false);
    setSelectedIncident(null);
  };

  const handleResolveIncident = (incidentId: string) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { 
              ...incident, 
              status: 'resolved' as const,
              resolvedAt: new Date().toISOString().split('T')[0],
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : incident
      )
    );
  };

  const handleCloseIncident = (incidentId: string) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { 
              ...incident, 
              status: 'closed' as const,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : incident
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Incidents</h1>
          <p className="text-gray-600">Manage and track patient incidents and follow-ups</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Incident</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Open Incidents</p>
              <p className="text-2xl font-bold text-gray-800">
                {incidents.filter(i => i.status === 'open').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-800">
                {incidents.filter(i => i.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 text-red-600 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Critical/High</p>
              <p className="text-2xl font-bold text-gray-800">
                {incidents.filter(i => i.severity === 'critical' || i.severity === 'high').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatINR(incidents.reduce((sum, i) => sum + i.cost, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search incidents..."
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
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="treatment">Treatment</option>
              <option value="consultation">Consultation</option>
              <option value="emergency">Emergency</option>
              <option value="follow-up">Follow-up</option>
              <option value="preventive">Preventive</option>
            </select>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredIncidents.length} incidents
          </div>
        </div>

        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <div key={incident.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-2xl">{getCategoryIcon(incident.category)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{incident.title}</h3>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(incident.status)}`}>
                        {incident.status.replace('-', ' ')}
                      </span>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(incident.priority)}`}>
                        {incident.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{incident.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{incident.patientName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <IndianRupee className="w-4 h-4" />
                        <span>{formatINR(incident.cost)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{incident.files.length} files</span>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      <strong>Dentist:</strong> {incident.dentistName}
                    </div>

                    {incident.nextAppointmentDate && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Next Appointment:</strong> {new Date(incident.nextAppointmentDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {incident.treatment && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Treatment:</strong> {incident.treatment}
                        </p>
                      </div>
                    )}

                    {incident.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {incident.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleViewDetails(incident)}
                    className="text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditIncident(incident)}
                    className="text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  {incident.status === 'open' && (
                    <button 
                      onClick={() => handleResolveIncident(incident.id)}
                      className="text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Resolve
                    </button>
                  )}
                  {incident.status === 'resolved' && (
                    <button 
                      onClick={() => handleCloseIncident(incident.id)}
                      className="text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIncidents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <AlertTriangle className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No incidents found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <AddIncidentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddIncident={handleAddIncident}
      />

      <IncidentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        incident={selectedIncident}
        onEditIncident={handleEditIncident}
      />

      <EditIncidentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        incident={selectedIncident}
        onUpdateIncident={handleUpdateIncident}
      />
    </div>
  );
};

export default IncidentList;
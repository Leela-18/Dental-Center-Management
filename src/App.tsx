import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthWrapper from './components/Auth/AuthWrapper';
import Sidebar from './components/Layout/Sidebar';
import AdminHeader from './components/Layout/AdminHeader';
import PatientHeader from './components/Layout/PatientHeader';
import Dashboard from './components/Dashboard/Dashboard';
import PatientDashboard from './components/Patient/PatientDashboard';
import PatientList from './components/Patients/PatientList';
import AppointmentList from './components/Appointments/AppointmentList';
import CalendarView from './components/Calendar/CalendarView';
import TreatmentList from './components/Treatments/TreatmentList';
import IncidentList from './components/Incidents/IncidentList';
import StaffList from './components/Staff/StaffList';
import InvoiceList from './components/Invoices/InvoiceList';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Show auth pages if user is not logged in
  if (!user) {
    return <AuthWrapper />;
  }

  // Patient view - simplified dashboard
  if (user.role === 'patient') {
    return (
      <div className="min-h-screen bg-gray-50">
        <PatientHeader />
        <PatientDashboard />
      </div>
    );
  }

  // Admin view - full system access
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientList />;
      case 'appointments':
        return <AppointmentList />;
      case 'calendar':
        return <CalendarView />;
      case 'treatments':
        return <TreatmentList />;
      case 'incidents':
        return <IncidentList />;
      case 'staff':
        return <StaffList />;
      case 'invoices':
        return <InvoiceList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="ml-64">
        <AdminHeader />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
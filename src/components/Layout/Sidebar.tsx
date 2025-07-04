import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  UserCheck, 
  IndianRupee,
  Activity,
  CalendarDays,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'calendar', label: 'Calendar View', icon: CalendarDays },
  { id: 'treatments', label: 'Treatments', icon: FileText },
  { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
  { id: 'staff', label: 'Staff', icon: UserCheck },
  { id: 'invoices', label: 'Invoices', icon: IndianRupee },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-0 z-10">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-sky-500 text-white p-2 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Dental Center</h1>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-sky-50 text-sky-600 border-r-4 border-sky-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
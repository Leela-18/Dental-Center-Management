export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  createdAt: string;
  lastVisit?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  treatmentPlan?: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  date: string;
  procedure: string;
  description: string;
  cost: number;
  status: 'planned' | 'in-progress' | 'completed';
  notes: string;
  followUpRequired: boolean;
  followUpDate?: string;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'dentist' | 'hygienist' | 'assistant' | 'receptionist' | 'admin';
  specialization?: string;
  licenseNumber?: string;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  treatments: {
    id: string;
    procedure: string;
    cost: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
}

export interface IncidentFile {
  id: string;
  name: string;
  type: 'invoice' | 'image' | 'document' | 'xray' | 'report';
  url: string;
  size: number;
  uploadedAt: string;
}

export interface Incident {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  title: string;
  description: string;
  category: 'treatment' | 'consultation' | 'emergency' | 'follow-up' | 'preventive';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  dentistId: string;
  dentistName: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  cost: number;
  treatment?: string;
  nextAppointmentDate?: string;
  files: IncidentFile[];
  notes: string;
  followUpRequired: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}
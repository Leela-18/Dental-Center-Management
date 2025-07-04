import { Patient, Appointment, Treatment, Staff, Invoice, Incident } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-03-15',
    address: '123 Oak Street, Springfield, IL 62701',
    emergencyContact: {
      name: 'Mike Johnson',
      phone: '(555) 123-4568',
      relationship: 'Spouse'
    },
    medicalHistory: ['Hypertension', 'Previous root canal'],
    allergies: ['Penicillin'],
    createdAt: '2024-01-15',
    lastVisit: '2024-12-15'
  },
  {
    id: '2',
    firstName: 'David',
    lastName: 'Miller',
    email: 'david.miller@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1978-07-22',
    address: '456 Pine Avenue, Springfield, IL 62702',
    emergencyContact: {
      name: 'Lisa Miller',
      phone: '(555) 234-5679',
      relationship: 'Wife'
    },
    medicalHistory: ['Diabetes Type 2'],
    allergies: [],
    createdAt: '2024-02-10',
    lastVisit: '2024-12-10'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1992-11-08',
    address: '789 Maple Drive, Springfield, IL 62703',
    emergencyContact: {
      name: 'Robert Davis',
      phone: '(555) 345-6790',
      relationship: 'Father'
    },
    medicalHistory: [],
    allergies: ['Latex'],
    createdAt: '2024-03-05',
    lastVisit: '2024-12-20'
  },
  {
    id: '4',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1980-05-12',
    address: '321 Elm Street, Springfield, IL 62704',
    emergencyContact: {
      name: 'Jennifer Brown',
      phone: '(555) 456-7891',
      relationship: 'Wife'
    },
    medicalHistory: ['High Blood Pressure'],
    allergies: [],
    createdAt: '2024-04-01',
    lastVisit: '2024-12-18'
  },
  {
    id: '5',
    firstName: 'Jessica',
    lastName: 'Wilson',
    email: 'jessica.wilson@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1995-09-25',
    address: '654 Cedar Avenue, Springfield, IL 62705',
    emergencyContact: {
      name: 'Mark Wilson',
      phone: '(555) 567-8902',
      relationship: 'Husband'
    },
    medicalHistory: [],
    allergies: ['Ibuprofen'],
    createdAt: '2024-05-15',
    lastVisit: '2024-12-22'
  }
];

export const mockStaff: Staff[] = [
  {
    id: '1',
    firstName: 'Dr. Michael',
    lastName: 'Thompson',
    email: 'mthompson@dentalcenter.com',
    phone: '(555) 111-2222',
    role: 'dentist',
    specialization: 'General Dentistry',
    licenseNumber: 'DDS-12345',
    hireDate: '2020-01-15',
    status: 'active'
  },
  {
    id: '2',
    firstName: 'Dr. Jennifer',
    lastName: 'Wilson',
    email: 'jwilson@dentalcenter.com',
    phone: '(555) 222-3333',
    role: 'dentist',
    specialization: 'Orthodontics',
    licenseNumber: 'DDS-23456',
    hireDate: '2021-03-20',
    status: 'active'
  },
  {
    id: '3',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'mgarcia@dentalcenter.com',
    phone: '(555) 333-4444',
    role: 'hygienist',
    licenseNumber: 'RDH-34567',
    hireDate: '2022-06-10',
    status: 'active'
  }
];

// Helper function to get dates for the current month and next month
const getCurrentMonthDates = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  // Get various dates in current and next month
  const dates = [];
  
  // Today
  dates.push(today.toISOString().split('T')[0]);
  
  // Tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  dates.push(tomorrow.toISOString().split('T')[0]);
  
  // Day after tomorrow
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  dates.push(dayAfter.toISOString().split('T')[0]);
  
  // Next week
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  dates.push(nextWeek.toISOString().split('T')[0]);
  
  // In 10 days
  const tenDays = new Date(today);
  tenDays.setDate(today.getDate() + 10);
  dates.push(tenDays.toISOString().split('T')[0]);
  
  // In 2 weeks
  const twoWeeks = new Date(today);
  twoWeeks.setDate(today.getDate() + 14);
  dates.push(twoWeeks.toISOString().split('T')[0]);
  
  // Next month, same day
  const nextMonth = new Date(currentYear, currentMonth + 1, today.getDate());
  dates.push(nextMonth.toISOString().split('T')[0]);
  
  // Random days this month
  for (let i = 0; i < 5; i++) {
    const randomDay = new Date(currentYear, currentMonth, Math.floor(Math.random() * 28) + 1);
    if (randomDay >= today) {
      dates.push(randomDay.toISOString().split('T')[0]);
    }
  }
  
  return dates;
};

const currentDates = getCurrentMonthDates();

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    date: currentDates[0], // Today
    time: '09:00',
    duration: 60,
    type: 'Cleaning',
    status: 'scheduled',
    notes: 'Regular 6-month cleaning and checkup'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'David Miller',
    date: currentDates[0], // Today
    time: '10:30',
    duration: 90,
    type: 'Root Canal',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    status: 'confirmed',
    notes: 'Follow-up root canal treatment on tooth #14'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Emily Davis',
    date: currentDates[1], // Tomorrow
    time: '14:00',
    duration: 45,
    type: 'Consultation',
    dentistId: '2',
    dentistName: 'Dr. Jennifer Wilson',
    status: 'scheduled',
    notes: 'Orthodontic consultation for braces'
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Michael Brown',
    date: currentDates[2], // Day after tomorrow
    time: '11:00',
    duration: 75,
    type: 'Filling',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    status: 'confirmed',
    notes: 'Composite filling for cavity on tooth #12'
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'Jessica Wilson',
    date: currentDates[3], // Next week
    time: '15:30',
    duration: 120,
    type: 'Crown',
    dentistId: '2',
    dentistName: 'Dr. Jennifer Wilson',
    status: 'scheduled',
    notes: 'Crown placement for tooth #8'
  },
  {
    id: '6',
    patientId: '1',
    patientName: 'Sarah Johnson',
    date: currentDates[4], // In 10 days
    time: '08:30',
    duration: 30,
    type: 'Follow-up',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    status: 'scheduled',
    notes: 'Post-cleaning follow-up'
  },
  {
    id: '7',
    patientId: '3',
    patientName: 'Emily Davis',
    date: currentDates[5], // In 2 weeks
    time: '13:00',
    duration: 60,
    type: 'Orthodontic',
    dentistId: '2',
    dentistName: 'Dr. Jennifer Wilson',
    status: 'scheduled',
    notes: 'Braces adjustment appointment'
  },
  {
    id: '8',
    patientId: '2',
    patientName: 'David Miller',
    date: currentDates[6], // Next month
    time: '16:00',
    duration: 45,
    type: 'Consultation',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    status: 'scheduled',
    notes: 'Consultation for dental implant'
  },
  {
    id: '9',
    patientId: '4',
    patientName: 'Michael Brown',
    date: currentDates[7] || currentDates[1], // Random current month date
    time: '12:00',
    duration: 90,
    type: 'Extraction',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    status: 'confirmed',
    notes: 'Wisdom tooth extraction'
  },
  {
    id: '10',
    patientId: '5',
    patientName: 'Jessica Wilson',
    date: currentDates[8] || currentDates[2], // Random current month date
    time: '09:30',
    duration: 60,
    type: 'Cleaning',
    dentistId: '2',
    dentistName: 'Dr. Jennifer Wilson',
    status: 'scheduled',
    notes: 'Routine dental cleaning'
  }
];

export const mockTreatments: Treatment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    date: currentDates[0], // Today
    procedure: 'Dental Cleaning',
    description: 'Routine prophylaxis and oral examination',
    cost: 9960, // ₹9,960 (was $120)
    status: 'completed',
    notes: 'Good oral hygiene. Recommended fluoride treatment.',
    followUpRequired: true,
    followUpDate: currentDates[4] // In 10 days
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'David Miller',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    date: currentDates[1], // Tomorrow
    procedure: 'Root Canal Therapy',
    description: 'Endodontic treatment on tooth #14',
    cost: 70550, // ₹70,550 (was $850)
    status: 'in-progress',
    notes: 'First session completed. Crown placement scheduled.',
    followUpRequired: true,
    followUpDate: currentDates[5] // In 2 weeks
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Emily Davis',
    dentistId: '2',
    dentistName: 'Dr. Jennifer Wilson',
    date: currentDates[2], // Day after tomorrow
    procedure: 'Orthodontic Consultation',
    description: 'Initial consultation for braces treatment',
    cost: 12450, // ₹12,450 (was $150)
    status: 'planned',
    notes: 'Patient interested in clear aligners. X-rays needed.',
    followUpRequired: true,
    followUpDate: currentDates[6] // Next month
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Michael Brown',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    date: currentDates[3], // Next week
    procedure: 'Composite Filling',
    description: 'Tooth-colored filling for cavity',
    cost: 14940, // ₹14,940 (was $180)
    status: 'planned',
    notes: 'Small cavity on molar. Local anesthesia required.',
    followUpRequired: false
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'Jessica Wilson',
    dentistId: '2',
    dentistName: 'Dr. Jennifer Wilson',
    date: currentDates[4], // In 10 days
    procedure: 'Dental Crown',
    description: 'Porcelain crown placement',
    cost: 78850, // ₹78,850 (was $950)
    status: 'planned',
    notes: 'Crown fabricated. Ready for placement.',
    followUpRequired: true,
    followUpDate: currentDates[7] || currentDates[6]
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    date: currentDates[0],
    treatments: [
      {
        id: '1',
        procedure: 'Dental Cleaning',
        cost: 120 // Keep original USD values for conversion
      }
    ],
    subtotal: 120,
    tax: 9.6,
    total: 129.6,
    status: 'paid',
    dueDate: currentDates[3]
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'David Miller',
    date: currentDates[1],
    treatments: [
      {
        id: '2',
        procedure: 'Root Canal Therapy',
        cost: 850
      }
    ],
    subtotal: 850,
    tax: 68,
    total: 918,
    status: 'pending',
    dueDate: currentDates[5]
  },
  {
    id: '3',
    patientId: '4',
    patientName: 'Michael Brown',
    date: currentDates[2],
    treatments: [
      {
        id: '4',
        procedure: 'Composite Filling',
        cost: 180
      }
    ],
    subtotal: 180,
    tax: 14.4,
    total: 194.4,
    status: 'pending',
    dueDate: currentDates[6]
  }
];

export const mockIncidents: Incident[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Sarah Johnson',
    appointmentId: '1',
    title: 'Post-Cleaning Sensitivity',
    description: 'Patient experiencing mild sensitivity after routine cleaning. Recommended fluoride treatment.',
    category: 'treatment',
    severity: 'low',
    status: 'resolved',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    createdAt: currentDates[0],
    updatedAt: currentDates[0],
    resolvedAt: currentDates[0],
    cost: 3735, // ₹3,735 (was $45)
    treatment: 'Fluoride application and sensitivity toothpaste recommendation',
    nextAppointmentDate: currentDates[4],
    files: [
      {
        id: '1',
        name: 'post_cleaning_invoice.pdf',
        type: 'invoice',
        url: '/files/invoices/post_cleaning_invoice.pdf',
        size: 245760,
        uploadedAt: currentDates[0]
      },
      {
        id: '2',
        name: 'sensitivity_treatment_photo.jpg',
        type: 'image',
        url: '/files/images/sensitivity_treatment.jpg',
        size: 1024000,
        uploadedAt: currentDates[0]
      }
    ],
    notes: 'Patient responded well to fluoride treatment. Sensitivity reduced significantly.',
    followUpRequired: true,
    priority: 'medium'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'David Miller',
    appointmentId: '2',
    title: 'Root Canal Complication',
    description: 'Unexpected inflammation during root canal procedure. Additional treatment required.',
    category: 'emergency',
    severity: 'high',
    status: 'in-progress',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    createdAt: currentDates[0],
    updatedAt: currentDates[1],
    cost: 26560, // ₹26,560 (was $320)
    treatment: 'Anti-inflammatory medication and extended root canal therapy',
    nextAppointmentDate: currentDates[5],
    files: [
      {
        id: '3',
        name: 'root_canal_xray_before.jpg',
        type: 'xray',
        url: '/files/xrays/root_canal_before.jpg',
        size: 512000,
        uploadedAt: currentDates[0]
      },
      {
        id: '4',
        name: 'root_canal_xray_after.jpg',
        type: 'xray',
        url: '/files/xrays/root_canal_after.jpg',
        size: 498000,
        uploadedAt: currentDates[1]
      },
      {
        id: '5',
        name: 'additional_treatment_invoice.pdf',
        type: 'invoice',
        url: '/files/invoices/additional_treatment.pdf',
        size: 189440,
        uploadedAt: currentDates[1]
      }
    ],
    notes: 'Patient prescribed antibiotics. Monitoring for improvement. Crown placement postponed.',
    followUpRequired: true,
    priority: 'high'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Emily Davis',
    appointmentId: '3',
    title: 'Orthodontic Assessment',
    description: 'Comprehensive orthodontic evaluation for braces treatment planning.',
    category: 'consultation',
    severity: 'low',
    status: 'open',
    dentistId: '2',
    dentistName: 'Dr. Jennifer Wilson',
    createdAt: currentDates[1],
    updatedAt: currentDates[1],
    cost: 0,
    treatment: 'Orthodontic evaluation and treatment planning',
    nextAppointmentDate: currentDates[6],
    files: [
      {
        id: '6',
        name: 'orthodontic_photos_front.jpg',
        type: 'image',
        url: '/files/images/ortho_front.jpg',
        size: 756000,
        uploadedAt: currentDates[1]
      },
      {
        id: '7',
        name: 'orthodontic_photos_side.jpg',
        type: 'image',
        url: '/files/images/ortho_side.jpg',
        size: 689000,
        uploadedAt: currentDates[1]
      },
      {
        id: '8',
        name: 'treatment_plan_report.pdf',
        type: 'report',
        url: '/files/reports/ortho_treatment_plan.pdf',
        size: 445000,
        uploadedAt: currentDates[1]
      }
    ],
    notes: 'Patient is a good candidate for clear aligners. Detailed treatment plan to be prepared.',
    followUpRequired: true,
    priority: 'low'
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Michael Brown',
    title: 'Emergency Tooth Pain',
    description: 'Patient called with severe tooth pain. Emergency appointment scheduled.',
    category: 'emergency',
    severity: 'critical',
    status: 'open',
    dentistId: '1',
    dentistName: 'Dr. Michael Thompson',
    createdAt: currentDates[2],
    updatedAt: currentDates[2],
    cost: 0,
    nextAppointmentDate: currentDates[2],
    files: [],
    notes: 'Patient reports severe pain in lower left molar. Possible abscess. Emergency appointment needed.',
    followUpRequired: true,
    priority: 'urgent'
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'Jessica Wilson',
    title: 'Crown Preparation Follow-up',
    description: 'Follow-up after crown preparation to check healing and fit temporary crown.',
    category: 'follow-up',
    severity: 'low',
    status: 'resolved',
    dentistId: '2',
    dentistName: 'Dr. Jennifer Wilson',
    createdAt: currentDates[3],
    updatedAt: currentDates[4],
    resolvedAt: currentDates[4],
    cost: 0,
    treatment: 'Temporary crown adjustment and healing assessment',
    nextAppointmentDate: currentDates[7],
    files: [
      {
        id: '9',
        name: 'crown_prep_photo.jpg',
        type: 'image',
        url: '/files/images/crown_prep.jpg',
        size: 892000,
        uploadedAt: currentDates[3]
      }
    ],
    notes: 'Healing progressing well. Temporary crown fits properly. Ready for permanent crown placement.',
    followUpRequired: true,
    priority: 'low'
  }
];
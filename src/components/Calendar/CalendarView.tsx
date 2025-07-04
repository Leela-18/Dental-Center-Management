import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, User, FileText, Filter } from 'lucide-react';
import { mockAppointments, mockTreatments } from '../../data/mockData';
import DayDetailsModal from './DayDetailsModal';
import type { Appointment, Treatment } from '../../types';

type ViewMode = 'month' | 'week';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [filterDentist, setFilterDentist] = useState<string>('all');

  // Get unique dentists for filter
  const dentists = Array.from(new Set(mockAppointments.map(apt => apt.dentistName)));

  // Filter appointments and treatments by dentist
  const filteredAppointments = filterDentist === 'all' 
    ? mockAppointments 
    : mockAppointments.filter(apt => apt.dentistName === filterDentist);

  const filteredTreatments = filterDentist === 'all'
    ? mockTreatments
    : mockTreatments.filter(treatment => treatment.dentistName === filterDentist);

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredAppointments.filter(apt => apt.date === dateStr);
  };

  // Get treatments for a specific date
  const getTreatmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredTreatments.filter(treatment => treatment.date === dateStr);
  };

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsDayModalOpen(true);
  };

  // Month view helpers
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDay = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  // Week view helpers
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'scheduled':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderMonthView = () => {
    const days = getMonthDays();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map((day) => (
            <div key={day} className="p-4 text-center font-semibold text-gray-600 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const appointments = getAppointmentsForDate(day);
            const treatments = getTreatmentsForDate(day);
            const hasEvents = appointments.length > 0 || treatments.length > 0;

            return (
              <div
                key={index}
                onClick={() => hasEvents && handleDateClick(day)}
                className={`min-h-[120px] p-2 border-b border-r border-gray-100 ${
                  !isCurrentMonth(day) ? 'bg-gray-50 text-gray-400' : 'bg-white'
                } ${hasEvents ? 'cursor-pointer hover:bg-gray-50' : ''} ${
                  isToday(day) ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isToday(day) ? 'text-blue-600' : ''
                }`}>
                  {day.getDate()}
                </div>

                {/* Appointments */}
                <div className="space-y-1">
                  {appointments.slice(0, 2).map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`text-xs p-1 rounded text-white truncate ${getStatusColor(appointment.status)}`}
                      title={`${appointment.time} - ${appointment.patientName} (${appointment.type})`}
                    >
                      {appointment.time} {appointment.patientName}
                    </div>
                  ))}

                  {/* Treatments */}
                  {treatments.slice(0, 2 - appointments.length).map((treatment) => (
                    <div
                      key={treatment.id}
                      className="text-xs p-1 rounded bg-purple-500 text-white truncate"
                      title={`Treatment: ${treatment.procedure} - ${treatment.patientName}`}
                    >
                      {treatment.procedure}
                    </div>
                  ))}

                  {/* Show more indicator */}
                  {(appointments.length + treatments.length) > 2 && (
                    <div className="text-xs text-gray-500 font-medium">
                      +{(appointments.length + treatments.length) - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays();
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Week Header */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 bg-gray-50 border-r border-gray-200"></div>
          {days.map((day, index) => (
            <div key={index} className="p-4 text-center bg-gray-50 border-r border-gray-200">
              <div className="font-semibold text-gray-800">{weekDays[index]}</div>
              <div className={`text-2xl font-bold mt-1 ${
                isToday(day) ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="max-h-[600px] overflow-y-auto">
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-3 text-sm font-medium text-gray-600 bg-gray-50 border-r border-gray-200">
                {time}
              </div>
              {days.map((day, dayIndex) => {
                const appointments = getAppointmentsForDate(day).filter(apt => apt.time === time);
                const treatments = getTreatmentsForDate(day);

                return (
                  <div
                    key={dayIndex}
                    onClick={() => (appointments.length > 0 || treatments.length > 0) && handleDateClick(day)}
                    className={`p-2 min-h-[60px] border-r border-gray-100 ${
                      appointments.length > 0 || treatments.length > 0 ? 'cursor-pointer hover:bg-gray-50' : ''
                    }`}
                  >
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`text-xs p-2 rounded mb-1 text-white ${getStatusColor(appointment.status)}`}
                      >
                        <div className="font-medium">{appointment.patientName}</div>
                        <div>{appointment.type}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
          <p className="text-gray-600">View and manage appointments and treatments</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Dentist Filter */}
          <div className="relative">
            <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={filterDentist}
              onChange={(e) => setFilterDentist(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Dentists</option>
              {dentists.map((dentist) => (
                <option key={dentist} value={dentist}>
                  {dentist}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <button
          onClick={() => viewMode === 'month' ? navigateMonth('prev') : navigateWeek('prev')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-sky-600" />
          <h2 className="text-xl font-bold text-gray-800">
            {viewMode === 'month' 
              ? currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : `Week of ${getWeekDays()[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
            }
          </h2>
        </div>

        <button
          onClick={() => viewMode === 'month' ? navigateMonth('next') : navigateWeek('next')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Content */}
      {viewMode === 'month' ? renderMonthView() : renderWeekView()}

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Scheduled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Cancelled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Treatments</span>
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      <DayDetailsModal
        isOpen={isDayModalOpen}
        onClose={() => setIsDayModalOpen(false)}
        date={selectedDate}
        appointments={selectedDate ? getAppointmentsForDate(selectedDate) : []}
        treatments={selectedDate ? getTreatmentsForDate(selectedDate) : []}
      />
    </div>
  );
};

export default CalendarView;
import { useState, useEffect } from 'react';
import {
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getDoctorById,
} from '../services/api';

import AppointmentCard from '../components/AppointmentCard';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    getAppointments()
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load appointments. Please try again later.');
        setLoading(false);
      });
  }, []);

  const openEditForm = async (appointment) => {
    setEditingId(appointment.id);
    setEditDate(appointment.date);
    setEditTime(appointment.time);
    setEditNote(appointment.note || '');
    setEditError('');
    setSuccessMessage('');

    try {
      const response = await getDoctorById(appointment.doctorId);
      setEditDoctor(response.data);
    } catch {
      setEditDoctor(null);
      setEditError('Failed to load doctor schedule.');
    }
  };

  const closeEditForm = () => {
    setEditingId(null);
    setEditDate('');
    setEditTime('');
    setEditNote('');
    setEditError('');
    setEditDoctor(null);
  };

  const handleDelete = async (appointmentId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this appointment?'
    );

    if (!confirmed) return;

    try {
      await deleteAppointment(appointmentId);

      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId)
      );

      setSuccessMessage('Appointment cancelled successfully!');
      setError('');
    } catch {
      setError('Failed to cancel appointment. Please try again.');
    }
  };

  const handleEditSubmit = async (appointment) => {
    if (!editDate || !editTime) {
      setEditError('Date and Time are required.');
      return;
    }

    setEditLoading(true);
    setEditError('');

    const updatedData = {
      ...appointment,
      date: editDate,
      time: editTime,
      note: editNote,
    };

    const today = new Date().toISOString().split('T')[0];
    const maxDate = `${new Date().getFullYear() + 5}-12-31`;

    setEditLoading(false);

    if (editDate < today) {
      setEditError('Appointment date cannot be in the past.');
      return;
    }

    if (editDate > maxDate) {
      setEditError('Appointment date cannot be more than 5 years from now.');
      return;
    }

    try {
      const response = await updateAppointment(
        appointment.id,
        updatedData
      );

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointment.id ? response.data : a
        )
      );

      setSuccessMessage('Appointment updated successfully!');
      closeEditForm();
    } catch {
      setEditError('Failed to update appointment. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Appointments</h1>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {loading && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="spinner-border text-primary me-2" role="status">
            <span className="visually-hidden">
              Loading appointments...
            </span>
          </div>

          <span className="fs-5">
            Loading appointments...
          </span>
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <div className="alert alert-info" role="alert">
          You have no appointments yet. Book one from the Doctors page!
        </div>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="row g-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="col-12 col-md-6 col-lg-4"
            >
              <AppointmentCard
                appointment={appointment}
                editingId={editingId}
                editDate={editDate}
                editTime={editTime}
                editNote={editNote}
                editError={editError}
                editLoading={editLoading}
                editDoctor={editDoctor}
                onEdit={openEditForm}
                onDelete={handleDelete}
                onDateChange={(date) => {
  if (!editDoctor) {
    setEditDate(date);
    return;
  }

  const selectedDate = new Date(`${date}T00:00:00`);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const selectedDay = days[selectedDate.getDay()];

  if (!editDoctor.workingDays.includes(selectedDay)) {
    setEditError(
      `${editDoctor.name} does not work on ${selectedDay}. Please choose another date.`
    );
    setEditDate('');
    return;
  }

  setEditError('');
  setEditDate(date);
}}
                onTimeChange={setEditTime}
                onNoteChange={setEditNote}
                onSave={handleEditSubmit}
                onCancel={closeEditForm}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
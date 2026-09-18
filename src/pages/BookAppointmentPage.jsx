import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { createAppointment, getDoctorById } from '../services/api';

export default function BookAppointmentPage() {
  const location = useLocation();
  const doctorId = location.state?.doctorId || '';
  const doctorName = location.state?.doctorName || '';
const [doctor, setDoctor] = useState(null);
useEffect(() => {
  if (!doctorId) return;

  getDoctorById(doctorId)
    .then((response) => {
      setDoctor(response.data);
    })
    .catch(() => {
      setDoctor(null);
    });
}, [doctorId]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      doctor: doctorName,
      patientName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      note: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const appointmentData = {
      patientName: data.patientName,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      doctorId: doctorId,
      doctorName: doctorName || data.doctor,
      note: data.note || '',
      status: 'Pending',
    };

    try {
      await createAppointment(appointmentData);
      setSuccessMessage('Appointment booked successfully!');
      reset({
        doctor: doctorName,
        patientName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        note: '',
      });
    } catch {
      setErrorMessage('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: '600px' }}>
      <h1 className="mb-4">Book an Appointment</h1>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Doctor Field */}
            <div className="mb-3">
              <label htmlFor="doctor" className="form-label">
                Doctor
              </label>
              <input
                type="text"
                id="doctor"
                readOnly
                className={`form-control ${errors.doctor ? 'is-invalid' : ''}`}
                {...register('doctor', {
                  required: 'Doctor selection is required',
                })}
              />
              {errors.doctor && (
                <div className="invalid-feedback">{errors.doctor.message}</div>
              )}
            </div>

            {/* Patient Name Field */}
            <div className="mb-3">
              <label htmlFor="patientName" className="form-label">
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                placeholder="Enter full name"
                className={`form-control ${errors.patientName ? 'is-invalid' : ''}`}
                {...register('patientName', {
                  required: 'Patient Name is required',
                })}
              />
              {errors.patientName && (
                <div className="invalid-feedback">{errors.patientName.message}</div>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter phone number"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                {...register('phone', {
                  required: 'Phone number is required',
                })}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone.message}</div>
              )}
            </div>

            {/* Date Field */}
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
  type="date"
  id="date"
  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
  {...register('date', {
    required: 'Appointment date is required',

    min: {
      value: new Date().toISOString().split('T')[0],
      message: 'Appointment date cannot be in the past.',
    },

    max: {
      value: `${new Date().getFullYear() + 5}-12-31`,
      message: 'Appointment date cannot be more than 5 years from now.',
    },

    validate: (value) => {
      if (!doctor?.workingDays) return true;

      const selectedDate = new Date(`${value}T00:00:00`);
      const dayName = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
      });

      return doctor.workingDays.includes(dayName)
        ? true
        : 'Doctor is not available on this day.';
    },
  })}
/>
              {errors.date && (
                <div className="invalid-feedback">{errors.date.message}</div>
              )}
            </div>
            
{/* Time Field */}
            <div className="mb-3">
  <label htmlFor="time" className="form-label">
    Time
  </label>

  <select
    id="time"
    className={`form-select ${errors.time ? 'is-invalid' : ''}`}
    {...register('time', {
      required: 'Appointment time is required',
    })}
    disabled={!doctor?.availableSlots}
  >
    <option value="">Select a time</option>

    {doctor?.availableSlots?.map((slot) => (
      <option key={slot} value={slot}>
        {slot}
      </option>
    ))}
  </select>

  {errors.time && (
    <div className="invalid-feedback">{errors.time.message}</div>
  )}
</div>

            {/* Optional Note Field */}
            <div className="mb-4">
              <label htmlFor="note" className="form-label">
                Optional Note
              </label>
              <textarea
                id="note"
                rows="3"
                placeholder="Additional notes or medical concerns (optional)"
                className="form-control"
                {...register('note')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  Booking Appointment...
                </>
              ) : (
                'Book Appointment'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

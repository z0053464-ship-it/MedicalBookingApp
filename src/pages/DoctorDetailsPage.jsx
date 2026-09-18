import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoctorById } from '../services/api';

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDoctorById(id)
      .then((response) => {
        setDoctor(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load doctor details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        &larr; Back to Doctors
      </Link>

      {loading && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="spinner-border text-primary me-2" role="status">
            <span className="visually-hidden">Loading doctor details...</span>
          </div>
          <span className="fs-5">Loading doctor details...</span>
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && doctor && (
        <div className="card shadow-sm">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={doctor.image || 'https://via.placeholder.com/300'}
                className="img-fluid rounded-start h-100 w-100"
                alt={doctor.name}
                style={{ objectFit: 'cover', minHeight: '300px' }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body p-4 d-flex flex-column h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h2 className="card-title mb-0">{doctor.name}</h2>
                  <span className="badge bg-primary fs-6">{doctor.specialty}</span>
                </div>

                <p className="card-text text-secondary mt-3 mb-4">
                  {doctor.description}
                </p>

                <div className="mb-3">
                  <h5 className="fw-semibold">Working Days:</h5>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {doctor.workingDays && doctor.workingDays.length > 0 ? (
                      doctor.workingDays.map((day, index) => (
                        <span key={index} className="badge bg-light text-dark border">
                          {day}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">No working days listed.</span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="fw-semibold">Available Appointment Slots:</h5>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
                      doctor.availableSlots.map((slot, index) => (
                        <span
                          key={index}
                          className="badge bg-success-subtle text-success border border-success"
                        >
                          {slot}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">No slots available.</span>
                    )}
                  </div>
                </div>

                { <div className="mt-auto pt-3">
                  <Link
                    to="/book"
                    state={{ doctorId: doctor.id, doctorName: doctor.name }}
                    className="btn btn-primary btn-lg"
                  >
                    Book Appointment
                  </Link>
                </div> }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { getDoctors } from '../services/api';
import DoctorCard from '../components/DoctorCard';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    getDoctors()
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load doctors. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Dynamically extract unique specialties from loaded doctors
  const specialties = [...new Set(doctors.map((doc) => doc.specialty).filter(Boolean))];

  // Filter doctors by name and selected specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = doctor.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === '' || doctor.specialty === selectedSpecialty;
    return matchesName && matchesSpecialty;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Our Doctors</h1>

      {/* Search and Specialty Filter Controls */}
      {!loading && !error && (
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {loading && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="spinner-border text-primary me-2" role="status">
            <span className="visually-hidden">Loading doctors...</span>
          </div>
          <span className="fs-5">Loading doctors...</span>
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredDoctors.length === 0 ? (
            <div className="alert alert-warning" role="alert">
              No doctors found matching your criteria.
            </div>
          ) : (
            <div className="row g-4">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

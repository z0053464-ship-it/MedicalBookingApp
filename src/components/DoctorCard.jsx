import { Link } from 'react-router-dom';
import useAppStore from '../stores/useAppStore';

export default function DoctorCard({ doctor }) {
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);

  if (!doctor) {
    return null;
  }

  const isFavorite = favorites.includes(doctor.id);

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={doctor.image || 'https://via.placeholder.com/150'}
        className="card-img-top"
        alt={doctor.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{doctor.name}</h5>
          <button
            type="button"
            className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => toggleFavorite(doctor.id)}
            aria-label="Toggle favorite"
          >
            {isFavorite ? '♥ Favorite' : '♡ Favorite'}
          </button>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">{doctor.specialty}</h6>
        <p className="card-text text-secondary flex-grow-1">
          {doctor.description}
        </p>
        <div className="mt-auto">
          <Link to={`/doctors/${doctor.id}`} className="btn btn-primary w-100">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

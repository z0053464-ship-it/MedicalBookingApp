export default function AppointmentCard({
  appointment,
  editingId,
  editDate,
  editTime,
  editNote,
  editError,
  editLoading,
  editDoctor,
  onEdit,
  onDelete,
  onDateChange,
  onTimeChange,
  onNoteChange,
  onSave,
  onCancel,
}) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-primary">
          {appointment.doctorName}
        </h6>

        <span
  className={`badge ${
    appointment.status === 'Pending'
      ? 'bg-warning text-dark'
      : appointment.status === 'Confirmed'
        ? 'bg-success'
        : 'bg-secondary'
  }`}
>
  {appointment.status}
</span>
      </div>

      <div className="card-body">
        <ul className="list-unstyled mb-0">
          <li className="mb-2">
            <span className="fw-semibold">Patient:</span>{' '}
            {appointment.patientName}
          </li>

          <li className="mb-2">
            <span className="fw-semibold">Email:</span>{' '}
            {appointment.email}
          </li>

          <li className="mb-2">
            <span className="fw-semibold">Phone:</span>{' '}
            {appointment.phone}
          </li>

          <li className="mb-2">
            <span className="fw-semibold">Date:</span>{' '}
            {appointment.date}
          </li>

          <li className="mb-2">
            <span className="fw-semibold">Time:</span>{' '}
            {appointment.time}
          </li>

          {appointment.note && (
            <li className="mt-3 pt-3 border-top">
              <span className="fw-semibold">Note:</span>{' '}
              <span className="text-muted">{appointment.note}</span>
            </li>
          )}
        </ul>

        {editingId === appointment.id ? (
          <div className="mt-3 pt-3 border-top">
            {editError && (
              <div className="alert alert-danger py-2 mb-3" role="alert">
                {editError}
              </div>
            )}

            <div className="mb-2">
              <label className="form-label fw-semibold">Date</label>

              <input
                type="date"
                className="form-control form-control-sm"
                value={editDate}
                min={new Date().toISOString().split('T')[0]}
                max={`${new Date().getFullYear() + 5}-12-31`}
                onChange={(e) => onDateChange(e.target.value)}
                disabled={editLoading}
              />
            </div>

            <div className="mb-2">
              <label className="form-label fw-semibold">Time</label>

              <select
                className="form-select form-select-sm"
                value={editTime}
                onChange={(e) => onTimeChange(e.target.value)}
                disabled={editLoading || !editDoctor}
              >
                <option value="">Select a time</option>

                {editDoctor?.availableSlots?.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Note</label>

              <textarea
                rows="2"
                className="form-control form-control-sm"
                value={editNote}
                onChange={(e) => onNoteChange(e.target.value)}
                placeholder="Optional note..."
                disabled={editLoading}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm flex-grow-1"
                onClick={() => onSave(appointment)}
                disabled={editLoading}
              >
                {editLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={onCancel}
                disabled={editLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3 pt-3 border-top d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm flex-grow-1"
              onClick={() => onEdit(appointment)}
            >
              Edit / Reschedule
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(appointment.id)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
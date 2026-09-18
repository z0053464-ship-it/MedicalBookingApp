import { useRef, useState } from 'react';

export default function ProfilePage() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();

    setNameError('');
    setEmailError('');
    setSuccessMessage('');

    let hasError = false;

    if (!name) {
      setNameError('Name is required.');
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

    if (!email) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email ending with .com');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    console.log({
      name,
      email,
    });

    setSuccessMessage('Profile updated successfully!');
  };

  return (
    <div className="container mt-4 profile-page">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">

          {/* Profile Header */}
          <div className="card shadow-sm mb-4">
            <div className="profile-cover"></div>

            <div className="profile-info">
              <div className="profile-avatar">
                U
              </div>

              <h1 className="profile-name">
                User Profile
              </h1>

              <p className="profile-subtitle">
                Manage your personal information and account settings
              </p>

              {/* Profile Stats */}
              <div className="row g-3 mt-3">
                <div className="col-12 col-md-4">
                  <div className="profile-stat">
                    <span className="profile-stat-number">
                      Medical
                    </span>
                    <span className="profile-stat-label">
                      Booking Account
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="profile-stat">
                    <span className="profile-stat-number">
                      Active
                    </span>
                    <span className="profile-stat-label">
                      Account Status
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="profile-stat">
                    <span className="profile-stat-number">
                      Secure
                    </span>
                    <span className="profile-stat-label">
                      Account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="card shadow-sm">
            <div className="card-body p-4">

              <h2 className="h4 fw-bold mb-1">
                Personal Information
              </h2>

              <p className="text-muted mb-4">
                Update your name and email address.
              </p>

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSave}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className={`form-control ${
                      nameError ? 'is-invalid' : ''
                    }`}
                    ref={nameRef}
                    placeholder="Enter your full name"
                  />

                  {nameError && (
                    <div className="invalid-feedback">
                      {nameError}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className={`form-control ${
                      emailError ? 'is-invalid' : ''
                    }`}
                    ref={emailRef}
                    placeholder="Enter your email address"
                  />

                  {emailError && (
                    <div className="invalid-feedback">
                      {emailError}
                    </div>
                  )}
                </div>

                {/* Account Information */}
                <div className="profile-section">

                  <h3 className="profile-section-title">
                    Account Information
                  </h3>

                  <div className="row g-3">

                    <div className="col-12 col-md-6">
                      <div className="p-3 border rounded-3">
                        <div className="text-muted small mb-1">
                          Account Type
                        </div>

                        <div className="fw-semibold">
                          Patient
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="p-3 border rounded-3">
                        <div className="text-muted small mb-1">
                          Booking Access
                        </div>

                        <div className="fw-semibold text-success">
                          Available
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Save */}
                <div className="profile-section">
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
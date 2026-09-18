import axios from 'axios';

// Base URL placeholder for the REST API
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Doctors API functions
export const getDoctors = () => {
  return api.get('/doctors');
};

export const getDoctorById = (id) => {
  return api.get(`/doctors/${id}`);
};

// Appointments API functions
export const getAppointments = () => {
  return api.get('/appointments');
};

export const createAppointment = (appointmentData) => {
  return api.post('/appointments', appointmentData);
};

export const updateAppointment = (id, appointmentData) => {
  return api.put(`/appointments/${id}`, appointmentData);
};

export const deleteAppointment = (id) => {
  return api.delete(`/appointments/${id}`);
};

export default api;

Medical Booking App

A responsive medical booking application built with React.
The application allows users to browse doctors, search and filter doctors, view doctor details, book appointments, and manage existing appointments.

Features

- Browse doctors from a REST API
- Search doctors by name
- Filter doctors by specialty
- View doctor details
- Book an appointment
- Form validation using React Hook Form
- View all appointments
- Edit / Reschedule appointments
- Cancel / Delete appointments
- Profile page with form validation
- Favorites using Zustand
- Responsive design using Bootstrap
- Loading, Error, Empty, and Success states
- 404 Not Found page

Technologies

- React
- React Router
- Axios
- React Hook Form
- Zustand
- Bootstrap
- JSON Server
- Vite

Pages

- "/" — Doctors
- "/doctors/:id" — Doctor Details
- "/book" — Book Appointment
- "/appointments" — My Appointments
- "/profile" — Profile
- "*" — 404 Not Found

API

The application uses Axios to communicate with a local REST API provided by JSON Server.

Doctors

- "GET /doctors"
- "GET /doctors/:id"

Appointments

- "GET /appointments"
- "POST /appointments"
- "PUT /appointments/:id"
- "DELETE /appointments/:id"

The API runs on:

"http://localhost:5000"

Installation

Clone or download the project, then open the project folder in the terminal.

Install the dependencies:

npm install

Run the JSON Server

In a terminal, run:

npx.cmd json-server --watch db.json --port 5000

Run the React Application

Open another terminal and run:

npm run dev

The application will be available at the local Vite URL shown in the terminal.

Project Structure

src/
├── components/
├── pages/
├── routes/
├── services/
├── stores/
├── App.jsx
├── App.css
├── index.css
└── main.jsx

public/
db.json
package.json
package-lock.json
vite.config.js

Notes

- "node_modules" is not included in the submitted project.
- Run "npm install" after downloading the project.
- The project uses "db.json" with JSON Server as the REST API.
- No secret API keys or sensitive environment variables are required.

Author

React Summer Training — ITI Fayoum
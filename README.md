
# Hospital Staff Roster

A simple CRUD (Create, Read, Update, Delete) application to manage hospital staff and their shift schedules. This project serves as a sample to demonstrate a full-stack application with a Node.js/Express.js backend API and a vanilla JavaScript frontend.

## Features

- **Staff Management:**
  - Add new staff members with their name, role, and department.
  - View a list of all staff members.
- **Shift Scheduling:**
  - Schedule new shifts for staff members with a specific date and time.
  - View all scheduled shifts for a particular staff member.
  - Update the date and time of an existing shift.
  - Cancel (delete) a scheduled shift.

## Tech Stack

- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
  - [Express.js](https://expressjs.com/) - Web framework for Node.js.
  - [Mongoose](https://mongoosejs.com/) - ODM library for MongoDB.
  - [CORS](https://www.npmjs.com/package/cors) - Middleware for enabling Cross-Origin Resource Sharing.
  - [body-parser](https://www.npmjs.com/package/body-parser) - Middleware for parsing request bodies.

- **Frontend:**
  - HTML5
  - CSS3
  - Vanilla JavaScript (with Fetch API for HTTP requests)

- **Database:**
  - [MongoDB](https://www.mongodb.com/) - NoSQL database.

- **Development:**
  - [Nodemon](https://nodemon.io/) - for automatically restarting the server during development.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (which includes npm)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd hospital-staff-roster-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Make sure your MongoDB server is running. You may need to add a `.env` file or configure the database connection string in `server.js` if it's not connecting to a default local instance.

4.  **Run the application:**
    -   For development (with auto-reloading):
        ```bash
        npm run dev
        ```
    -   For production:
        ```bash
        npm start
        ```
    The server will start on `http://localhost:3000`.

5.  **Open the application in your browser:**
    Navigate to the `public/index.html` file in your browser to use the application.

## API Endpoints

The backend exposes the following RESTful API endpoints:

| Method   | Endpoint                               | Description                                |
|----------|----------------------------------------|--------------------------------------------|
| `GET`    | `/api/staff`                           | Get all staff members.                     |
| `POST`   | `/api/staff`                           | Create a new staff member.                 |
| `GET`    | `/api/staff/:staffId/shifts`           | Get all shifts for a specific staff member.|
| `POST`   | `/api/staff/:staffId/shifts`           | Schedule a new shift for a staff member.   |
| `PUT`    | `/api/staff/:staffId/shifts/:shiftId`  | Update a specific shift.                   |
| `DELETE` | `/api/staff/:staffId/shifts/:shiftId`  | Cancel (delete) a specific shift.          |
=======
# Hospital-Staff-Roster


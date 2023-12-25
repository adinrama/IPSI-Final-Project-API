# Final Project API (Vaccine Reservations)

The following steps will guide you through the installation process of Final Project API for running in a development environment locally on your machine:

1. Clone the latest version of this api project from the repository
2. Run `npm install` to install the required Node.js dependencies
3. Run `npm run start` or `npm run dev` to start the server
4. Open your browser and go to `http://127.0.0.1:3000` to view the result
5. Open Postman on your PC or you can use `https://testfully.io` to testing the endpoint/path usage

### Path Usage

- User Login: Method `POST`
  - /v1/users/login

- User Register: Method `POST`
  - /v1/users/register

- Get User By Id: Method `GET` (include jwt token)
  - /v1/users/{id}

- Update User By Id: Method `PUT` (include jwt token)
  - /v1/users/{id}
 
- Delete User By Id: Method `DELETE` (include jwt token)
  - /v1/users/{id}

- Upload a New Vaccine Schedule: Method `POST` (include jwt token and must an admin)
  - /v1/vaccine-schedules
 
- Get All Vaccine Schedules: Method `GET` (include jwt token)
  - /v1/vaccine-schedules
 
- Get Vaccine Schedule By Id: Method `GET` (include jwt token)
  - /v1/vaccine-schedules/{id}
 
- Create a New Vaccine Booking Ticket: Method `POST` (include jwt token)
  - /v1/bookings/vaccine-schedule/{userId}/{vaccineScheduleId}

- Update an Existing Vaccine Booking Ticket: Method `PUT` (include jwt token and must an admin)
  - /v1/bookings/{booking_id}

- Upload Covid Test Reservation Form: Method `POST` (include jwt token)
  - /v1/covid-test-reservations
 
- Get All Vaccine Booking Tickets: Method `GET` (include jwt token)
  - /v1/vaccine-tickets

- Get Vaccine Booking Ticket By Id: Method `GET` (include jwt token)
  - /v1/vaccine-tickets/{id}

- Delete Vaccine Booking Ticket By Id: Method `GET` (include jwt token)
  - /v1/vaccine-tickets/{id}

- Get All Vaccine Results: Method `GET` (include jwt token and must an admin)
  - /v1/vaccine-results

- Get Vaccine Result By Id: Method `GET` (include jwt token)
  - /v1/vaccine-results/{id}

- Update Vaccine Result By Id: Method `PUT` (include jwt token and must an admin)
  - /v1/vaccine-results/{id}

- Upload News: Method `POST` (include jwt token)
  - /v1/news

- Upload News: Method `GET` (include jwt token)
  - /v1/news

- Upload News: Method `GET` (include jwt token)
  - /v1/news/{id}

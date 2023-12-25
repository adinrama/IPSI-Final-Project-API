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

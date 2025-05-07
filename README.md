# Activity Booking API

This is a simple REST API backend for an activity booking app. The API allows users to register, login, view available activities, book activities, and view their bookings.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/activity-booking-api.git
cd activity-booking-api
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```
DB_URI=your_mongo_connection_string
JWT_SECRET=your_very_secure_secret_123
PORT=5000
```

- **DB_URI**: Use MongoDB Atlas connection string for a cloud database or use a local MongoDB instance (e.g., `mongodb://localhost:27017/activitybooking`).
- **JWT_SECRET**: A secret key for signing JWT tokens.
- **PORT**: The port on which the server will run (default is 5000).

### 4. Seed the Database (Optional)

To seed the database with some example activities, run the following command:

```bash
npm run seed
```

### 5. Start the Server

Run the following command to start the server:

```bash
npm start
```

The server will be running at `http://localhost:5000` (or the port you specified in the `.env` file).

### 6. Test the API

You can test the API using Postman or any HTTP client by sending requests to the following endpoints:

- **POST /api/auth/register**: Register a new user (requires `name`, `email`, `phone`, and `password` in the body).
- **POST /api/auth/login**: Login a user (requires `email` and `password` in the body).
- **GET /api/activities**: Get a list of available activities (public endpoint).
- **POST /api/bookings**: Book an activity (requires `activityId` in the body and the token in the `Authorization` header).
- **GET /api/bookings**: Get all bookings for the logged-in user (requires `Authorization` header with token).

## Example Request & Response

### 1. Register User

**Endpoint**: `POST /api/auth/register`

**Body**:

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123"
}
```

**Response**:

```json
{
    "user": "user_id_here"
}
```

### 2. Login User

**Endpoint**: `POST /api/auth/login`

**Body**:

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response**:

```json
{
    "token": "JWT_TOKEN_HERE"
}
```

### 3. List Activities

**Endpoint**: `GET /api/activities`

**Response**:

```json
[
    {
        "id": "activity_id_here",
        "title": "Cricket Match",
        "description": "Weekend cricket tournament",
        "location": "Central Park",
        "dateTime": "2023-06-15T10:00:00Z"
    },
    {
        "id": "activity_id_here",
        "title": "Movie Night",
        "description": "Open air movie screening",
        "location": "City Square",
        "dateTime": "2023-06-20T19:00:00Z"
    }
]
```

### 4. Book Activity

**Endpoint**: `POST /api/bookings`

**Body**:

```json
{
    "activityId": "activity_id_here"
}
```

**Headers**:

```
Authorization: Bearer JWT_TOKEN_HERE
```

**Response**:

```json
{
    "_id": "booking_id_here",
    "user": "user_id_here",
    "activity": "activity_id_here",
    "bookingDate": "2023-06-14T10:00:00Z"
}
```

# Activity Booking API

A RESTful API for booking activities with user authentication built with Node.js, Express, and MongoDB.

## Features

- User registration and login with JWT authentication
- Public activity listing
- Authenticated activity booking
- User booking history
- Input validation
- Password hashing
- Error handling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT
- **Validation**: Joi
- **Security**: bcryptjs for password hashing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/activity-booking-api.git
   cd activity-booking-api

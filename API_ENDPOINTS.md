# API Endpoints Documentation

This document describes the API endpoints your backend should implement.

## Authentication

### POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+91 9876543210",
  "role": "USER" | "MECHANIC" | "ADMIN",
  "shopName": "My Shop", // Only for MECHANIC
  "shopAddress": "123 Main St", // Only for MECHANIC
  "shopCity": "Mumbai", // Only for MECHANIC
  "shopState": "Maharashtra", // Only for MECHANIC
  "shopPincode": "400001", // Only for MECHANIC
  "shopPhone": "+91 9876543210", // Only for MECHANIC
  "vehicleTypes": ["TWO_WHEELER", "FOUR_WHEELER"] // Only for MECHANIC
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "token": "jwt-token-here"
}
```

### POST /api/auth/login
Login user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "token": "jwt-token-here"
}
```

## Shops

### GET /api/shops
Get list of shops (mechanics)

**Query Parameters:**
- `search` - Search term
- `location` - Location filter

**Response:**
```json
{
  "shops": [
    {
      "id": "shop-id",
      "name": "ABC Auto Repair",
      "address": "123 Main St, Mumbai",
      "city": "Mumbai",
      "phone": "+91 9876543210",
      "rating": 4.5
    }
  ]
}
```

### GET /api/shops/:id
Get shop details

**Response:**
```json
{
  "id": "shop-id",
  "name": "ABC Auto Repair",
  "address": "123 Main St, Mumbai",
  "city": "Mumbai",
  "phone": "+91 9876543210",
  "rating": 4.5
}
```

## Bookings

### GET /api/bookings
Get user's bookings (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "bookings": [
    {
      "id": "booking-id",
      "shop": {
        "id": "shop-id",
        "name": "ABC Auto Repair",
        "address": "123 Main St"
      },
      "appointmentDate": "2024-01-15T10:00:00Z",
      "status": "CONFIRMED" | "PENDING" | "CANCELLED",
      "description": "Oil change"
    }
  ]
}
```

### POST /api/bookings
Create a new booking (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "shopId": "shop-id",
  "appointmentDate": "2024-01-15T10:00:00Z",
  "description": "Oil change"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "booking-id",
    "shopId": "shop-id",
    "appointmentDate": "2024-01-15T10:00:00Z",
    "status": "PENDING"
  }
}
```

## Notes

- All dates should be in ISO 8601 format
- Authentication tokens should be JWT tokens
- Error responses should have format: `{ "success": false, "error": "Error message" }`
- Status codes: 200 (success), 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)


# Backend Server - MechBook

Express.js backend server for the MechBook application.

## 📁 Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables (create this)
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Database seed file
└── src/
    ├── lib/
    │   └── prisma.js      # Prisma client
    ├── middleware/
    │   └── auth.js        # Authentication middleware
    └── routes/
        ├── auth.js        # Authentication routes
        ├── shops.js       # Shop routes
        ├── bookings.js    # Booking routes
        ├── categories.js  # Category routes
        ├── admin.js       # Admin routes
        └── mechanic.js    # Mechanic routes
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mechbook?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed database
npm run db:seed
```

### 4. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Shops
- `GET /api/shops` - Get all shops
- `GET /api/shops/:id` - Get shop by ID

### Bookings
- `GET /api/bookings` - Get user's bookings (auth required)
- `POST /api/bookings` - Create booking (auth required)

### Categories
- `GET /api/categories` - Get all categories

### Admin (requires ADMIN role)
- `GET /api/admin/mechanics` - Get pending mechanics
- `POST /api/admin/mechanics/:id/approve` - Approve mechanic
- `POST /api/admin/mechanics/:id/reject` - Reject mechanic

### Mechanic (requires MECHANIC role)
- `GET /api/mechanic/bookings` - Get mechanic's bookings

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📝 Notes

- Uses Prisma ORM for database access
- JWT tokens for authentication
- Role-based access control (USER, MECHANIC, ADMIN)
- CORS enabled for frontend communication


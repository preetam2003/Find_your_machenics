# MechBook - Mechanics Booking Platform

A full-stack application for booking mechanic appointments, organized into separate frontend and backend folders.

## 📁 Project Structure

```
booking/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── main.jsx   # React entry point
│   │   ├── App.jsx    # Main app with routes
│   │   ├── pages/     # Page components
│   │   └── components/# UI components
│   └── package.json
│
├── backend/           # Express.js backend
│   ├── server.js      # Main server file
│   ├── prisma/        # Database schema
│   ├── src/
│   │   ├── routes/    # API routes
│   │   ├── middleware/# Auth middleware
│   │   └── lib/       # Utilities
│   └── package.json
│
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Set DATABASE_URL and JWT_SECRET

# Set up database
npm run db:generate
npm run db:push
npm run db:seed

# Start backend server
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📡 API Endpoints

See `backend/README.md` for complete API documentation.

## 🎯 Features

- **User Registration & Login** - JWT-based authentication
- **Search Mechanics** - Find mechanics by location
- **Book Appointments** - Schedule service appointments
- **Role-Based Access** - USER, MECHANIC, ADMIN roles
- **Admin Dashboard** - Approve/reject mechanic shops
- **Mechanic Dashboard** - Manage bookings and services

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mechbook"
JWT_SECRET="your-secret-key"
PORT=5000
```

## 📚 Documentation

- `frontend/README.md` - Frontend setup and structure
- `backend/README.md` - Backend setup and API docs
- `API_ENDPOINTS.md` - Complete API endpoint documentation
- `PROJECT_OVERVIEW.md` - Project overview and architecture

## 🔧 Development

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes
npm run db:push

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## 🎓 Learning Resources

- React: https://react.dev
- Express.js: https://expressjs.com
- Prisma: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com

## 📄 License

Private project

---

**Happy Coding! 🚀**

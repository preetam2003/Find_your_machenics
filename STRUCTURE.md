# 📁 Project Structure Overview

This document explains the complete folder structure of the MechBook project.

## Root Directory

```
booking/
├── frontend/              # Frontend React application
├── backend/               # Backend Express.js server
├── README.md              # Main project documentation
├── STRUCTURE.md           # This file
├── API_ENDPOINTS.md       # API documentation
└── .gitignore            # Git ignore rules
```

## Frontend Structure

```
frontend/
├── index.html             # HTML entry point
├── package.json           # Frontend dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── .eslintrc.cjs          # ESLint configuration
│
└── src/
    ├── main.jsx           # ⭐ React starts here
    ├── App.jsx            # ⭐ Main app (routes + auth)
    ├── index.css          # Global styles
    │
    ├── pages/             # Page components
    │   ├── HomePage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── SearchPage.jsx
    │   ├── ShopDetailPage.jsx
    │   ├── MyBookingsPage.jsx
    │   ├── NewBookingPage.jsx
    │   ├── UserDashboard.jsx
    │   ├── MechanicDashboard.jsx
    │   └── AdminDashboard.jsx
    │
    ├── components/        # Reusable components
    │   ├── Header.jsx     # Navigation header
    │   └── ui/            # UI components
    │       ├── Button.jsx
    │       └── Input.jsx
    │
    └── lib/               # Utilities
        └── utils.js       # Helper functions
```

## Backend Structure

```
backend/
├── server.js              # ⭐ Main Express server
├── package.json           # Backend dependencies
├── .env                   # Environment variables (create this)
├── .env.example           # Example env file
├── .gitignore             # Backend git ignore
│
├── prisma/                # Database
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Seed data
│
└── src/
    ├── lib/               # Libraries
    │   └── prisma.js      # Prisma client instance
    │
    ├── middleware/        # Express middleware
    │   └── auth.js        # Authentication middleware
    │
    └── routes/            # API routes
        ├── auth.js        # /api/auth/*
        ├── shops.js       # /api/shops/*
        ├── bookings.js    # /api/bookings/*
        ├── categories.js   # /api/categories/*
        ├── admin.js       # /api/admin/*
        └── mechanic.js    # /api/mechanic/*
```

## File Flow

### Frontend Flow
1. `index.html` → Loads React app
2. `src/main.jsx` → Renders `<App />`
3. `src/App.jsx` → Sets up routes and auth
4. Routes → Load appropriate page component
5. Pages → Use components and make API calls

### Backend Flow
1. `server.js` → Starts Express server
2. Routes → Handle API requests
3. Middleware → Authenticate requests
4. Prisma → Database operations
5. Response → Send JSON back to frontend

## Key Files Explained

### Frontend

| File | Purpose |
|------|---------|
| `src/main.jsx` | React entry point - renders App |
| `src/App.jsx` | Main app - routes, auth state |
| `src/pages/*` | Individual page components |
| `src/components/Header.jsx` | Navigation component |
| `vite.config.js` | Vite build configuration |

### Backend

| File | Purpose |
|------|---------|
| `server.js` | Express server setup |
| `src/routes/*` | API endpoint handlers |
| `src/middleware/auth.js` | JWT authentication |
| `src/lib/prisma.js` | Database client |
| `prisma/schema.prisma` | Database schema |

## Dependencies

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `vite` - Build tool
- `tailwindcss` - Styling

### Backend
- `express` - Web framework
- `prisma` - Database ORM
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing
- `cors` - CORS middleware

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
PORT=5000
```

## Ports

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

## Development Workflow

1. **Start Backend** → `cd backend && npm run dev`
2. **Start Frontend** → `cd frontend && npm run dev`
3. **Make Changes** → Files auto-reload
4. **Test API** → Use Postman or browser
5. **View Database** → `npm run db:studio` in backend

---

This structure separates concerns clearly:
- **Frontend** = User interface (React)
- **Backend** = API server (Express)
- **Database** = Data storage (PostgreSQL via Prisma)


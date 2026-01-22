# 🔧 MechBook - Mechanics Booking Platform

A full-stack web application that connects vehicle owners with trusted mechanics for booking appointments. Built with React, Express.js, and PostgreSQL.

![MechBook](https://img.shields.io/badge/React-18.2.0-blue) ![Express](https://img.shields.io/badge/Express-4.18.2-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Interface Overview](#interface-overview)
- [How It Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

---

## 🎯 About the Project

**MechBook** is a comprehensive booking platform designed to simplify the process of finding and booking mechanic services. The platform serves three types of users:

- **👤 Customers (Users)**: Search for mechanics, view shop details, and book appointments
- **🔧 Mechanics**: Register their shops, manage bookings, and offer services
- **👨‍💼 Administrators**: Manage the platform, approve/reject mechanic registrations, and oversee operations

The application features a modern, responsive user interface built with React and Tailwind CSS, backed by a robust Express.js API with PostgreSQL database.

---

## 🖥️ Interface Overview

### Main Pages & User Interface

#### 1. **Home Page** (`/`)
- **Hero Section**: Eye-catching banner with call-to-action buttons
- **Features Section**: Highlights key benefits (Location-based search, Verified mechanics, Easy booking)
- **How It Works**: Step-by-step guide (Search → Compare → Book)
- **Call-to-Action**: Prominent buttons to "Find Mechanics" or "Register Your Shop"

#### 2. **Search Page** (`/search`)
- **Search Bar**: Filter mechanics by location, city, or shop name
- **Filter Options**: 
  - Vehicle type (2-wheeler / 4-wheeler)
  - Service categories
  - Location-based sorting
- **Shop Cards**: Display shop information with:
  - Shop name and address
  - Rating and reviews
  - Services offered
  - Quick view button

#### 3. **Shop Detail Page** (`/shops/:id`)
- **Shop Information**: 
  - Name, address, contact details
  - Working hours and days
  - Location map
  - Shop images
- **Services List**: Available services with pricing
- **Book Appointment Button**: Direct booking option

#### 4. **Authentication Pages**
- **Login Page** (`/login`): Email and password login form
- **Register Page** (`/register`): 
  - User registration (simple form)
  - Mechanic registration (2-step form with shop details)

#### 5. **Booking Pages**
- **New Booking** (`/bookings/new/:shopId`): 
  - Select service
  - Choose date and time slot
  - Add vehicle information
  - Confirm booking
- **My Bookings** (`/bookings/my-bookings`): 
  - List of all user bookings
  - Booking status (Pending, Confirmed, Completed, Cancelled)
  - Booking details and history

#### 6. **Dashboard Pages**
- **User Dashboard** (`/dashboard`): Overview of user's bookings and activity
- **Mechanic Dashboard** (`/mechanic/dashboard`): 
  - Manage incoming bookings
  - View booking requests
  - Update booking status
  - Manage services
- **Admin Dashboard** (`/admin/dashboard`): 
  - Approve/reject mechanic applications
  - Manage service categories
  - Platform statistics

### Design Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Color Scheme**: Primary blue theme with intuitive color coding
- **Navigation**: Persistent header with role-based menu items
- **User Feedback**: Toast notifications for actions (success, error, info)

---

## ⚙️ How It Works

### Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Frontend      │  ──────▶│    Backend      │  ──────▶│   Database      │
│   (React+Vite)  │  HTTP   │   (Express.js)  │  Prisma │  (PostgreSQL)   │
│   Port: 3000    │         │   Port: 5000    │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### User Flow

#### **Customer Journey:**
1. **Browse** → User visits homepage and explores features
2. **Search** → Enters location/search criteria to find mechanics
3. **Explore** → Views shop details, services, and pricing
4. **Register/Login** → Creates account or logs in (JWT authentication)
5. **Book** → Selects service, date, and time slot
6. **Manage** → Views booking history in dashboard

#### **Mechanic Journey:**
1. **Register** → Creates account with shop details (name, address, services)
2. **Wait for Approval** → Admin reviews and approves/rejects application
3. **Dashboard Access** → Once approved, accesses mechanic dashboard
4. **Manage Bookings** → Views incoming booking requests
5. **Update Status** → Confirms, completes, or cancels bookings
6. **Manage Services** → Adds/edits services and pricing

#### **Admin Journey:**
1. **Login** → Accesses admin dashboard
2. **Review Applications** → Views pending mechanic registrations
3. **Approve/Reject** → Reviews shop details and makes decisions
4. **Manage Categories** → Creates/edits service categories
5. **Monitor Platform** → Views platform statistics and activity

### Technical Flow

#### **Authentication Flow:**
```
User Input → Frontend Validation → API Request → Backend Validation 
→ Database Check → JWT Token Generation → Token Stored (localStorage) 
→ Protected Routes Access
```

#### **Booking Flow:**
```
Select Shop → Choose Service → Select Date/Time → Submit Booking 
→ API Validation → Database Insert → Confirmation → Notification
```

#### **Data Flow:**
- **Frontend** makes API calls using `fetch()` to `/api/*` endpoints
- **Backend** processes requests, validates data, and queries database via Prisma
- **Database** stores all persistent data (users, shops, bookings, services)
- **Response** sent back as JSON, frontend updates UI accordingly

### Key Components

#### **Frontend Components:**
- **App.jsx**: Main application component managing routes and authentication state
- **Header.jsx**: Navigation bar with user menu
- **Page Components**: Individual pages for each route
- **UI Components**: Reusable Button, Input, Card components

#### **Backend Components:**
- **server.js**: Express server setup and middleware configuration
- **Routes**: Modular route handlers for each feature (auth, shops, bookings, etc.)
- **Middleware**: JWT authentication middleware for protected routes
- **Prisma Client**: Database ORM for type-safe database operations

---

## ✨ Features

### Core Features
- ✅ **User Authentication**: Secure JWT-based login and registration
- ✅ **Role-Based Access Control**: Separate interfaces for Users, Mechanics, and Admins
- ✅ **Location-Based Search**: Find mechanics by city/location
- ✅ **Shop Management**: Mechanics can register and manage their shops
- ✅ **Service Catalog**: Mechanics can add/edit services with pricing
- ✅ **Booking System**: Schedule appointments with date/time selection
- ✅ **Booking Management**: View, update, and track booking status
- ✅ **Admin Panel**: Approve/reject mechanics and manage categories
- ✅ **Responsive Design**: Mobile-friendly interface

### Advanced Features
- 🔐 **Secure Authentication**: Password hashing with bcrypt, JWT tokens
- 📍 **Location Services**: Support for latitude/longitude coordinates
- 📊 **Dashboard Analytics**: Role-specific dashboards with relevant information
- 🔔 **Status Tracking**: Real-time booking status updates
- 🎨 **Modern UI/UX**: Intuitive interface with Tailwind CSS
- 🚀 **Fast Performance**: Optimized with Vite build tool

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios/Fetch** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Relational database
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Git** - Version control
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 📁 Project Structure

```
booking/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── main.jsx         # React entry point
│   │   ├── App.jsx           # Main app component with routes
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── ShopDetailPage.jsx
│   │   │   ├── MyBookingsPage.jsx
│   │   │   ├── NewBookingPage.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── MechanicDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── components/       # Reusable components
│   │   │   ├── Header.jsx
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       └── Input.jsx
│   │   └── lib/              # Utility functions
│   │       └── utils.js
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Express.js backend server
│   ├── server.js             # Main server file
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.ts           # Seed data
│   └── src/
│       ├── routes/           # API route handlers
│       │   ├── auth.js
│       │   ├── shops.js
│       │   ├── bookings.js
│       │   ├── categories.js
│       │   ├── admin.js
│       │   └── mechanic.js
│       ├── middleware/
│       │   └── auth.js        # JWT authentication
│       └── lib/
│           └── prisma.js      # Prisma client
│
└── README.md                  # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** database
- **npm** or **yarn** package manager
- **Git** (for cloning)

### Step 1: Clone the Repository

```bash
git clone https://github.com/preetam2003/Find_your_machenics.git
cd Find_your_machenics
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the example and fill in your values
cp .env.example .env
```

Edit `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mechbook?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=5000
```

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed database with sample data
npm run db:seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### Step 4: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📖 Usage

### For Customers

1. **Register/Login**: Create an account or sign in
2. **Search Mechanics**: Use the search page to find mechanics near you
3. **View Shop Details**: Click on a shop to see services and pricing
4. **Book Appointment**: Select a service, date, and time slot
5. **Manage Bookings**: View your booking history in "My Bookings"

### For Mechanics

1. **Register**: Create an account with shop details
2. **Wait for Approval**: Admin will review your application
3. **Access Dashboard**: Once approved, login to mechanic dashboard
4. **Manage Bookings**: View and update booking requests
5. **Manage Services**: Add/edit services and pricing

### For Administrators

1. **Login**: Access admin dashboard
2. **Review Applications**: Check pending mechanic registrations
3. **Approve/Reject**: Review shop details and make decisions
4. **Manage Categories**: Create/edit service categories

---

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user/mechanic
- `POST /api/auth/login` - Login user

### Shop Endpoints
- `GET /api/shops` - Get all shops (with filters)
- `GET /api/shops/:id` - Get shop details

### Booking Endpoints
- `GET /api/bookings` - Get user's bookings (auth required)
- `POST /api/bookings` - Create new booking (auth required)

### Admin Endpoints
- `GET /api/admin/mechanics` - Get pending mechanics
- `POST /api/admin/mechanics/:id/approve` - Approve mechanic
- `POST /api/admin/mechanics/:id/reject` - Reject mechanic

For complete API documentation, see [API_ENDPOINTS.md](./API_ENDPOINTS.md)

---

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: Authentication and profile information
- **MechanicShop**: Shop details, location, status
- **Service**: Services offered by shops
- **Booking**: Appointment records
- **Category**: Service categories

See `backend/prisma/schema.prisma` for complete schema definition.

---

## 🔧 Development Commands

### Backend Commands
```bash
cd backend
npm run dev          # Start development server
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio (database GUI)
```

### Frontend Commands
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 📚 Additional Documentation

- [API_ENDPOINTS.md](./API_ENDPOINTS.md) - Complete API endpoint documentation
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Detailed project overview
- [STRUCTURE.md](./STRUCTURE.md) - Project structure explanation
- [backend/README.md](./backend/README.md) - Backend-specific documentation
- [frontend/README.md](./frontend/README.md) - Frontend-specific documentation

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Author

**Preetam**

- GitHub: [@preetam2003](https://github.com/preetam2003)
- Repository: [Find_your_machenics](https://github.com/preetam2003/Find_your_machenics)

---

## 🙏 Acknowledgments

- React community for excellent documentation
- Express.js for the robust backend framework
- Prisma for the amazing ORM
- Tailwind CSS for the utility-first CSS framework

---

**Happy Coding! 🚀**

For questions or support, please open an issue on GitHub.

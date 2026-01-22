# 📋 Project Overview - MechBook

A simplified React booking application for mechanics. This project has been converted from Next.js to a beginner-friendly React + Vite structure.

## 🎯 What This Project Does

**MechBook** is a platform where:
- **Customers** can search for mechanics, view shop details, and book appointments
- **Mechanics** can register their shops and manage bookings
- **Admins** can manage the platform

## 📁 Project Structure

```
booking/
├── index.html                 # HTML entry point
├── src/
│   ├── main.jsx              # ⭐ React starts here
│   ├── App.jsx               # ⭐ Main app with all routes
│   ├── index.css             # Global styles
│   │
│   ├── pages/                # All page components
│   │   ├── HomePage.jsx      # Landing page
│   │   ├── LoginPage.jsx     # User login
│   │   ├── RegisterPage.jsx  # User registration
│   │   ├── SearchPage.jsx    # Search mechanics
│   │   ├── ShopDetailPage.jsx # View shop details
│   │   ├── MyBookingsPage.jsx # User's bookings
│   │   ├── NewBookingPage.jsx # Create booking
│   │   ├── UserDashboard.jsx # User dashboard
│   │   ├── MechanicDashboard.jsx # Mechanic dashboard
│   │   └── AdminDashboard.jsx # Admin dashboard
│   │
│   ├── components/          # Reusable components
│   │   ├── Header.jsx        # Navigation header
│   │   └── ui/              # UI components
│   │       ├── Button.jsx   # Button component
│   │       └── Input.jsx    # Input field component
│   │
│   └── lib/                 # Utility functions
│       └── utils.js         # Helper functions
│
├── package.json             # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── README.md               # Setup instructions
```

## 🔄 How It Works (Flow)

### 1. **Entry Point: `main.jsx`**
```jsx
// This is where React starts
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```
- React renders the `App` component
- This happens once when the page loads

### 2. **Main App: `App.jsx`**
```jsx
// Contains:
- User authentication state
- All routes (pages)
- Navigation setup
```
**Key Features:**
- Manages user login/logout
- Stores user data in `localStorage`
- Defines all routes using React Router
- Passes user data to pages that need it

### 3. **Pages**
Each page is a separate component:
- **HomePage** - Landing page with features
- **LoginPage** - Login form
- **RegisterPage** - Registration form (2 steps for mechanics)
- **SearchPage** - Search and filter mechanics
- **ShopDetailPage** - View mechanic shop details
- **MyBookingsPage** - List user's bookings
- **NewBookingPage** - Create new booking
- **Dashboards** - Role-specific dashboards

### 4. **Components**
Reusable UI pieces:
- **Header** - Navigation bar (shows on all pages)
- **Button** - Styled button component
- **Input** - Form input with label and error handling

## 🛣️ Routes (Pages)

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Landing page |
| `/login` | LoginPage | User login |
| `/register` | RegisterPage | User registration |
| `/search` | SearchPage | Find mechanics |
| `/shops/:id` | ShopDetailPage | View shop details |
| `/bookings/my-bookings` | MyBookingsPage | User's bookings |
| `/bookings/new/:shopId` | NewBookingPage | Create booking |
| `/dashboard` | UserDashboard | User dashboard |
| `/mechanic/dashboard` | MechanicDashboard | Mechanic dashboard |
| `/admin/dashboard` | AdminDashboard | Admin dashboard |

## 👤 User Roles

1. **USER** - Regular customers
   - Search mechanics
   - Book appointments
   - View bookings

2. **MECHANIC** - Shop owners
   - Register shop
   - Manage bookings
   - View dashboard

3. **ADMIN** - Platform administrators
   - Manage categories
   - Approve/reject mechanics
   - Platform settings

## 🔐 Authentication Flow

1. **Register/Login** → User enters credentials
2. **Backend validates** → API checks credentials
3. **Token received** → JWT token stored in `localStorage`
4. **User data stored** → User info saved in `localStorage`
5. **App updates** → `App.jsx` updates user state
6. **Protected routes** → Pages check if user is logged in

## 📡 API Integration

All API calls use `fetch()`:
```javascript
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

**API Endpoints Needed:**
- `/api/auth/register` - Register user
- `/api/auth/login` - Login user
- `/api/shops` - Get shops list
- `/api/shops/:id` - Get shop details
- `/api/bookings` - Get/create bookings

See `API_ENDPOINTS.md` for complete API documentation.

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Works on mobile and desktop
- **Custom Colors** - Primary blue color scheme

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

## 📦 Key Dependencies

- **react** - UI library
- **react-dom** - React for web
- **react-router-dom** - Routing
- **vite** - Build tool (fast!)
- **tailwindcss** - Styling

## 🔧 Configuration Files

- **`vite.config.js`** - Vite settings (port, proxy, etc.)
- **`tailwind.config.js`** - Tailwind theme colors
- **`postcss.config.js`** - PostCSS for Tailwind
- **`.eslintrc.cjs`** - Code linting rules

## 📝 Key Concepts for Beginners

### 1. **Components**
```jsx
// A component is a reusable piece of UI
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}
```

### 2. **State**
```jsx
// State stores data that can change
const [user, setUser] = useState(null)
```

### 3. **Props**
```jsx
// Props pass data to components
<Header user={user} onLogout={logout} />
```

### 4. **Routes**
```jsx
// Routes define which page shows for each URL
<Route path="/login" element={<LoginPage />} />
```

### 5. **Hooks**
```jsx
// useEffect runs code when component loads
useEffect(() => {
  // Fetch data
}, [])
```

## 🎓 Learning Path

1. **Start here:** `src/main.jsx` - See how React starts
2. **Then:** `src/App.jsx` - Understand routing and state
3. **Next:** `src/pages/HomePage.jsx` - Simple page example
4. **Then:** `src/components/Header.jsx` - Component example
5. **Finally:** `src/pages/LoginPage.jsx` - Form handling

## ⚠️ Important Notes

1. **Backend Required** - This is frontend only. You need a backend API.
2. **Authentication** - Currently uses `localStorage`. In production, use proper JWT validation.
3. **Database** - Prisma schema exists but needs backend connection.
4. **Old Files** - `src/app/` folder contains old Next.js files (can be deleted).

## 🐛 Common Issues

**Problem:** API calls fail
- **Solution:** Make sure backend server is running on port 5000 (or update `vite.config.js`)

**Problem:** Styling not working
- **Solution:** Check Tailwind is configured in `tailwind.config.js`

**Problem:** Routes not working
- **Solution:** Make sure all routes are defined in `App.jsx`

## 📚 Next Steps

1. Set up backend API server
2. Connect to database (Prisma)
3. Implement proper authentication
4. Add error handling
5. Add loading states
6. Deploy to production

## 📖 Documentation Files

- **README.md** - Setup and basic usage
- **MIGRATION_GUIDE.md** - What changed from Next.js
- **API_ENDPOINTS.md** - Backend API requirements
- **PROJECT_OVERVIEW.md** - This file!

---

**Happy Coding! 🚀**


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'
import ShopDetailPage from './pages/ShopDetailPage'
import MyBookingsPage from './pages/MyBookingsPage'
import NewBookingPage from './pages/NewBookingPage'
import UserDashboard from './pages/UserDashboard'
import MechanicDashboard from './pages/MechanicDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          // In a real app, verify token with backend
          const userData = JSON.parse(localStorage.getItem('user') || 'null')
          setUser(userData)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogout={logout} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={login} />} />
            <Route path="/register" element={<RegisterPage onLogin={login} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/shops/:id" element={<ShopDetailPage user={user} />} />
            <Route path="/bookings/my-bookings" element={<MyBookingsPage user={user} />} />
            <Route path="/bookings/new/:shopId" element={<NewBookingPage user={user} />} />
            <Route path="/dashboard" element={<UserDashboard user={user} />} />
            <Route path="/mechanic/dashboard" element={<MechanicDashboard user={user} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard user={user} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App


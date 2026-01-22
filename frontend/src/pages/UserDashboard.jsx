import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

function UserDashboard({ user }) {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your dashboard</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/bookings/my-bookings">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">My Bookings</h2>
              <p className="text-gray-600">View and manage your appointments</p>
            </div>
          </Link>
          
          <Link to="/search">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Find Mechanics</h2>
              <p className="text-gray-600">Search for mechanics near you</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard


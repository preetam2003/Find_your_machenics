function MechanicDashboard({ user }) {
  if (!user || user.role !== 'MECHANIC') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Access denied. This page is for mechanics only.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Mechanic Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Welcome, {user.name}! This is your mechanic dashboard.</p>
          <p className="text-gray-500 mt-4">Manage your bookings, services, and shop details from here.</p>
        </div>
      </div>
    </div>
  )
}

export default MechanicDashboard


function AdminDashboard({ user }) {
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Access denied. This page is for admins only.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Welcome, {user.name}! This is your admin dashboard.</p>
          <p className="text-gray-500 mt-4">Manage categories, mechanics, and platform settings from here.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard


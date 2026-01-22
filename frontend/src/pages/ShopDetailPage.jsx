import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

function ShopDetailPage({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await fetch(`/api/shops/${id}`)
        const data = await response.json()
        setShop(data)
      } catch (error) {
        console.error('Error fetching shop:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchShop()
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!shop) {
    return <div className="min-h-screen flex items-center justify-center">Shop not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{shop.name}</h1>
          <p className="text-gray-600 mb-6">{shop.address}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
              <p className="text-gray-600">{shop.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Rating</h3>
              <p className="text-gray-600">⭐ {shop.rating || 'N/A'}</p>
            </div>
          </div>

          {user && (
            <Link to={`/bookings/new/${id}`}>
              <Button size="lg" className="w-full">
                Book Appointment
              </Button>
            </Link>
          )}

          {!user && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 mb-2">Please login to book an appointment</p>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopDetailPage


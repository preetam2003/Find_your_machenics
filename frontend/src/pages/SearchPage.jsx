import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function SearchPage() {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = async () => {
    setLoading(true)
    try {
      // In a real app, this would call your backend API
      const response = await fetch(`/api/shops?search=${searchTerm}&location=${location}`)
      const data = await response.json()
      setShops(data.shops || [])
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Mechanics</h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or service"
            />
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or area"
            />
            <div className="flex items-end">
              <Button onClick={handleSearch} isLoading={loading} className="w-full">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No mechanics found. Try adjusting your search.</p>
            </div>
          ) : (
            shops.map((shop) => (
              <Link key={shop.id} to={`/shops/${shop.id}`}>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{shop.name}</h3>
                  <p className="text-gray-600 mb-4">{shop.address}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>⭐ {shop.rating || 'N/A'}</span>
                    <span>•</span>
                    <span>{shop.city}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage


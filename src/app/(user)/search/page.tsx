'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/shared/Header';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/Loading';
import { formatCurrency } from '@/lib/utils';

interface Shop {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  phone: string;
  vehicleTypes: string[];
  openTime: string;
  closeTime: string;
  _count: {
    services: number;
  };
  services: {
    id: string;
    name: string;
    price: number;
  }[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [vehicleType, setVehicleType] = useState(searchParams.get('vehicleType') || '');

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (city) params.set('city', city);
      if (vehicleType) params.set('vehicleType', vehicleType);

      const response = await fetch(`/api/shops?${params}`);
      const data = await response.json();
      if (data.success) {
        setShops(data.data);
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShops();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Mechanics</h1>
          <p className="text-gray-600 mt-2">Search for trusted mechanics near you</p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search by name or service..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                options={[
                  { value: '', label: 'All Vehicles' },
                  { value: 'TWO_WHEELER', label: '2-Wheeler' },
                  { value: 'FOUR_WHEELER', label: '4-Wheeler' },
                ]}
              />
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : shops.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-lg font-medium mb-2">No mechanics found</p>
              <p className="text-sm">Try adjusting your search filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <Link key={shop.id} href={`/shops/${shop.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-gray-900">{shop.name}</h3>
                      <div className="flex gap-1">
                        {shop.vehicleTypes.map((type) => (
                          <span
                            key={type}
                            className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded"
                          >
                            {type === 'TWO_WHEELER' ? '2W' : '4W'}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {shop.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{shop.description}</p>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-2">
                      <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {shop.city}, {shop.state}
                    </p>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {shop.openTime} - {shop.closeTime}
                    </p>
                    
                    <div className="border-t border-gray-100 pt-3 mt-3">
                      <p className="text-sm text-gray-500 mb-2">{shop._count.services} services available</p>
                      {shop.services.length > 0 && (
                        <p className="text-sm">
                          Starting from <span className="font-semibold text-primary-600">
                            {formatCurrency(Math.min(...shop.services.map(s => s.price)))}
                          </span>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

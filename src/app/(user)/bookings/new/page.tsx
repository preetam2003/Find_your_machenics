'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { LoadingSpinner } from '@/components/ui/Loading';
import { formatCurrency } from '@/lib/utils';

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
}

interface Shop {
  id: string;
  name: string;
  address: string;
  city: string;
  openTime: string;
  closeTime: string;
  workingDays: string[];
  services: Service[];
}

export default function NewBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  
  const shopId = searchParams.get('shopId');
  const preSelectedServiceId = searchParams.get('serviceId');

  const [shop, setShop] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [serviceId, setServiceId] = useState(preSelectedServiceId || '');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (shopId) {
      fetchShop();
    }
  }, [shopId]);

  const fetchShop = async () => {
    try {
      const response = await fetch(`/api/shops/${shopId}`);
      const data = await response.json();
      if (data.success) {
        setShop(data.data);
        if (preSelectedServiceId) {
          setServiceId(preSelectedServiceId);
        }
      }
    } catch (error) {
      console.error('Error fetching shop:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedService = shop?.services.find(s => s.id === serviceId);

  const generateTimeSlots = () => {
    if (!shop) return [];
    
    const slots = [];
    const [openHour] = shop.openTime.split(':').map(Number);
    const [closeHour] = shop.closeTime.split(':').map(Number);
    
    for (let hour = openHour; hour < closeHour; hour++) {
      slots.push({
        value: `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`,
        label: `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`,
      });
    }
    
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!session) {
      router.push(`/login?callbackUrl=/bookings/new?shopId=${shopId}&serviceId=${serviceId}`);
      return;
    }

    if (!serviceId || !date || !timeSlot) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          serviceId,
          date,
          timeSlot,
          vehicleInfo,
          notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/bookings/my-bookings?success=true');
      } else {
        setError(data.error || 'Failed to create booking');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Shop Not Found</h1>
          <Link href="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={`/shops/${shopId}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Shop
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Book an Appointment</CardTitle>
            <p className="text-gray-600">{shop.name}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Service Selection */}
              <Select
                label="Select Service *"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                options={[
                  { value: '', label: 'Choose a service' },
                  ...shop.services.map((s) => ({
                    value: s.id,
                    label: `${s.name} - ${formatCurrency(s.price)} (${s.duration} mins)`,
                  })),
                ]}
                required
              />

              {/* Date Selection */}
              <Input
                label="Select Date *"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                required
              />

              {/* Time Slot */}
              <Select
                label="Select Time Slot *"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                options={[
                  { value: '', label: 'Choose a time slot' },
                  ...generateTimeSlots(),
                ]}
                required
              />

              {/* Vehicle Info */}
              <Input
                label="Vehicle Information"
                value={vehicleInfo}
                onChange={(e) => setVehicleInfo(e.target.value)}
                placeholder="e.g., Honda Activa 2020, White"
                helperText="Enter your vehicle make, model, year, and color"
              />

              {/* Notes */}
              <Textarea
                label="Additional Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific issues or requests..."
              />

              {/* Summary */}
              {selectedService && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service</span>
                      <span className="font-medium">{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{selectedService.duration} minutes</span>
                    </div>
                    <div className="flex justify-between text-base pt-2 border-t border-gray-200 mt-2">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="font-bold text-primary-600">
                        {formatCurrency(selectedService.price)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!session && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    You need to be logged in to book an appointment.{' '}
                    <Link href="/login" className="font-medium underline">
                      Login here
                    </Link>
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isSubmitting}
                disabled={!session}
              >
                {session ? 'Confirm Booking' : 'Login to Book'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

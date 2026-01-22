import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Demo data for when database is not available
const demoShops = [
  {
    id: 'demo-1',
    name: 'Quick Fix Auto Service',
    description: 'Professional auto repair and maintenance services. We specialize in both 2-wheelers and 4-wheelers with over 10 years of experience.',
    address: '123 Main Street, Near Bus Stand',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 9876543210',
    email: 'quickfix@example.com',
    vehicleTypes: ['TWO_WHEELER', 'FOUR_WHEELER'],
    openTime: '09:00',
    closeTime: '19:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    status: 'APPROVED',
    services: [
      { id: 's1', name: 'Full Car Service', price: 2999 },
      { id: 's2', name: 'Oil Change', price: 999 },
      { id: 's3', name: 'Brake Pad Replacement', price: 1499 },
    ],
    _count: { services: 7 },
  },
  {
    id: 'demo-2',
    name: 'SpeedMech Garage',
    description: 'Expert car repair services with state-of-the-art diagnostic equipment. Specializing in luxury and premium vehicles.',
    address: '456 Park Avenue, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400058',
    phone: '+91 9876543211',
    email: 'speedmech@example.com',
    vehicleTypes: ['FOUR_WHEELER'],
    openTime: '08:00',
    closeTime: '20:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    status: 'APPROVED',
    services: [
      { id: 's4', name: 'Engine Diagnostics', price: 1500 },
      { id: 's5', name: 'AC Gas Refill', price: 1299 },
      { id: 's6', name: 'Wheel Alignment', price: 899 },
    ],
    _count: { services: 12 },
  },
  {
    id: 'demo-3',
    name: 'Two Wheeler Hub',
    description: 'Your one-stop solution for all bike and scooter repairs. Genuine spare parts and experienced mechanics.',
    address: '789 Station Road, Dadar',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400014',
    phone: '+91 9876543212',
    email: 'twowheeler@example.com',
    vehicleTypes: ['TWO_WHEELER'],
    openTime: '09:30',
    closeTime: '18:30',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    status: 'APPROVED',
    services: [
      { id: 's7', name: 'Bike Full Service', price: 599 },
      { id: 's8', name: 'Puncture Repair', price: 100 },
      { id: 's9', name: 'Chain Cleaning & Lube', price: 250 },
    ],
    _count: { services: 8 },
  },
  {
    id: 'demo-4',
    name: 'Royal Auto Care',
    description: 'Premium car care services including detailing, ceramic coating, and PPF installation. We treat your car like royalty.',
    address: '321 Link Road, Bandra',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    phone: '+91 9876543213',
    email: 'royalauto@example.com',
    vehicleTypes: ['FOUR_WHEELER'],
    openTime: '10:00',
    closeTime: '19:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    status: 'APPROVED',
    services: [
      { id: 's10', name: 'Car Detailing', price: 4999 },
      { id: 's11', name: 'Ceramic Coating', price: 15000 },
      { id: 's12', name: 'Interior Cleaning', price: 1999 },
    ],
    _count: { services: 6 },
  },
  {
    id: 'demo-5',
    name: 'City Bike Works',
    description: 'Specialized in sports bikes and superbikes. Performance upgrades, custom modifications, and regular servicing.',
    address: '567 Highway Road, Powai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400076',
    phone: '+91 9876543214',
    email: 'citybike@example.com',
    vehicleTypes: ['TWO_WHEELER'],
    openTime: '10:00',
    closeTime: '20:00',
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    status: 'APPROVED',
    services: [
      { id: 's13', name: 'Performance Tuning', price: 5999 },
      { id: 's14', name: 'Exhaust Upgrade', price: 8999 },
      { id: 's15', name: 'Suspension Setup', price: 3499 },
    ],
    _count: { services: 10 },
  },
  {
    id: 'demo-6',
    name: 'Sharma Auto Electricals',
    description: 'Specialists in auto electrical repairs - batteries, alternators, starters, and complete wiring solutions.',
    address: '890 Industrial Area, Thane',
    city: 'Thane',
    state: 'Maharashtra',
    pincode: '400601',
    phone: '+91 9876543215',
    email: 'sharmaelec@example.com',
    vehicleTypes: ['TWO_WHEELER', 'FOUR_WHEELER'],
    openTime: '09:00',
    closeTime: '18:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    status: 'APPROVED',
    services: [
      { id: 's16', name: 'Battery Replacement', price: 500 },
      { id: 's17', name: 'Alternator Repair', price: 2500 },
      { id: 's18', name: 'Starter Motor Repair', price: 1800 },
    ],
    _count: { services: 9 },
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const city = searchParams.get('city');
    const vehicleType = searchParams.get('vehicleType');

    // Try to fetch from database first
    try {
      const where: Record<string, unknown> = {
        status: 'APPROVED',
        isActive: true,
      };

      if (query) {
        where.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { services: { some: { name: { contains: query, mode: 'insensitive' } } } },
        ];
      }

      if (city) {
        where.city = { contains: city, mode: 'insensitive' };
      }

      if (vehicleType) {
        where.vehicleTypes = { has: vehicleType };
      }

      const shops = await prisma.mechanicShop.findMany({
        where,
        include: {
          services: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              price: true,
            },
            orderBy: { price: 'asc' },
            take: 5,
          },
          _count: {
            select: { services: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (shops.length > 0) {
        return NextResponse.json({ success: true, data: shops });
      }
    } catch {
      // Database not available, use demo data
    }

    // Filter demo data based on search params
    let filteredShops = [...demoShops];

    if (query) {
      const q = query.toLowerCase();
      filteredShops = filteredShops.filter(
        (shop) =>
          shop.name.toLowerCase().includes(q) ||
          shop.description.toLowerCase().includes(q) ||
          shop.services.some((s) => s.name.toLowerCase().includes(q))
      );
    }

    if (city) {
      const c = city.toLowerCase();
      filteredShops = filteredShops.filter((shop) =>
        shop.city.toLowerCase().includes(c)
      );
    }

    if (vehicleType) {
      filteredShops = filteredShops.filter((shop) =>
        shop.vehicleTypes.includes(vehicleType)
      );
    }

    return NextResponse.json({ success: true, data: filteredShops });
  } catch (error) {
    console.error('Error fetching shops:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

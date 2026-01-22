import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Demo shop details
const demoShopDetails: Record<string, unknown> = {
  'demo-1': {
    id: 'demo-1',
    name: 'Quick Fix Auto Service',
    description: 'Professional auto repair and maintenance services. We specialize in both 2-wheelers and 4-wheelers with over 10 years of experience. Our team of certified mechanics uses the latest diagnostic tools to ensure your vehicle runs smoothly.',
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
    owner: { name: 'Rajesh Kumar' },
    services: [
      { id: 's1', name: 'Full Car Service', description: 'Complete car inspection, oil change, filter replacement, and 50-point check', price: 2999, duration: 120, category: { name: 'Car Service' } },
      { id: 's2', name: 'Oil Change', description: 'Engine oil and filter replacement with premium quality oil', price: 999, duration: 30, category: { name: 'Oil Change' } },
      { id: 's3', name: 'Brake Pad Replacement', description: 'Front and rear brake pad replacement with quality parts', price: 1499, duration: 60, category: { name: 'Brake Service' } },
      { id: 's4', name: 'AC Gas Refill', description: 'AC gas top-up and leak check', price: 1299, duration: 45, category: { name: 'AC Service' } },
      { id: 's5', name: 'Bike Full Service', description: 'Complete bike inspection and service', price: 599, duration: 60, category: { name: 'Bike Service' } },
      { id: 's6', name: 'Bike Oil Change', description: 'Engine oil replacement for bikes', price: 299, duration: 20, category: { name: 'Bike Service' } },
      { id: 's7', name: 'Puncture Repair', description: 'Tire puncture fixing', price: 100, duration: 15, category: { name: 'Tire Service' } },
    ],
  },
  'demo-2': {
    id: 'demo-2',
    name: 'SpeedMech Garage',
    description: 'Expert car repair services with state-of-the-art diagnostic equipment. Specializing in luxury and premium vehicles including BMW, Mercedes, Audi, and more.',
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
    owner: { name: 'Amit Shah' },
    services: [
      { id: 's8', name: 'Engine Diagnostics', description: 'Complete computerized engine diagnostics', price: 1500, duration: 45, category: { name: 'Diagnostics' } },
      { id: 's9', name: 'AC Gas Refill', description: 'Premium AC gas refill with leak detection', price: 1299, duration: 60, category: { name: 'AC Service' } },
      { id: 's10', name: 'Wheel Alignment', description: '4-wheel computerized alignment', price: 899, duration: 45, category: { name: 'Wheel Service' } },
      { id: 's11', name: 'Battery Replacement', description: 'Premium battery with 2-year warranty', price: 5999, duration: 30, category: { name: 'Electrical' } },
      { id: 's12', name: 'Suspension Repair', description: 'Complete suspension inspection and repair', price: 3500, duration: 120, category: { name: 'Suspension' } },
    ],
  },
  'demo-3': {
    id: 'demo-3',
    name: 'Two Wheeler Hub',
    description: 'Your one-stop solution for all bike and scooter repairs. Genuine spare parts and experienced mechanics who understand your two-wheeler needs.',
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
    owner: { name: 'Suresh Patil' },
    services: [
      { id: 's13', name: 'Bike Full Service', description: 'Complete bike inspection with oil change, filter, and adjustments', price: 599, duration: 60, category: { name: 'Bike Service' } },
      { id: 's14', name: 'Puncture Repair', description: 'Quick puncture repair for all tire types', price: 100, duration: 15, category: { name: 'Tire Service' } },
      { id: 's15', name: 'Chain Cleaning & Lube', description: 'Professional chain cleaning and lubrication', price: 250, duration: 20, category: { name: 'Bike Service' } },
      { id: 's16', name: 'Brake Shoe Replacement', description: 'Front and rear brake shoe replacement', price: 450, duration: 30, category: { name: 'Brake Service' } },
      { id: 's17', name: 'Clutch Plate Replacement', description: 'Clutch plate and cable replacement', price: 800, duration: 45, category: { name: 'Engine' } },
    ],
  },
  'demo-4': {
    id: 'demo-4',
    name: 'Royal Auto Care',
    description: 'Premium car care services including detailing, ceramic coating, and PPF installation. We treat your car like royalty with the best products and techniques.',
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
    owner: { name: 'Vikram Mehta' },
    services: [
      { id: 's18', name: 'Car Detailing', description: 'Complete interior and exterior detailing', price: 4999, duration: 240, category: { name: 'Detailing' } },
      { id: 's19', name: 'Ceramic Coating', description: '9H ceramic coating with 3-year warranty', price: 15000, duration: 480, category: { name: 'Protection' } },
      { id: 's20', name: 'Interior Cleaning', description: 'Deep interior cleaning and sanitization', price: 1999, duration: 120, category: { name: 'Cleaning' } },
      { id: 's21', name: 'Paint Protection Film', description: 'PPF installation for hood and bumper', price: 25000, duration: 360, category: { name: 'Protection' } },
    ],
  },
  'demo-5': {
    id: 'demo-5',
    name: 'City Bike Works',
    description: 'Specialized in sports bikes and superbikes. Performance upgrades, custom modifications, and regular servicing by certified technicians.',
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
    owner: { name: 'Rohan Desai' },
    services: [
      { id: 's22', name: 'Performance Tuning', description: 'ECU remapping and performance optimization', price: 5999, duration: 180, category: { name: 'Performance' } },
      { id: 's23', name: 'Exhaust Upgrade', description: 'Aftermarket exhaust installation', price: 8999, duration: 120, category: { name: 'Performance' } },
      { id: 's24', name: 'Suspension Setup', description: 'Professional suspension tuning for track or street', price: 3499, duration: 90, category: { name: 'Suspension' } },
      { id: 's25', name: 'Chain & Sprocket Replacement', description: 'Premium chain and sprocket kit installation', price: 4500, duration: 60, category: { name: 'Drivetrain' } },
    ],
  },
  'demo-6': {
    id: 'demo-6',
    name: 'Sharma Auto Electricals',
    description: 'Specialists in auto electrical repairs - batteries, alternators, starters, and complete wiring solutions for all vehicles.',
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
    owner: { name: 'Deepak Sharma' },
    services: [
      { id: 's26', name: 'Battery Replacement', description: 'Battery testing and replacement', price: 500, duration: 30, category: { name: 'Electrical' } },
      { id: 's27', name: 'Alternator Repair', description: 'Alternator diagnosis and repair', price: 2500, duration: 120, category: { name: 'Electrical' } },
      { id: 's28', name: 'Starter Motor Repair', description: 'Starter motor repair or replacement', price: 1800, duration: 90, category: { name: 'Electrical' } },
      { id: 's29', name: 'Wiring Harness Repair', description: 'Complete wiring inspection and repair', price: 3000, duration: 180, category: { name: 'Electrical' } },
    ],
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try database first
    try {
      const shop = await prisma.mechanicShop.findUnique({
        where: { id, status: 'APPROVED' },
        include: {
          services: {
            where: { isActive: true },
            include: {
              category: {
                select: { name: true },
              },
            },
            orderBy: { price: 'asc' },
          },
          owner: {
            select: { name: true },
          },
        },
      });

      if (shop) {
        return NextResponse.json({ success: true, data: shop });
      }
    } catch {
      // Database not available
    }

    // Return demo data
    const demoShop = demoShopDetails[id];
    if (demoShop) {
      return NextResponse.json({ success: true, data: demoShop });
    }

    return NextResponse.json({ success: false, error: 'Shop not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching shop:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

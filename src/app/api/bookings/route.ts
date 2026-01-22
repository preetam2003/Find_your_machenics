import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

const bookingSchema = z.object({
  shopId: z.string(),
  serviceId: z.string(),
  date: z.string(),
  timeSlot: z.string(),
  vehicleInfo: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        service: {
          select: { name: true, duration: true },
        },
        shop: {
          select: { id: true, name: true, address: true, city: true, phone: true },
        },
      },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // Get the service to get the price
    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId },
    });

    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    // Check if the shop exists and is approved
    const shop = await prisma.mechanicShop.findUnique({
      where: { id: validatedData.shopId, status: 'APPROVED' },
    });

    if (!shop) {
      return NextResponse.json({ success: false, error: 'Shop not found' }, { status: 404 });
    }

    // Check for conflicting bookings
    const existingBooking = await prisma.booking.findFirst({
      where: {
        shopId: validatedData.shopId,
        date: new Date(validatedData.date),
        timeSlot: validatedData.timeSlot,
        status: { notIn: ['CANCELLED'] },
      },
    });

    if (existingBooking) {
      return NextResponse.json({ 
        success: false, 
        error: 'This time slot is already booked' 
      }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        shopId: validatedData.shopId,
        serviceId: validatedData.serviceId,
        date: new Date(validatedData.date),
        timeSlot: validatedData.timeSlot,
        totalPrice: service.price,
        vehicleInfo: validatedData.vehicleInfo,
        notes: validatedData.notes,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 });
    }
    console.error('Error creating booking:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

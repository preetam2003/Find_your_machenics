import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

const updateBookingSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'MECHANIC') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateBookingSchema.parse(body);

    // Verify ownership
    const shop = await prisma.mechanicShop.findUnique({
      where: { ownerId: session.user.id },
    });

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking || booking.shopId !== shop?.id) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: validatedData.status },
    });

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 });
    }
    console.error('Error updating booking:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

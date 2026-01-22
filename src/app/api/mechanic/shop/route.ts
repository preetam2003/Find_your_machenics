import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'MECHANIC') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const shop = await prisma.mechanicShop.findUnique({
      where: { ownerId: session.user.id },
    });

    return NextResponse.json({ success: true, data: shop });
  } catch (error) {
    console.error('Error fetching shop:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'MECHANIC') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();

    const shop = await prisma.mechanicShop.update({
      where: { ownerId: session.user.id },
      data: {
        name: body.name,
        description: body.description,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        phone: body.phone,
        email: body.email,
        openTime: body.openTime,
        closeTime: body.closeTime,
        vehicleTypes: body.vehicleTypes,
        workingDays: body.workingDays,
      },
    });

    return NextResponse.json({ success: true, data: shop });
  } catch (error) {
    console.error('Error updating shop:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const mechanic = await prisma.mechanicShop.update({
      where: { id },
      data: { 
        status: 'REJECTED',
        rejectionReason: body.reason || null,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Mechanic shop rejected',
      data: mechanic 
    });
  } catch (error) {
    console.error('Error rejecting mechanic:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

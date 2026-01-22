import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

const updateServiceSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  duration: z.number().min(5).optional(),
  categoryId: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
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
    const validatedData = updateServiceSchema.parse(body);

    // Verify ownership
    const shop = await prisma.mechanicShop.findUnique({
      where: { ownerId: session.user.id },
    });

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service || service.shopId !== shop?.id) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: updatedService });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 });
    }
    console.error('Error updating service:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'MECHANIC') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    // Verify ownership
    const shop = await prisma.mechanicShop.findUnique({
      where: { ownerId: session.user.id },
    });

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service || service.shopId !== shop?.id) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  role: z.enum(['USER', 'MECHANIC']).default('USER'),
  // Mechanic shop details (required if role is MECHANIC)
  shopName: z.string().optional(),
  shopAddress: z.string().optional(),
  shopCity: z.string().optional(),
  shopState: z.string().optional(),
  shopPincode: z.string().optional(),
  shopPhone: z.string().optional(),
  vehicleTypes: z.array(z.enum(['TWO_WHEELER', 'FOUR_WHEELER'])).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Validate mechanic shop details
    if (validatedData.role === 'MECHANIC') {
      if (!validatedData.shopName || !validatedData.shopAddress || 
          !validatedData.shopCity || !validatedData.shopState || 
          !validatedData.shopPincode || !validatedData.shopPhone ||
          !validatedData.vehicleTypes || validatedData.vehicleTypes.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Shop details are required for mechanic registration' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Create user and shop (if mechanic) in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          name: validatedData.name,
          phone: validatedData.phone,
          role: validatedData.role,
        },
      });

      if (validatedData.role === 'MECHANIC') {
        await tx.mechanicShop.create({
          data: {
            ownerId: user.id,
            name: validatedData.shopName!,
            address: validatedData.shopAddress!,
            city: validatedData.shopCity!,
            state: validatedData.shopState!,
            pincode: validatedData.shopPincode!,
            phone: validatedData.shopPhone!,
            vehicleTypes: validatedData.vehicleTypes!,
            status: 'PENDING',
          },
        });
      }

      return user;
    });

    return NextResponse.json({
      success: true,
      message: validatedData.role === 'MECHANIC' 
        ? 'Registration successful. Your shop is pending approval.'
        : 'Registration successful.',
      data: {
        id: result.id,
        email: result.email,
        name: result.name,
        role: result.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

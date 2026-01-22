import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mechbook.com' },
    update: {},
    create: {
      email: 'admin@mechbook.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('Created admin:', admin.email);

  // Create categories
  const categories = [
    { name: 'Engine Repair', vehicleType: 'FOUR_WHEELER' as const, description: 'Engine diagnostics and repair services' },
    { name: 'Oil Change', vehicleType: 'FOUR_WHEELER' as const, description: 'Engine oil replacement and filter change' },
    { name: 'Brake Service', vehicleType: 'FOUR_WHEELER' as const, description: 'Brake pad replacement and brake system repair' },
    { name: 'AC Service', vehicleType: 'FOUR_WHEELER' as const, description: 'Air conditioning repair and gas refill' },
    { name: 'Bike Service', vehicleType: 'TWO_WHEELER' as const, description: 'General bike servicing' },
    { name: 'Bike Oil Change', vehicleType: 'TWO_WHEELER' as const, description: 'Engine oil change for bikes' },
    { name: 'Puncture Repair', vehicleType: 'TWO_WHEELER' as const, description: 'Tire puncture repair' },
    { name: 'Battery Service', vehicleType: 'TWO_WHEELER' as const, description: 'Battery check and replacement' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
  console.log('Created categories');

  // Create a sample mechanic user
  const mechanicPassword = await hash('mechanic123', 12);
  const mechanic = await prisma.user.upsert({
    where: { email: 'mechanic@example.com' },
    update: {},
    create: {
      email: 'mechanic@example.com',
      password: mechanicPassword,
      name: 'John Mechanic',
      phone: '+91 9876543210',
      role: 'MECHANIC',
    },
  });
  console.log('Created mechanic:', mechanic.email);

  // Create mechanic shop
  const shop = await prisma.mechanicShop.upsert({
    where: { ownerId: mechanic.id },
    update: {},
    create: {
      ownerId: mechanic.id,
      name: 'Quick Fix Auto Service',
      description: 'Professional auto repair and maintenance services. We specialize in both 2-wheelers and 4-wheelers with over 10 years of experience.',
      address: '123 Main Street, Near Bus Stand',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210',
      email: 'quickfix@example.com',
      vehicleTypes: ['TWO_WHEELER', 'FOUR_WHEELER'],
      status: 'APPROVED',
      openTime: '09:00',
      closeTime: '19:00',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
  });
  console.log('Created shop:', shop.name);

  // Create services for the shop
  const services = [
    { name: 'Full Car Service', description: 'Complete car inspection and service', price: 2999, duration: 120 },
    { name: 'Oil Change', description: 'Engine oil and filter replacement', price: 999, duration: 30 },
    { name: 'Brake Pad Replacement', description: 'Front and rear brake pad replacement', price: 1499, duration: 60 },
    { name: 'AC Gas Refill', description: 'AC gas top-up and leak check', price: 1299, duration: 45 },
    { name: 'Bike Full Service', description: 'Complete bike inspection and service', price: 599, duration: 60 },
    { name: 'Bike Oil Change', description: 'Engine oil replacement', price: 299, duration: 20 },
    { name: 'Puncture Repair', description: 'Tire puncture fixing', price: 100, duration: 15 },
  ];

  for (const service of services) {
    await prisma.service.create({
      data: {
        ...service,
        shopId: shop.id,
      },
    });
  }
  console.log('Created services');

  // Create a sample user
  const userPassword = await hash('user123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      name: 'Test User',
      phone: '+91 9876543211',
      role: 'USER',
    },
  });
  console.log('Created user:', user.email);

  console.log('\n--- Seed completed successfully! ---');
  console.log('\nTest Accounts:');
  console.log('Admin:    admin@mechbook.com / admin123');
  console.log('Mechanic: mechanic@example.com / mechanic123');
  console.log('User:     user@example.com / user123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import express from 'express'
import prisma from '../lib/prisma.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get user's bookings
router.get('/', authenticate, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    res.json({
      success: true,
      bookings: bookings.map(booking => ({
        id: booking.id,
        shop: booking.shop,
        appointmentDate: booking.date,
        status: booking.status,
        description: booking.notes,
        totalPrice: booking.totalPrice,
      }))
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings'
    })
  }
})

// Create booking
router.post('/', authenticate, async (req, res) => {
  try {
    const { shopId, appointmentDate, description } = req.body

    if (!shopId || !appointmentDate) {
      return res.status(400).json({
        success: false,
        error: 'Shop ID and appointment date are required'
      })
    }

    // Get shop and first service (simplified)
    const shop = await prisma.mechanicShop.findUnique({
      where: { id: shopId },
      include: {
        services: {
          where: { isActive: true },
          take: 1,
        },
      },
    })

    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Shop not found'
      })
    }

    if (shop.services.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Shop has no available services'
      })
    }

    const service = shop.services[0]

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        shopId,
        serviceId: service.id,
        date: new Date(appointmentDate),
        timeSlot: '09:00-10:00', // Simplified
        status: 'PENDING',
        totalPrice: service.price,
        notes: description,
      },
    })

    res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        shopId: booking.shopId,
        appointmentDate: booking.date,
        status: booking.status,
      }
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create booking'
    })
  }
})

export default router


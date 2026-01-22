import express from 'express'
import prisma from '../lib/prisma.js'
import { authenticate, requireRole } from '../middleware/auth.js'

const router = express.Router()

// All mechanic routes require authentication and MECHANIC role
router.use(authenticate)
router.use(requireRole('MECHANIC'))

// Get mechanic's bookings
router.get('/bookings', async (req, res) => {
  try {
    const shop = await prisma.mechanicShop.findUnique({
      where: { ownerId: req.user.id },
    })

    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Shop not found'
      })
    }

    const bookings = await prisma.booking.findMany({
      where: { shopId: shop.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        service: {
          select: {
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
      bookings
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings'
    })
  }
})

export default router


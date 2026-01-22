import express from 'express'
import prisma from '../lib/prisma.js'
import { authenticate, requireRole } from '../middleware/auth.js'

const router = express.Router()

// All admin routes require authentication and ADMIN role
router.use(authenticate)
router.use(requireRole('ADMIN'))

// Get all mechanics (pending approval)
router.get('/mechanics', async (req, res) => {
  try {
    const shops = await prisma.mechanicShop.findMany({
      where: { status: 'PENDING' },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    res.json({
      success: true,
      mechanics: shops
    })
  } catch (error) {
    console.error('Error fetching mechanics:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mechanics'
    })
  }
})

// Approve mechanic
router.post('/mechanics/:id/approve', async (req, res) => {
  try {
    const shop = await prisma.mechanicShop.update({
      where: { id: req.params.id },
      data: { status: 'APPROVED' },
    })

    res.json({
      success: true,
      shop
    })
  } catch (error) {
    console.error('Error approving mechanic:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to approve mechanic'
    })
  }
})

// Reject mechanic
router.post('/mechanics/:id/reject', async (req, res) => {
  try {
    const shop = await prisma.mechanicShop.update({
      where: { id: req.params.id },
      data: {
        status: 'REJECTED',
        rejectionReason: req.body.reason || 'Not specified',
      },
    })

    res.json({
      success: true,
      shop
    })
  } catch (error) {
    console.error('Error rejecting mechanic:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to reject mechanic'
    })
  }
})

export default router


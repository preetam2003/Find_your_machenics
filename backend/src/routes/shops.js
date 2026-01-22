import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get all shops
router.get('/', async (req, res) => {
  try {
    const { search, location } = req.query

    const where = {
      status: 'APPROVED',
      isActive: true,
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (location) {
      where.city = { contains: location, mode: 'insensitive' }
    }

    const shops = await prisma.mechanicShop.findMany({
      where,
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json({
      success: true,
      shops: shops.map(shop => ({
        id: shop.id,
        name: shop.name,
        address: shop.address,
        city: shop.city,
        state: shop.state,
        phone: shop.phone,
        rating: 4.5, // TODO: Calculate from reviews
        vehicleTypes: shop.vehicleTypes,
      }))
    })
  } catch (error) {
    console.error('Error fetching shops:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch shops'
    })
  }
})

// Get shop by ID
router.get('/:id', async (req, res) => {
  try {
    const shop = await prisma.mechanicShop.findUnique({
      where: { id: req.params.id },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
        services: {
          where: { isActive: true },
        },
      },
    })

    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Shop not found'
      })
    }

    res.json({
      success: true,
      ...shop,
      rating: 4.5, // TODO: Calculate from reviews
    })
  } catch (error) {
    console.error('Error fetching shop:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch shop'
    })
  }
})

export default router


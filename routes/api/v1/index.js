const express = require('express')

const healthRoutes = require('./health')
const authRoutes = require('./auth')

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)

module.exports = router
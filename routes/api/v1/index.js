const express = require('express')

const healthRoutes = require('./health')
const authRoutes = require('./auth')
const { getRoles, createRole } = require('../../../controllers/RoleController')

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)

router.route('/roles').get(getRoles).post(createRole)

module.exports = router
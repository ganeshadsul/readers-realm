const express = require('express')
const apiRoutes = require('./api')
const { validateRequest } = require('../middlewares')

const router = express.Router()

router.use(validateRequest)
router.use('/api', apiRoutes)

module.exports = router
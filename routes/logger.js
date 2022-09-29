const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const { getAllLogs } = require('../controllers/logger-controller')
router.get('/', authMiddleware, getAllLogs)
module.exports = router

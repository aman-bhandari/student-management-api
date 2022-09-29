const express = require('express')
const router = express.Router()

const { getAllLogs } = require('../controllers/logger-controller')
router.get('/', getAllLogs)
module.exports = router

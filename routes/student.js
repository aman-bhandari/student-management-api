const express = require('express')
const router = express.Router()

const {
  createStudent,
  deleteStudent,
} = require('../controllers/student-controller')
router.post('/', createStudent)
router.delete('/', deleteStudent)
module.exports = router

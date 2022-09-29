const express = require('express')
const router = express.Router()

const {
  createStudent,
  deleteStudent,
  updateStudent,
} = require('../controllers/student-controller')
router.post('/', createStudent)
router.delete('/', deleteStudent)
router.patch('/', updateStudent)
module.exports = router

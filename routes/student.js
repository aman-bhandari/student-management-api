const express = require('express')
const router = express.Router()

const {
  createStudent,
  deleteStudent,
  updateStudent,
  getAllStudents,
} = require('../controllers/student-controller')
router.get('/', getAllStudents)
router.post('/', createStudent)
router.delete('/:id', deleteStudent)
router.patch('/', updateStudent)
module.exports = router

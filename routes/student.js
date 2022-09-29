const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const {
  createStudent,
  deleteStudent,
  updateStudent,
  getAllStudents,
} = require('../controllers/student-controller')
router.get('/', getAllStudents)
router.post('/', authMiddleware, createStudent)
router.delete('/:id', authMiddleware, deleteStudent)
router.patch('/:id', authMiddleware, updateStudent)
module.exports = router

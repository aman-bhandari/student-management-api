const Student = require('../models/student')
const Logger = require('../models/logger')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')
const getAllStudents = async (req, res) => {
  const students = await Student.find({}).sort('-createdAt')
  res.status(StatusCodes.OK).json({ students, total: students.length })
}
const createStudent = async (req, res) => {
  const { name, dob, mobile, email } = req.body
  if (!name || !dob || !mobile || !email)
    throw new BadRequestError('Please provide valid credentials')
  const student = await Student.create(req.body)
  const log = await Logger.create({
    message: `${student.name} is added in database`,
  })
  res.status(StatusCodes.CREATED).json({ student, log })
}
const updateStudent = async (req, res) => {
  let { id: updateId } = req.params
  const { name, dob, mobile, email } = req.body
  if (!updateId || !name || !dob || !mobile || !email)
    throw new BadRequestError('Please provide valid credentials')
  const student = await Student.findOneAndUpdate(
    {
      _id: updateId,
    },
    req.body,
    { new: true, runValidators: true }
  )
  if (!student) throw new NotFoundError('No student in database with this id')
  const log = await Logger.create({
    message: `${student.name} is updated in database`,
  })
  res.status(StatusCodes.OK).json({ student, log })
}
const deleteStudent = async (req, res) => {
  let { id: studentId } = req.params
  if (!studentId) throw new BadRequestError('Invalid credentials')
  const student = await Student.findOneAndDelete({ _id: studentId })
  if (!student) throw new NotFoundError('No student in database with this id')
  const log = await Logger.create({
    message: `${student.name} is deleted from database`,
  })
  res.status(StatusCodes.OK).json({ student, log })
}
module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
}

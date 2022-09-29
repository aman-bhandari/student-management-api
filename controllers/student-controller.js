const Student = require('../models/student')
const Logger = require('../models/logger')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')
const getAllStudents = async (req, res) => {
  const students = await Student.find({})
  res.status(StatusCodes.OK).json({ students })
}
const createStudent = async (req, res) => {
  const student = await Student.create(req.body)
  const log = await Logger.create({
    message: `${student.name} is added in database`,
  })
  res.status(StatusCodes.CREATED).json({ student, log })
}
const updateStudent = async (req, res) => {
  let { id: updateId } = req.params

  const student = await Student.findOneAndUpdate(
    {
      _id: updateId,
    },
    req.body,
    { new: true, runValidators: true }
  )
  if (!student) throw new NotFoundError('no student')
  const log = await Logger.create({
    message: `${student.name} is updated in database`,
  })
  res.status(StatusCodes.OK).json({ student, log })
}
const deleteStudent = async (req, res) => {
  let { id: studentId } = req.params
  const student = await Student.findOneAndDelete({ _id: studentId })
  if (!student) throw new NotFoundError('no student')
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

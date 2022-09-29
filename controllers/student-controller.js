const Student = require('../models/student')
const Logger = require('../models/logger')

const getAllStudents = async (req, res) => {
  const students = await Student.find({})
  res.status(200).json({ students })
}
const createStudent = async (req, res) => {
  console.log(req.body)
  const student = await Student.create(req.body)
  const log = await Logger.create({
    message: `${student.name} is added in database`,
  })
  res.status(200).json({ student, log })
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
  if (!student) throw new Error('no student')
  const log = await Logger.create({
    message: `${student.name} is updated in database`,
  })
  res.status(200).json({ student, log })
}
const deleteStudent = async (req, res) => {
  let { id: studentId } = req.params
  const student = await Student.findOneAndDelete({ _id: studentId })
  if (!student) throw new Error('no student')
  const log = await Logger.create({
    message: `${student.name} is deleted from database`,
  })
  res.status(200).json({ student, log })
}
module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
}

const Student = require('../models/student')
const Logger = require('../models/logger')

const createStudent = async (req, res) => {
  const student = await Student.create(req.body)
  const log = await Logger.create({
    message: `${student.name} is added in database`,
  })
  res.status(200).json({ student, log })
}
const updateStudent = async (req, res) => {
  const student = await Student.findOneAndUpdate(
    {
      email: req.body.email,
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
  const student = await Student.findOneAndDelete({ mobile: req.body.mobile })
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
}

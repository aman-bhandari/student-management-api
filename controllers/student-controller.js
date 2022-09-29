const Student = require('../models/student')

const createStudent = async (req, res) => {
  const student = await Student.create(req.body)
  res.status(200).json({ student })
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
  res.status(200).json({ student })
}
const deleteStudent = async (req, res) => {
  const student = await Student.findOneAndDelete({ mobile: req.body.mobile })
  if (!student) throw new Error('no student')
  res.status(200).json({ student })
}
module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
}

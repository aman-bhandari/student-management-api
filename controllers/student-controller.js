const Student = require('../models/student')

const createStudent = async (req, res) => {
  const student = await Student.create(req.body)
  res.status(200).json({ student })
}

module.exports = {
  createStudent,
}

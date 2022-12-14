const mongoose = require('mongoose')
const validator = require('validator')
const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 500,
    },
    dob: {
      type: String,
      required: [true, 'Please provide dob'],
    },
    mobile: {
      type: Number,
      required: [true, 'Please provide number'],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = new mongoose.model('Student', studentSchema)

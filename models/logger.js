const mongoose = require('mongoose')
const loggerSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = new mongoose.model('Logger', loggerSchema)

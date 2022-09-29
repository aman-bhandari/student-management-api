const Logger = require('../models/logger')

const getAllLogs = async (req, res) => {
  const logs = await Logger.find({}).sort('-createdAt')
  res.status(200).json({ logs })
}

module.exports = { getAllLogs }

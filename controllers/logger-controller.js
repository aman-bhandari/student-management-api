const Logger = require('../models/logger')
const { StatusCodes } = require('http-status-codes')
const getAllLogs = async (req, res) => {
  const logs = await Logger.find({}).sort('-createdAt')
  res.status(StatusCodes.OK).json({ logs })
}

module.exports = { getAllLogs }

const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const login = (req, res) => {
  const { password } = req.body
  if (!(password == process.env.PASSWORD))
    throw new BadRequestError('Please provide password')
  const id = new Date().getDate()
  const user = 'admin'
  const token = jwt.sign({ id, user }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  })
  res.status(StatusCodes.OK).json({ token })
}
module.exports = { login }

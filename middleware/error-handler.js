// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err)
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, please try again later',
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.name === 'ValidationError') {
    ;(customError.statusCode = 400),
      (customError.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(', '))
  }
  if (err.code && err.code === 11000) {
    ;(customError.statusCode = 400),
      (customError.message = `Duplicate value found for ${Object.keys(
        err.keyValue
      )} field, please choose another value`)
  }
  if (err.name === 'CastError') {
    ;(customError.message = `No item found for id: ${err.value}`),
      (customError.statusCode = 404)
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json(customError.message)
}

module.exports = errorHandlerMiddleware

const jwt = require('jsonwebtoken')
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(req.headers.authorization)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const { id, user } = decoded
    req.user = user
    next()
  } catch (error) {
    throw new Error('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware

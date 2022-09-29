const jwt = require('jsonwebtoken')
const login = (req, res) => {
  const { password } = req.body
  if (password == process.env.PASSWORD) {
    const id = new Date().getDate()
    const user = 'admin'
    const token = jwt.sign({ id, user }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    })
    res.status(200).json({ token })
  }
  res.status(401).send()
}
module.exports = { login }

const express = require('express')

const app = express()

const port = 8000

app.get('/', (req, res) => {
  res.send('Student Management System')
})

app.listen(port, () => {
  console.log('This server is listening on port ', port)
})

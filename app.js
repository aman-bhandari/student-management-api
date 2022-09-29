require('dotenv').config()
const express = require('express')

const app = express()

const connectDB = require('./db/connect')
const studentRouter = require('./routes/student')
const loggerRouter = require('./routes/logger')
app.use(express.static('./public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Student Management System')
})

app.use('/api/v1/student', studentRouter)
app.use('/api/v1/logger', loggerRouter)
const port = 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()

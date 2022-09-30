require('dotenv').config()

const connectDB = require('./db/connect')
const Student = require('./models/student')

const mockData = require('./MOCK_DATA.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    // await Student.deleteMany()
    await Student.create(mockData)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()

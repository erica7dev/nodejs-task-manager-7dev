const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDb = require('./db/connect')
require('dotenv').config()

// middlewares
const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    )
  } catch (error) {
    console.log(error)
  }
}
start()

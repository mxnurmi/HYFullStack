const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
// const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
// const Blog = require('./models/blog')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error:', error.message)
    })


app.use(cors())
app.use(express.json())

const logger = require('./utils/logger')

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
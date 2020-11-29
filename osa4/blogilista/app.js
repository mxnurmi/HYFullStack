const express = require('express')
const app = express()
const cors = require('cors')
// const logger = require('./utils/logger')
const config = require('./utils/config')
// const Blog = require('./models/blog')
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

const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
app.use('/api/blogs', blogRouter)

module.exports = app
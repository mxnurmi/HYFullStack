const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
// const Blog = require('../models/blog')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  // const blog = await Blog.findById(body.blog)

  if((body.password.length < 3) || (body.password === undefined)) {
    return response.status(400).json({ error: 'password is too short or undefined' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    // blog: blog._id
  })

  const savedUser = await user.save()
  // blog.user = savedUser._id
  // await blog.save()

  response.json(savedUser.toJSON)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})

    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
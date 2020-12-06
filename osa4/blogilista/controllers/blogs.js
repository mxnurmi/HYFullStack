const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1, id: 1})

  response.json(blogs.map(blog => blog.toJSON()))

})
  
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(typeof body.likes === 'undefined') {
    body.likes = 0
  }

  if(typeof body.title === 'undefined' || typeof body.url === 'undefined') {
     response.status(400).end()
  } else {
    // const user = await User.findById(body.userId)
    const blog = new Blog(body)
    blog.user = user._id
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result.toJSON())
  }

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes
  }

  // title: String,
  // author: String,
  // url: String,
  // likes: Number

  const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new:true })
  response.json(returnedBlog)
})

module.exports = blogRouter
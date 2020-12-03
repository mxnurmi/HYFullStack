const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    // })

})
  
blogRouter.post('/', async (request, response) => {

  if(typeof request.body.likes === 'undefined') {
    request.body.likes = 0
  }

  if(typeof request.body.title === 'undefined' || typeof request.body.url === 'undefined') {
     response.status(400).end()
  } else {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
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
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
  
blogRouter.post('/', (request, response) => {

  if(typeof request.body.likes === 'undefined') {
    request.body.likes = 0
  }

  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
  })
})

module.exports = blogRouter
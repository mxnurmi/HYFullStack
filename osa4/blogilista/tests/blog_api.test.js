const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { notify } = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithAllBlogs)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.listWithAllBlogs.length)
})

test('there is a field called id', async () => {
    const response = await api.get('/api/blogs')
    // const new_ids = response.body.map(el => el.toJSON())
    const new_ids = response.body.map(blog => blog.id)
    // console.log(new_ids)
    // console.log(response.body._id)
    // console.log(response.body.id)

    // const ids = blogs.map(blog => blog.id)
    // response.body.map(blog => expect(blog.id).toBeDefined())

    expect(new_ids[0]).toBeDefined()
})

test('there is no field called _id', async () => {
    const response = await api.get('/api/blogs')
    //const blogs = response.body.map(el => el.toJSON())
    const old_ids = response.body.map(blog => blog._id)

    expect(old_ids[0]).not.toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
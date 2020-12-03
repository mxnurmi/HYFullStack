const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { notify } = require('../app')
const test_helper = require('./test_helper')

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
    expect(new_ids[0]).toBeDefined()
})

test('there is no field called _id', async () => {
    const response = await api.get('/api/blogs')
    const old_ids = response.body.map(blog => blog._id)

    expect(old_ids[0]).not.toBeDefined()
})

test('a valid blog can be added to the data base', async() => {
    const newBlog = {     
        _id: "5a422b891b54a676234d17fb", 
        title: "Testing is for Pros", 
        author: "Max Power", 
        url: "https://testing.fi/", 
        likes: 4, 
        __v: 0 
    }

    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsInDB = await Blog.find({})
    blogsAtEnd = blogsInDB.map(note => note.toJSON())
    blogsAtStart = test_helper.listWithAllBlogs

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    const ids = blogsAtEnd.map(blog => blog.id)
    expect(ids).toContain('5a422b891b54a676234d17fb')
})

test('if likes are undefined, set it to 0', async() => {
    const newBlog = {     
        _id: "5a422b891b54a676234d17fb", 
        title: "Testing is for Pros", 
        author: "Max Power", 
        url: "https://testing.fi/", 
        __v: 0 
    }

    await api 
        .post('/api/blogs')
        .send(newBlog)
    
    const blogsInDB = await Blog.find({})
    blogsAtEnd = blogsInDB.map(note => note.toJSON())
    const resultBlog = blogsAtEnd.find(blog => blog.id === '5a422b891b54a676234d17fb')
    console.log(resultBlog)

    expect(resultBlog.likes).toEqual(0)
})

afterAll(() => {
  mongoose.connection.close()
})
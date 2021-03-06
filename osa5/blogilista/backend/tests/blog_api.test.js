const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const { notify } = require('../app')
const test_helper = require('./test_helper')

const api = supertest(app)
var token = undefined
var testUser = undefined

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithAllBlogs)

    await User.deleteMany({})

    testUser = {
        "username": "admin",
        "name": "",
        "password": process.env.TEST_PASS,
    }

    await api
        .post('/api/users')
        .send(testUser)

    const user = {
        "username": "admin", 
        "password": process.env.TEST_PASS
    }

    const login = await api
        .post('/api/login')
        .send(user)

    token = JSON.parse(login.text).token
    // token = login.response
    // console.log(token)

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
        .set('Authorization', `bearer ${token}`)
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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
    
    const blogsInDB = await Blog.find({})
    blogsAtEnd = blogsInDB.map(note => note.toJSON())
    const resultBlog = blogsAtEnd.find(blog => blog.id === '5a422b891b54a676234d17fb')

    expect(resultBlog.likes).toEqual(0)
})

test('if blog does not contain title and url, return status 400 Bad request', async() => {
    const newBlog = {     
        _id: "5a422b891b54a676234d17fb", 
        author: "Max Power", 
        __v: 0 
    }

    await api 
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
})

test('blog can be deleted', async() => {

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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)

    const blogsInDBStart = await Blog.find({})
    const blogsAtStart = blogsInDBStart.map(note => note.toJSON())

    await api
        .delete('/api/blogs/5a422b891b54a676234d17fb')
        .set('Authorization', `bearer ${token}`)
        .expect(204)

    const blogsInDBEnd = await Blog.find({})
    const blogsAtEnd = blogsInDBEnd.map(note => note.toJSON())

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
})

test('blog is updated if new one is posted to used id', async() => {

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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)

    const updatedBlog = {     
        id: "5a422b891b54a676234d17fb", 
        title: "Testing is for Yous", 
        author: "Max Saver", 
        url: "https://failing.fi/", 
        likes: 10,
        __v: 0 
    }

    await api 
        .put('/api/blogs/5a422b891b54a676234d17fb')
        .send(updatedBlog)

    const allBlogs = await Blog.find({})
    const authors = allBlogs.map(blog => blog.author)
    expect(authors).toContain('Max Saver')
})

describe('test that password and username are valid', () => {
    test('cannot useinvalid username and get correct error', async () => {

        const testUser1 = {
            "username": "testaaja",
            "name": "Pekka Testaaja",
            "password": "sekret1"
        }

        await api 
            .post('/api/users')
            .send(testUser1)

        const testUser2 = {
            "username": "testaaja",
            "name": "Pekka Pestaaja",
            "password": "sekret2"
        }

        const result = await api 
            .post('/api/users')
            .send(testUser2)
            .expect(400)
        
        expect(result.body.error).toContain('`username` to be unique')
    }) 

    test('cannot use a invalid password and get correct error', async () => {

        const testUser = {
            "username": "testaaja",
            "name": "Pekka Testaaja",
            "password": "12"
        }

        const result = await api 
            .post('/api/users')
            .send(testUser)
            .expect(400)

        expect(result.body.error).toContain('password is too short or undefined')
    })

})

test('Get 401 if posting a blog without proper token', async () => {
    const testBlog = {     
        _id: "5a422b891b54a676234d17fb", 
        title: "Testing is for Pros", 
        author: "Max Power", 
        url: "https://testing.fi/", 
        likes: 4,
        __v: 0 
    }

    const result = await api 
        .post('/api/blogs')
        .set('Authorization', 'bearer tamaonvaaratoken1234')
        .send(testBlog)
        .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})
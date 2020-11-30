const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

const listWithAllBlogs = [ 
    {     
        _id: "5a422a851b54a676234d17f7", 
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7, 
        __v: 0 
    }, 
    { 
        _id: "5a422aa71b54a676234d17f8", 
        title: "Go To Statement Considered Harmful", 
        author: "Edsger W. Dijkstra", 
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
        likes: 5, 
        __v: 0 
    }, 
    { 
        _id: "5a422b3a1b54a676234d17f9", 
        title: "Canonical string reduction", 
        author: "Edsger W. Dijkstra", 
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
        likes: 12, 
        __v: 0 
    }, 
    { 
        _id: "5a422b891b54a676234d17fa", 
        title: "First class tests", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
        likes: 10, 
        __v: 0 
    }, 
    { 
        _id: "5a422ba71b54a676234d17fb", 
        title: "TDD harms architecture", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
        likes: 0,
        __v: 0 
    }, 
    { 
        _id: "5a422bc61b54a676234d17fc", 
        title: "Type wars", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
        likes: 2, 
        __v: 0 
    }
]

describe('total likes', () => { 
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has all blogs the equal is 36 likes', () => {
        expect(listHelper.totalLikes(listWithAllBlogs)).toBe(36)
    })

})

describe('return maximum likes', () => {
    test('when list has only one blog returns only item in the blog list', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })
    test('when list has multiple blogs, return the one with most likes (the one in index 2)', () => {
        expect(listHelper.favoriteBlog(listWithAllBlogs)).toEqual(listWithAllBlogs[2])
    })
})


describe('return author with most blogs', () => {
    test('if one item, return the only author and amount of blogs', () => {
        const compare1 = 
            {
                author: "Edsger W. Dijkstra",
                blogs: 1
            }
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(compare1)
    })
    test('if multiple blogs, return the first author with highest amount of blogs (2)', () => {
        const compare2 = 
            {
                author: "Robert C. Martin",
                blogs: 3
            }
        expect(listHelper.mostBlogs(listWithAllBlogs)).toEqual(compare2)
    })
})
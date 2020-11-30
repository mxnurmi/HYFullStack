// const { max } = require('lodash')
const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  const reduced = (sum, blogItem) => sum + blogItem.likes
  const result = blogs.reduce(reduced, 0)
  return result
} 

const favoriteBlog = (blogs) => {
  const reduced = (max, cur) => {
    return Math.max(max, cur)
  }
  likes = blogs.map(el => el.likes)
  maximum = likes.reduce(reduced, -Infinity)
  bestBlog = blogs.find(el => el.likes === maximum)
  return bestBlog
}

const mostBlogs = (blogs) => {

  blogAmounts = lodash.countBy(blogs, 'author')
  maximumBlogs = lodash.values(blogAmounts)
  maxBlog = lodash.max(maximumBlogs)
  
  // console.log(blogAmounts)
  // console.log(maximumBlogs)
  // console.log(maxBlog)

  for (const [key,value] of Object.entries(blogAmounts)) {
    if(value === maxBlog) {
      // console.log(key, value)
      return {'author': key, 'blogs': value}
    }
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
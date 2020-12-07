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

  for (const [key,value] of Object.entries(blogAmounts)) {
    if(value === maxBlog) {
      return {'author': key, 'blogs': value}
    }
  }

}

const mostLikes = (blogs) => {
  var likes = []
  allAuthors = blogs.map(el => el.author) 
  uniqAuthors = lodash.uniq(allAuthors)
  
  for(i in uniqAuthors) {
    const author = lodash.filter(blogs, ['author', uniqAuthors[i]])
    const totalLikes = lodash.sumBy(author, 'likes')
    x = {'author': uniqAuthors[i], 'likes': totalLikes}
    likes.push(x)
  }
  returnable = lodash.maxBy(likes, 'likes')
  return(returnable)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
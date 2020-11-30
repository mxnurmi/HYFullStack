const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  const reducer = (sum, blogItem) => sum + blogItem.likes

  return blogs.reduce(reducer, 0)
} 

const favoriteBlog = (blogs) => {
  const reducer = (max, cur) => Math.max(max, cur)
  likes = blogs.map(el => el.likes)
  maximum = likes.reduce(reducer, -Infinity)
  bestBlog = blogs.find(el => el.likes === maximum)
  console.log(bestBlog)
  return bestBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
import React from 'react'

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blog

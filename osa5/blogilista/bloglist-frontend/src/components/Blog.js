import React, {useState} from 'react'
import blogService from '../services/blogs'

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }


const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {

  const [infoVisible, setInfoVisible] = useState(false)
  // const [blog, setBlog] = useState(inputBlog)
  const showWhenTrue = { display: infoVisible ? '' : 'none' }
  const showWhenFalse = { display: infoVisible ? 'none' : '' }
  const [blogLike, setLike] = useState(blog.likes)

  const handleLike = async (blog) => { //tää pitäis ehkä toteuttaa ylempänä?
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blogLike + 1
    }

    const response = await blogService.put(blog.id, updatedBlog)
    setLike(response.likes)
  }

  return (
    <div style={blogStyle}>
      <div style={showWhenFalse}>
        {blog.title} {blog.author} <button onClick={() => setInfoVisible(!infoVisible)}>view</button>
      </div>
      <div style={showWhenTrue}>
        <div>{blog.title} {blog.author} <button onClick={() => setInfoVisible(!infoVisible)}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blogLike} <button onClick={() => handleLike(blog)}>like</button> </div> 
        <div>{blog.user.username}</div>
      </div>
    </div>
  )
}

export default Blog

import React, {useState} from 'react'
// import blogService from '../services/blogs'

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

const Blog = ({ blog, likeBlog }) => {

  const [infoVisible, setInfoVisible] = useState(false)
  const showWhenTrue = { display: infoVisible ? '' : 'none' }
  const showWhenFalse = { display: infoVisible ? 'none' : '' }

  return (
    <div style={blogStyle}>
      <div style={showWhenFalse}>
        {blog.title} {blog.author} <button onClick={() => setInfoVisible(!infoVisible)}>view</button>
      </div>
      <div style={showWhenTrue}>
        <div>{blog.title} {blog.author} <button onClick={() => setInfoVisible(!infoVisible)}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={likeBlog(blog.id)}>like</button> </div> 
        <div>{blog.user.username}</div>
      </div>
    </div>
  )
}

export default Blog

import React, { useState } from 'react'
import PropTypes from 'prop-types'
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

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  const [infoVisible, setInfoVisible] = useState(false)
  const showWhenTrue = { display: infoVisible ? '' : 'none' }
  const showWhenFalse = { display: infoVisible ? 'none' : '' }
  const userExists = { display: user.username === blog.user.username ? '' : 'none' }

  return (
    <div style={blogStyle} className='blog'>
      <div style={showWhenFalse}>
        {blog.title} {blog.author} <button id='view' onClick={() => setInfoVisible(!infoVisible)}>view</button>
      </div>
      <div style={showWhenTrue}>
        <div id='info'> {blog.title} {blog.author} <button onClick={() => setInfoVisible(!infoVisible)}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button id='Like' onClick={likeBlog(blog.id)}>Like</button> </div>
        <div>{blog.user.username}</div>
        <div style={userExists}> <button onClick={deleteBlog(blog.id)}>delete</button> </div>

      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog

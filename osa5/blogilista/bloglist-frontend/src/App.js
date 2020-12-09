import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'


const MapBlogs = ({ blogs, likeBlog, deleteBlog, user }) => {
  return(
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationClass, setNotificationClass] = useState(null)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 

    } catch (exception) {
      setNotification('bad username or password')
      setNotificationClass("bad")
      
      setTimeout(() => {
        setNotification(null)
        setNotificationClass(null)
      }, 5000)
    }
  }

  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <div className={notificationClass}>{notification}</div>
      <form onSubmit={handleLogin}>
        <div>
          username 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>      
  )

  const createBlog = async (blogObject) => { 
    blogService.setToken(user.token)
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))

    setNotification(`a new blog '${blogObject.title}' by ${blogObject.author} added`)
    setNotificationClass("good")

    blogFormRef.current.toggleVisibility()

    setTimeout(() => {
      setNotification(null)
      setNotificationClass(null)
    }, 5000)
  }

  const deleteBlog = (id) => async () => {
    blogService.setToken(user.token)
    const blog = blogs.find(blog => blog.id === id)

    if (window.confirm(`Are you sure you want to delete blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(el => el.id !== blog.id))
    }

  }

  const likeBlog = (id) => async () => {
    const blog = blogs.find(blog => blog.id === id)

    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user
    }

    const response = await blogService.put(id, newBlog)
    // console.log(response)
    const results = blogs.map(blog => blog.id !== response.id ? blog : newBlog)
    const sortedBlogs = results.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)

  }

  const blogForm = () => {
    return(
        <div>
          <h2>Blogs</h2>
          <div className={notificationClass}>{notification}</div>
          <p> {user.username} logged in {<button onClick={handleClick}>logout</button>}</p>
          <Toggleable buttonLabel="Post blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Toggleable>
          {/* <button onClick={() => sortBlogs()}> Sort </button> */}
          <MapBlogs blogs={blogs} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user}/>
        </div>
      )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // blogService.setToken(user.token)
    }
  }, [])

  return(
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App
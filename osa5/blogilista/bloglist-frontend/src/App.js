import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationClass, setNotificationClass] = useState(null)

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

  // const addBlog = async (event) => {
  //   event.preventDefault()

  //   blogService.setToken(user.token)

  //   const blogObject = {
  //     title: title,
  //     author: author,
  //     url: url
  //   }

  //   const response = await blogService.create(blogObject)
  //   setBlogs(blogs.concat(response))

  //   setNotification(`a new blog '${title}' by ${author} added`)
  //   setNotificationClass("good")

  //   setTimeout(() => {
  //     setNotification(null)
  //     setNotificationClass(null)
  //   }, 5000)

  //   setTitle('')
  //   setAuthor('')
  //   setUrl('')
  // }

  const createBlog = async (blogObject) => { 
    blogService.setToken(user.token)
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))

    setNotification(`a new blog '${blogObject.title}' by ${blogObject.author} added`)
    setNotificationClass("good")

    setTimeout(() => {
      setNotification(null)
      setNotificationClass(null)
    }, 5000)
  }

  const blogForm = () => {
    return(
        <div>
          <h2>Blogs</h2>
          <div className={notificationClass}>{notification}</div>
          <p> {user.username} logged in {<button onClick={handleClick}>logout</button>}</p>
          <Toggleable buttonLabel="Post blog">
            <BlogForm createBlog={createBlog}/>
          </Toggleable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )
    }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
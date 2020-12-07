import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

// const AllBlogs = blogs => {
//   console.log(blogs)
//   return (
//     <div>
//       <h2>blogs</h2>
//       {blogs.map(blog =>
//         <Blog key={blog.id} blog={blog} />
//       )}
//     </div>
//   )
// }

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const addBlog = async (event) => {
    event.preventDefault()

    blogService.setToken(user.token)

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))

    setNotification(`a new blog '${title}' by ${author} added`)
    setNotificationClass("good")

    setTimeout(() => {
      setNotification(null)
      setNotificationClass(null)
    }, 5000)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <div className={notificationClass}>{notification}</div>
      <p> {user.username} logged in {<button onClick={handleClick}>logout</button>}</p>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title 
            <input 
            type="text" 
            value={title} 
            name="Title" 
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author 
            <input 
            type="text" 
            value={author} 
            name="Author" 
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url 
            <input 
            type="text" 
            value={url} 
            name="URL" 
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

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
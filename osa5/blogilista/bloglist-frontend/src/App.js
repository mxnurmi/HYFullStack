import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
  const [user, setUser] = useState(null)

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
      console.log(exception)
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
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

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
  <p> {user.username} logged in {<button onClick={handleClick}>logout</button>}</p>

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
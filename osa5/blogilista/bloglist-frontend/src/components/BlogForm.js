import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        createBlog({
          title: title,
          author: author,
          url: url
        })
    
        setTitle('')
        setAuthor('')
        setUrl('')
      }

    return (
        <div>
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
        </div>
        )
    }

export default BlogForm
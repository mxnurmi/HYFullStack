import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAne = (event) => {
        event.preventDefault()
        const content = event.target.ane.value
        event.target.ane.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAne}>
                <div><input name="ane" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote
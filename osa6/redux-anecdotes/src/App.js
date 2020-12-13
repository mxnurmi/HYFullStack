import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  // const vote = (id) => {
  //   console.log('vote', id)
  // }

  const addAne = (event) => {
    event.preventDefault()
    event.preventDefault()
    const content = event.target.ane.value
    event.target.ane.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAne}>
        <div><input name="ane" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
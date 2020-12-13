import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { voteAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/anecdoteForm'
import Anecdotes from './components/anecdoteList'

const App = () => {
  // const vote = (id) => {
  //   console.log('vote', id)
  // }

  return (
    <div>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App
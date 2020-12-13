import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { voteAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/anecdoteForm'
import Anecdotes from './components/anecdoteList'
import Notification from './components/Notification'

const App = () => {
  // const vote = (id) => {
  //   console.log('vote', id)
  // }

  return (
    <div>
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App
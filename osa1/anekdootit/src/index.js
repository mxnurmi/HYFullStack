import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = (max) => {
    const value = Math.floor(Math.random() * Math.floor(max))
    return (value);
  }

const Button = ({ handleClick, text }) => (

        <button onClick={handleClick}>
        {text}
        </button>
)



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))
  const isoin = Math.max(...points)

  const UpdateArray = () => {
     const clone = [...points]
     clone[selected] += 1
     setPoints(clone)
    }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <Button handleClick={() => setSelected(getRandomInt(6))} text='next anecdote' />
        <Button handleClick={() => UpdateArray()} text='vote' /> 
      </div>
    <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[points.indexOf(isoin)]}</div>
      <div>has {isoin} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
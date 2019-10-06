import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { constants } from 'fs';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
    {text}
    </button>
)

const Header = ({ text }) => <h1>{text}</h1>

const Value = ({ text, value}) => <div><p1>{text} {value}</p1></div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const feedback = 'give feedback'
  const stats = 'statistics'

  return (
    <div>
      <Header text={feedback} />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text={stats} />
      <Value text='good' value={good} />
      <Value text='neutral' value={neutral} />
      <Value text='bad' value={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
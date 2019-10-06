import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { constants } from 'fs';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
    {text}
    </button>
)

const Header = ({ text }) => <h1>{text}</h1>

const Value = ({ text, value, text2}) => <div>{text} {value} {text2}</div>

const Statistics = ({good, neutral, bad}) => {

    const all = () => good + neutral + bad
    const avg = () => (good + bad*(-1)) / all()
    const pos = () => (good / all())*100

    if (all() === 0) {
        return (
          <div>
            No feedback given
          </div>
        )
      }

    return (
        <div>
            <Value text='good' value={good} />
            <Value text='neutral' value={neutral} />
            <Value text='bad' value={bad} />
            <Value text='all' value={all()} />
            <Value text='average' value={avg()} />
            <Value text='positive' value={pos()} text2='%' />
        </div>
    )
  }

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
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
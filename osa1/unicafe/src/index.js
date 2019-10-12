import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { constants } from 'fs';

const Header = ({ text }) => <h1>{text}</h1>

const Value = ({ text, value }) => <tbody><tr><td>{text}</td><td>{value}</td></tr></tbody>

const Statistics = ({text, value}) => {
    return (
            <Value text={text} value={value}/>
    )
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
    {text}
    </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = () => good + neutral + bad
  const avg = () => (good + bad*(-1)) / all()
  const pos = () => (good / all())*100

  const feedback = 'give feedback'
  const stats = 'statistics'

  if (all() === 0) {
    return (
      <div>
      <Header text={feedback} />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text={stats} />
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <Header text={feedback} />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text={stats} /> 
      <table>
        <Statistics text='good' value={good} />
        <Statistics text='neutral' value={neutral} />
        <Statistics text='bad' value={bad} />
        <Statistics text='all' value={all()}/>
        <Statistics text='average' value={avg() } />
        <Statistics text='positive' value={pos().toString()+ ' %'} />
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
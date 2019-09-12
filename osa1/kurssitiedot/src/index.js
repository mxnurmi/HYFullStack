import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
    <div> 
        <h1> {props.course} </h1>
    </div>
    )
}

const Part = (props) => {
    return (
    <div> 
        <p>
        {props.part} {props.exercise}
        </p>
    </div>
    )
}

const Content = (props) => {
    return (
    <div> 
        <Part part={props.part1} exercise={props.exercise1} />
        <Part part={props.part2} exercise={props.exercise2} />
        <Part part={props.part3} exercise={props.exercise3} />
    </div>
    )
}

const Total = (props) => {
    return (
    <div> 
        <p>
        Number of exercises {props.ex1 + props.ex2 + props.ex3}
        </p>
    </div>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercise1={exercises1} part2={part2} exercise2={exercises2} part3={part3} exercise3={exercises3} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

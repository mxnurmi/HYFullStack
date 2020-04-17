import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((s, p) => 
      s + p.exercises, 
      0
    )
  
    return(
      <b>Total of exercises {sum}</b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <>
        {course.parts.map(parts =>
          <Part key={parts.id} part={parts} />
        )}
      </>
    )
  }
  
  const Course = ( {courses} ) => {
    return( 
      <div>
        {courses.map(course => 
          <div key={course.id} >
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        )}
      </div>
    )
  }

export default Course
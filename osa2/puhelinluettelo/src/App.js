import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>{person.name}</div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    console.log(persons[0].name)
    
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const noteObject = {
        name: newName
      }
      console.log(noteObject)
      
      setPersons(persons.concat(noteObject))
      setNewName('')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) =>
        <Person key={person.name} person={person}/>
      )}
       
    </div>
  )
}

export default App
import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <>{person.name}</>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName
    }
  
    setPersons(persons.concat(noteObject))
    setNewName('')
  }

const handleChange = (event) => {
  setNewName(event.target.value)
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
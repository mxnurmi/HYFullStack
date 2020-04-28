import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ( {personsToShow} ) => (
  personsToShow.map((person, i) =>
    <Person key={person.name} person={person}/>
  )
)

const Filter = ( {filterName, handleChange}) => (
  <div>
    filter shown with <input type="text" value={filterName} onChange={handleChange} />
  </div>
)


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState ('')
  const [ filterName, setFilterName] = useState ('')

  const addNote = (event) => {
    event.preventDefault()
    console.log(persons[0].name)
    
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const noteObject = {
        name: newName,
        number: newNumber
      }
      console.log(noteObject)
      
      setPersons(persons.concat(noteObject))
      setNewName('')
    }
  
  }

  const personsToShow = filterName === ''
  ? persons
  : persons.filter(person => (person.name.toLowerCase()).includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleChange={(event) => setFilterName(event.target.value)} />
      <h2>add a new</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div> 
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />

    </div>
  )
}

export default App
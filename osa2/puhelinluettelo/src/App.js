import React, { useState, useEffect } from 'react'
import communicator from './services/persons'

const Person = ( {person, handleClick} ) => (
  <div>{person.name} {person.number} {<button onClick={handleClick(person.id)}>delete</button>} </div>
  )


const Persons = ( {personsToShow, handleClick} ) => (
  personsToShow.map((person, i) =>
  <div key={person.name}>
    <Person person={person} handleClick={handleClick} /> 
  </div>
  )
)

const Filter = ( {filterName, handleChange}) => (
  <div>
    filter shown with <input type="text" value={filterName} onChange={handleChange} />
  </div>
)


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState ('')
  const [ filterName, setFilterName] = useState ('')

  useEffect(() => {
    communicator
      .getPeople()
        .then(personnel => {
          setPersons(personnel)
      })
  }, [])

  const addNote = event => {
    event.preventDefault()
    
    if (persons.find(person => person.name === newName)) {
      console.log('already in book')
      
      const person = persons.find(person => person.name === newName)
      console.log(person)
      
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the phone number?`)) {
        
        const noteObject = {
          name: newName,
          number: newNumber
        }

        communicator
          .edit(person.id, noteObject)
            .then(response => {
              setPersons(persons.map(personnel => personnel.name !== newName ? personnel : response))
            })
      }
    } else {
      const noteObject = {
        name: newName,
        number: newNumber
      }
      communicator 
        .create(noteObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
        })
    }
  }

  const removePerson = (id) => () => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Are you sure you want to delete ${person.name}?`))
    communicator
      .remove(id)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.filter(personnel => personnel.id !== id))
        })

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

      <Persons personsToShow={personsToShow} handleClick={removePerson} />

    </div>
  )
}

export default App
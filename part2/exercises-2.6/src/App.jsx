import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  const handleButtonClick = (event) => {
    event.preventDefault()

    const nameExists = persons.some((person) => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`)
      return
    } else if (newName === '') {
      alert('Name cannot be empty')
      return
    }

    const PersonObject = {
      name: newName,
      phone: newNumber,
    }

    phonebookService
      .create(PersonObject)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))

    setNewName('') // Clear the input field after adding a new person
    setNewNumber('') // Clear the input field after adding a new person
  }

  const handleFilter = (event) => {
    const filter = event.target.value.toLowerCase()
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter)
    )
    setPersons(filteredPersons)
  }

  const handleDelete = (id, name) => {
    console.log('pressed delete', name)

    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.deleteObject(id).then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id)
        setPersons(updatedPersons)
      })
    } else {
      return
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search
        <input placeholder={'search'} onChange={handleFilter} />
      </div>
      <h2>add new</h2>
      <form>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          phone number:
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button onClick={handleButtonClick} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.phone}
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
      ))}
      ...
    </div>
  )
}

export default App

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    setPersons(persons.concat(PersonObject))
    setNewName('') // Clear the input field after adding a new person
    setNewNumber('') // Clear the input field after adding a new person
  }

  const handleFilter = (event) => {
    const filter = event.target.value.toLowerCase()
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter)
    )
    setPersons(filteredPersons);
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
        </div>
      ))}
      ...
    </div>
  )
}

export default App

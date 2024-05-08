import Note from "./components/Note";
import { useState, useEffect } from "react";
import axios from "axios";
import noteService from './services/notes'

const App = () => {

  const [ notes, setNotes ] = useState([]); // state is set to the initial array of notes
  const [ newNote, setNewNote ] = useState(''); // state is set to an empty string
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
  }

  // if we wanted it to be an empty array:
  // const [ notes, setNotes ] = useState([]);

  const addNote = (event) => {
    event.preventDefault(); // prevents the default action of submitting a form
    const noteObject = {
      content: newNote,
      id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input 
          placeholder={'add new note'}
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App

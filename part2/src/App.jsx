import Note from "./components/Note";
import { useState } from "react";

const App = (props) => {

  const [ notes, setNotes ] = useState(props.notes); // state is set to the initial array of notes
  const [ newNote, setNewNote ] = useState(''); // state is set to an empty string
  const [ showAll, setShowAll ] = useState(true);

  // if we wanted it to be an empty array:
  // const [ notes, setNotes ] = useState([]);

  const addNote = (event) => {
    event.preventDefault(); // prevents the default action of submitting a form
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject));
    setNewNote('');
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
          <Note key={note.id} note={note} />
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

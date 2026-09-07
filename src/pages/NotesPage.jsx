import NoteCard from '../components/NoteCard'
import { useNotes } from '../context/NoteContext'

const NotesPage = () => {
    const { notes, loading, addNote } = useNotes()

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <button
                onClick={addNote}
                style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
            >
                + New Note
            </button>
            {notes.map((note) => (
                <NoteCard note={note} key={note.id} />
            ))}
        </div>
    )
}

export default NotesPage
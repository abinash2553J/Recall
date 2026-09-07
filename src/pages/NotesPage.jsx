import NoteCard from '../components/NoteCard'
import Controls from '../components/Controls'
import { useNotes } from '../context/NoteContext'

const NotesPage = () => {
    const { notes, loading, setSelectedNote } = useNotes()

    if (loading) return <div>Loading...</div>

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setSelectedNote(null)
                }
            }}
            style={{ width: '100%', height: '100vh' }}
        >
            {notes.map((note) => (
                <NoteCard note={note} key={note.id} />
            ))}
            <Controls />
        </div>
    )
}

export default NotesPage
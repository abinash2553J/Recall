import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getNotes, createNote, updateNote, deleteNote } from '../notesAPI'
import colors from '../assets/colors.json'

const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedNote, setSelectedNote] = useState(null)
    const startingPos = useRef(10)

    useEffect(() => {
        getNotes()
            .then(setNotes)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const addNote = async () => {
        const payload = {
            body: JSON.stringify(''),
            colors: JSON.stringify(colors[0]),
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
        }

        startingPos.current += 10

        const created = await createNote(payload)
        setNotes((prev) => [created, ...prev])
    }

    const removeNote = async (id) => {
        await deleteNote(id)
        setNotes((prev) => prev.filter((n) => n.id !== id))
    }

    const saveNote = async (id, key, value) => {
        const payload = { [key]: JSON.stringify(value) }
        await updateNote(id, payload)
    }

    const changeNoteColor = async (color) => {
        if (!selectedNote) {
            alert('You must select a note before changing colors')
            return
        }

        const currentNoteIndex = notes.findIndex(
            (note) => note.id === selectedNote.id
        )
        if (currentNoteIndex === -1) return

        const updatedNote = {
            ...notes[currentNoteIndex],
            colors: JSON.stringify(color),
        }

        const newNotes = [...notes]
        newNotes[currentNoteIndex] = updatedNote
        setNotes(newNotes)

        try {
            await updateNote(selectedNote.id, { colors: JSON.stringify(color) })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <NoteContext.Provider
            value={{
                notes,
                loading,
                addNote,
                removeNote,
                saveNote,
                selectedNote,
                setSelectedNote,
                changeNoteColor,
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = () => useContext(NoteContext)
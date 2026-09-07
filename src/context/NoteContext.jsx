import { createContext, useContext, useEffect, useState } from 'react'
import { getNotes, createNote, updateNote, deleteNote } from '../notesAPI'

const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getNotes()
            .then(setNotes)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const addNote = async () => {
        const newNote = {
            body: JSON.stringify(''),
            colors: JSON.stringify({
                colorBody: '#fff9b1',
                colorHeader: '#fbe158',
                colorText: '#2b2b2b',
            }),
            position: JSON.stringify({ x: 50, y: 50 }),
        }
        const created = await createNote(newNote)
        setNotes((prev) => [...prev, created])
    }

    const removeNote = async (id) => {
        await deleteNote(id)
        setNotes((prev) => prev.filter((n) => n.id !== id))
    }

    const saveNote = async (id, key, value) => {
        const payload = { [key]: JSON.stringify(value) }
        await updateNote(id, payload)
    }

    return (
        <NoteContext.Provider
            value={{ notes, loading, addNote, removeNote, saveNote }}
        >
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = () => useContext(NoteContext)
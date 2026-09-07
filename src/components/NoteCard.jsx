import { useRef, useEffect, useState } from 'react'
import Spinner from '../icons/Spinner'
import { setNewOffset, autoGrow, setZIndex } from '../utils.js'
import { useNotes } from '../context/NoteContext'
import DeleteButton from './DeleteButton'

const NoteCard = ({ note }) => {
    const { saveNote } = useNotes()

    const body = JSON.parse(note.body)
    const [position, setPositon] = useState(JSON.parse(note.position))
    const colors = JSON.parse(note.colors)
    const textAreaRef = useRef(null)
    const [saving, setSaving] = useState(false)
    const timeoutRef = useRef(null)

    let mouseStartPos = { x: 0, y: 0 }
    const cardRef = useRef(null)

    useEffect(() => {
        autoGrow(textAreaRef)

        return () => {
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    const mouseDown = (e) => {
        if (e.target.className !== 'card-header') return

        setZIndex(cardRef.current)
        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }

    const mouseMove = (e) => {
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        }

        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)
        setPositon(newPosition)
    }

    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)

        if (!cardRef.current) return

        const finalPosition = {
            x: cardRef.current.offsetLeft,
            y: cardRef.current.offsetTop,
        }
        debounceSave('position', finalPosition)
    }

    const saveData = async (key, value) => {
        try {
            await saveNote(note.id, key, value)
            setSaving(false)
        } catch (error) {
            console.error(error)
        }
    }

    const debounceSave = (key, value) => {
        setSaving(true)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            saveData(key, value)
        }, 2000)
    }

    return (
        <div
            className="card"
            ref={cardRef}
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="card-header" style={{ backgroundColor: colors.colorHeader }} onMouseDown={mouseDown}>
                <DeleteButton noteId={note.id} />
                {saving && (
                    <div className="card-saving">
                        <Spinner color={colors.colorText} size="16" />
                        <span style={{ color: colors.colorText, fontSize: '12px' }}>Saving...</span>
                    </div>
                )}
            </div>
            <div className="card-body">
                <textarea
                    ref={textAreaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    onInput={() => autoGrow(textAreaRef)}
                    onKeyUp={() => {
                        debounceSave('body', textAreaRef.current.value)
                    }}
                ></textarea>
            </div>
        </div>
    )
}

export default NoteCard
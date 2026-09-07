import { useNotes } from '../context/NoteContext'

const Color = ({ color }) => {
    const { changeNoteColor } = useNotes()

    return (
        <div
            onClick={() => changeNoteColor(color)}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    )
}

export default Color
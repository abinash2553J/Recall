import Trash from "../icons/Trash";
import { useNotes } from "../context/NoteContext";

const DeleteButton = ({ noteId }) => {
    const { removeNote } = useNotes();

    const handleDelete = async () => {
        await removeNote(noteId);
    };

    return (
        <div onClick={handleDelete} style={{ cursor: "pointer" }}>
            <Trash />
        </div>
    );
};

export default DeleteButton;
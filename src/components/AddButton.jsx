import Plus from "../icons/Plus";
import { useNotes } from "../context/NoteContext";

const AddButton = () => {
    const { addNote } = useNotes();

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;
import { useRef, useEffect, useState } from 'react'
import Trash from '../icons/Trash'
import { setNewOffset, autoGrow, setZIndex } from '../utils.js'

const NoteCard = ({ note }) => {
    const body = JSON.parse(note.body);
    const [position, setPositon] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const textAreaRef = useRef(null);

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    const mouseDown = (e) => {
        setZIndex(cardRef.current);
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };

    const mouseMove = (e) => {
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

        //3 - Update card top and left position.
        setPositon(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    };


    return (
        <div className="card" ref={cardRef} style={{ backgroundColor: colors.colorBody, left: `${position.x}px`, top: `${position.y}px`, }}>
            <div className="card-header" style={{ backgroundColor: colors.colorHeader }} onMouseDown={mouseDown}>
                <Trash />
            </div>
            <div className="card-body">
                <textarea
                    ref={textAreaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                ></textarea>
        </div>
        </div >
    )
}

export default NoteCard
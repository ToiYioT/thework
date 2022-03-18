import React, { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

export default function TurnaroundExample(props) {

    const {
        example,
        handleChange,
        deleteExample,
        addExampleAfter,
    } = props;

    const textAreaRef = useRef();

    useEffect(() => {
        textAreaRef.current.focus();
    }, []);

    function keydownListener(event) {
        if (event.key === "Backspace" && textAreaRef.current.value.length == 0) {
            deleteExample(example.id);
            event.preventDefault();
        }
        if (event.key === "Enter") {
            addExampleAfter(example.id);
            event.preventDefault();
        }
    }

    return (
        <div className="turnaround-example-container" key={example.id}>
            <button
                className="delete-example-button"
                onClick={() => {
                    deleteExample(example.id)
                }}
            >
                X
            </button>
            <TextareaAutosize
                className='input-field example'
                defaultValue={example.example}
                onChange={(e) => handleChange({ example: e.target.value })}
                placeholder="Example"
                ref={textAreaRef}
                onKeyDown={keydownListener}
            />
        </div>)
}

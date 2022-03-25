import React, { useContext, useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { InquiryContext } from './App';

export default function TurnaroundExample(props) {

    const {
        example,
        handleChange,
        deleteExample,
        addExampleAfter,
        focusPreviousExample,

        innerRef,
        draggableProps,
        dragHandleProps
    } = props;

    const textAreaRef = useRef();

    const { focusedElementId, setFocusedElementId } = useContext(InquiryContext);


    useEffect(() => {
        if (focusedElementId.current === example.id) {
            textAreaRef.current.focus();
            textAreaRef.current.selectionStart = textAreaRef.current.value.length;
            setFocusedElementId(null);
        }
    });

    function keydownListener(event) {
        if (event.repeat) return;

        if (event.key === "Backspace" && textAreaRef.current.value.length == 0) {
            focusPreviousExample(example.id);
            deleteExample(example.id);

            event.preventDefault();
        }
        if (event.key === "Enter") {
            addExampleAfter(example.id);
            event.preventDefault();
        }
    }

    return (
        <div className="turnaround-example-container"
            key={example.id}
            ref={innerRef}
            {...draggableProps}
        >
            <div className="example-handle" tabIndex={-1} {...dragHandleProps}>
                O
            </div>
            <button
                className="delete-example-button"
                tabIndex={-1}
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

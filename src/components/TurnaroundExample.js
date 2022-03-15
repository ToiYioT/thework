import React, { useContext, useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { InquiryContext } from './App';

export default function TurnaroundExample({ example, handleChange, deleteExample }) {

    const textAreaRef = useRef();
    const {
        focusedElementId,
        setFocusedElementId } = useContext(InquiryContext);

    useEffect(() => {
        if (focusedElementId.current === example.id) {
            textAreaRef.current.focus();
            setFocusedElementId(null);
        }
    });

    return (
        <div className="turnaround-example-container" key={example.id}>
            <TextareaAutosize
                className='input-field example'
                defaultValue={example.example}
                onChange={(e) => handleChange({ example: e.target.value })}
                placeholder="Example"
                ref={textAreaRef}
            />
            <button
                className="delete-example-button"
                onClick={() => deleteExample(example.id)}
            >
                X
            </button>
        </div>)
}

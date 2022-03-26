import React, { useContext, useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { InquiryContext } from './App';
import { DotsVertical } from 'tabler-icons-react';
import { ActionIcon } from '@mantine/core';

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
            <ActionIcon
                className='icon-container'
                variant="hover"
                {...dragHandleProps}>

                <DotsVertical
                    className='icon'
                    color='grey'
                    size={20}
                />
            </ActionIcon>
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

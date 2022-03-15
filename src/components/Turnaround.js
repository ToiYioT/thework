import React, { useContext, useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { InquiryContext } from './App';
import DeleteButton from './DeleteButton'
import TurnaroundExample from './TurnaroundExample';

export default function Turnaround(props) {

    const {
        turnaround,
        deleteTurnaround,
        changeTurnaround,
    } = props;

    const textAreaRef = useRef();
    const {
        getNewExample,
        focusedElementId,
        setFocusedElementId } = useContext(InquiryContext);

    useEffect(() => {
        if (focusedElementId.current === turnaround.id) {
            textAreaRef.current.focus();
            setFocusedElementId(null);
        }
    });

    const examples = turnaround.examples.map(example => {

        function handleChange(change) {
            const newExample = { ...example, ...change }
            updateExample(example.id, newExample);
        }

        return <TurnaroundExample
            key={example.id}
            example={example}
            handleChange={handleChange}
            deleteExample={deleteExample}
        />
    });

    function updateTurnaround(change) {

        const newTurnaround = { ...turnaround, ...change };
        changeTurnaround(turnaround.id, newTurnaround);
    }

    function addExample() {
        const newExample = getNewExample();
        const newExamples = [...turnaround.examples, newExample];
        setFocusedElementId(newExample.id);

        updateTurnaround({ examples: newExamples });
    }

    function deleteExample(id) {
        const newExamples = turnaround.examples.filter(example => {
            return example.id !== id;
        })
        updateTurnaround({ examples: newExamples });
    }

    function updateExample(id, newExample) {
        const newExamples = turnaround.examples.map(example => {
            if (example.id === id) return newExample;
            return example;
        })
        updateTurnaround({ examples: newExamples });
    }


    return (
        <div className="turnaround-container">

            <div className="turnaround-title-container">
                <TextareaAutosize
                    className='question input-field'
                    defaultValue={turnaround.turnaround}
                    onChange={(e) => updateTurnaround({ turnaround: e.target.value })}
                    ref={textAreaRef}
                    placeholder="Turn that around.."
                />
                <DeleteButton onClick={() => deleteTurnaround(turnaround.id)} />
            </div>

            <div className="examples-container">

                {examples}
                <button
                    className='add-example-button'
                    onClick={addExample}
                >
                    +
                </button>
            </div>


        </div>
    )
}

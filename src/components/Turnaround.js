import React, { useContext } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { InquiryContext } from './App';
import DeleteButton from './DeleteButton'

export default function Turnaround(props) {

    const {
        turnaround,
        deleteTurnaround,
        changeTurnaround,
    } = props;

    const { getNewExample } = useContext(InquiryContext);

    const examples = turnaround.examples.map(example => {

        function handleChange(change) {
            const newExample = { ...example, ...change }
            updateExample(example.id, newExample);
        }

        return (
            <div className="turnaround-example-container" key={example.id}>
                <TextareaAutosize
                    className='input-field example'
                    defaultValue={example.example}
                    onChange={(e) => handleChange({ example: e.target.value })}
                />
                <button
                    className="delete-example-button"
                    onClick={() => deleteExample(example.id)}
                >
                    X
                </button>
            </div>)
    });

    function updateTurnaround(change) {

        const newTurnaround = { ...turnaround, ...change };
        changeTurnaround(turnaround.id, newTurnaround);
    }

    function addExample() {
        const newExamples = [...turnaround.examples, getNewExample()];
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

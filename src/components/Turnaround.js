import React from 'react'
import DeleteButton from './DeleteButton'

export default function Turnaround({ turnaround }) {

    const examples = turnaround.examples.map(example => {
        return (
            <div className="turnaround-example-container" key={example.id}>
                <textarea
                    className='answer input-field'
                    defaultValue={example.example}
                ></textarea>
            </div>)
    });

    return (
        <div className="turnaround-container">

            <div className="turnaround-title-container">
                <textarea
                    className='question input-field'
                    defaultValue={turnaround.turnaround}
                ></textarea>
                <DeleteButton />
            </div>

            {examples}

            <button
                className='button'
            >
                ADD EXAMPLE
            </button>

        </div>
    )
}

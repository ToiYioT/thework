
import React from 'react'

export default function Question({ title, answer }) {
    return (
        <div className="question-container">
            <div className="question">{title}</div>
            <input
                className='answer'
                type="text"
                defaultValue={answer}

            ></input>
        </div>
    )
}

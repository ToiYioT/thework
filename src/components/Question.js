
import React from 'react'

export default function Question({ title, answer, onChange }) {

    return (
        <div className="question-container">
            <div className="question">{title}</div>
            <textarea
                className='answer input-field'
                defaultValue={answer}
                onChange={onChange}
            ></textarea>
        </div>
    )
}

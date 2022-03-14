
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export default function Question({ title, answer, onChange }) {

    return (
        <div className="question-container">
            <div className="question">{title}</div>
            <TextareaAutosize
                className='answer input-field'
                defaultValue={answer}
                onChange={onChange}

            />
        </div>
    )
}

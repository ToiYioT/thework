
import React from 'react'
import Question from './Question';

export default function InquiryView(props) {
    const {
        thought,
        isThatTrue,
        areYouSure,
        howDoYouReact,
        whoWouldYouBe,
    } = props.inquiryData;

    return (
        <div className="inquiry-view-container">
            <div className="thought-container">
                <input
                    className='thought-title'
                    type="text"
                    defaultValue={thought}
                ></input>
            </div>

            <Question
                title="Is that true?"
                answer={isThatTrue}
            />
            <Question
                title="Are you absolutely sure that's true?"
                answer={areYouSure}

            />
            <Question
                title="How do you react when you have that thought?"
                answer={howDoYouReact}

            />
            <Question
                title="Who would you be without that thought?"
                answer={whoWouldYouBe}

            />
        </div>
    )
}

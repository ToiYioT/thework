
import React, { useContext, useEffect } from 'react'
import { InquiryContext } from './App';
import DeleteButton from './DeleteButton';
import Question from './Question';
import TurnaroundSection from './TurnaroundSection';

export default function InquiryView(props) {
    const {
        thought,
        isThatTrue,
        areYouSure,
        howDoYouReact,
        whoWouldYouBe,
    } = props.inquiryData;

    const { setInquiry, deleteInquiry } = useContext(InquiryContext);


    function updateInquiry(change) {
        const newInquiry = { ...props.inquiryData, ...change };
        setInquiry(props.inquiryData.id, newInquiry);
    }

    return (
        <div className="inquiry-view-container">
            <div className="thought-container">
                <textarea
                    className='thought-title'
                    defaultValue={thought}
                    onChange={e => updateInquiry({ thought: e.target.value })}
                ></textarea>

                <DeleteButton onClick={() => deleteInquiry(props.inquiryData.id)} />
            </div>

            <div className="questions-container">
                <Question
                    title="Is that true?"
                    answer={isThatTrue}
                    onChange={e => updateInquiry({ isThatTrue: e.target.value })}
                />
                <Question
                    title="Are you absolutely sure that's true?"
                    answer={areYouSure}
                    onChange={e => updateInquiry({ areYouSure: e.target.value })}
                />
                <Question
                    title="How do you react when you have that thought?"
                    answer={howDoYouReact}
                    onChange={e => updateInquiry({ howDoYouReact: e.target.value })}
                />
                <Question
                    title="Who would you be without that thought?"
                    answer={whoWouldYouBe}
                    onChange={e => updateInquiry({ whoWouldYouBe: e.target.value })}
                />
            </div>


            <TurnaroundSection
                updateInquiry={updateInquiry}
                turnaroundData={props.inquiryData.turnarounds} />
        </div>
    )
}

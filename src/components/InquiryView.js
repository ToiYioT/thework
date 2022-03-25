
import React, { useContext, useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import useTheWorkData from '../contexts/TheWorkContext';
import { InquiryContext } from './App';
import Question from './Question';
import TurnaroundSection from './TurnaroundSection';
import { Button } from '@mantine/core';

export default function InquiryView(props) {
    const {
        thought,
        isThatTrue,
        areYouSure,
        howDoYouReact,
        whoWouldYouBe,

    } = props.inquiryData;


    const {
        focusedElementId,
        setFocusedElementId } = useContext(InquiryContext);
    const { setInquiry } = useTheWorkData();
    const thoughtRef = useRef();
    const viewRef = useRef();

    useEffect(() => {
        if (focusedElementId.current === props.inquiryData.id) {
            thoughtRef.current.focus();
            setFocusedElementId(null);
        }
    });

    function updateInquiry(change) {
        const newInquiry = { ...props.inquiryData, ...change };
        setInquiry(props.inquiryData.id, newInquiry);
    }

    function handleCloseView() {
        viewRef.current.classList.toggle("close-animation");
        setTimeout(() => {
            props.closeView();
        }, 250);
    }

    return (
        <div className="inquiry-view-container" ref={viewRef}>
            <div className="thought-container">
                <TextareaAutosize
                    className='thought-title'
                    defaultValue={thought}
                    onChange={e => updateInquiry({ thought: e.target.value })}
                    ref={thoughtRef}
                    placeholder="Thought Appears.."
                />
                <Button
                    variant="gradient"
                    gradient={{ from: 'orange', to: 'red' }}
                    onClick={handleCloseView}
                >X</Button>
            </div>

            <div className="questions-container">
                <Question
                    title="Is that true?"
                    answer={isThatTrue}
                    onChange={e => updateInquiry({ isThatTrue: e.target.value })}
                    placeholder="What's the reality the situation?  Reality is what is in front of you.  Who's business is it?  Can I really know what's best?"
                />
                <Question
                    title="Are you absolutely sure that's true?"
                    answer={areYouSure}
                    onChange={e => updateInquiry({ areYouSure: e.target.value })}
                    placeholder="Do you really know that you feel hurt because of that? Might it be possible that you'd feel differently with the same situation?"
                />
                <Question
                    title="How do you react when you have that thought?"
                    answer={howDoYouReact}
                    onChange={e => updateInquiry({ howDoYouReact: e.target.value })}
                    placeholder="Can you find one peaceful reason to keep the thought?"
                />
                <Question
                    title="Who would you be without that thought?"
                    answer={whoWouldYouBe}
                    onChange={e => updateInquiry({ whoWouldYouBe: e.target.value })}
                    placeholder="Close your eyes. How do you feel about the situation without your story?
Which do you prefer? Which feels kinder?"
                />
            </div>


            <TurnaroundSection
                updateInquiry={updateInquiry}
                turnaroundData={props.inquiryData.turnarounds} />
        </div>
    )
}

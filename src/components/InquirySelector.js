
import React, { useContext } from 'react'
import { InquiryContext } from './App'
import InquiryCard from './InquiryCard'

export default function InquirySelector({ allInquiries }) {

    const { addInquiry } = useContext(InquiryContext);

    return (
        <div className="inquiry-selector-container">
            {
                allInquiries.map(inquiry => {
                    return <InquiryCard
                        thought={inquiry.thought}
                        key={inquiry.id}
                    />
                })
            }
            <button
                className='button'
                onClick={() => addInquiry()}
            >NEW INQUIRY</button>
        </div>
    )
}

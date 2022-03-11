
import React, { useContext } from 'react'
import { InquiryContext } from './App'

export default function InquiryCard({ inquiry }) {

    const { handleSetSelectedInquiryId } = useContext(InquiryContext);

    return (
        <div
            className="inquiry-card-container"
            onClick={() => handleSetSelectedInquiryId(inquiry.id)}
        >
            <div className="inquiry-card-thought-container">
                {inquiry.thought}
            </div>
        </div>
    )
}


import React, { useContext } from 'react'
import { InquiryContext } from './App'


export default function InquiryCard({ inquiry }) {

    const {
        handleSetSelectedInquiryId,
        selectedInquiryId } = useContext(InquiryContext);

    const selectedCard = inquiry.id === selectedInquiryId;

    return (
        <div
            className={selectedCard ? "inquiry-card-container selected-card"
                : "inquiry-card-container"}
            onClick={() => handleSetSelectedInquiryId(inquiry.id)}
        >
            <div className="inquiry-card-thought-container"
                placeholder='Empty'
            >
                {inquiry.thought}
            </div>
        </div>
    )
}

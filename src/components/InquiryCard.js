
import React, { useContext } from 'react'
import useTheWorkData from '../contexts/TheWorkContext';
import { InquiryContext } from './App'
import DeleteButton from './DeleteButton';


export default function InquiryCard({ inquiry }) {

    const {
        handleSetSelectedInquiryId,
        selectedInquiryId } = useContext(InquiryContext);
    const { deleteInquiry } = useTheWorkData();

    const selectedCard = inquiry.id === selectedInquiryId;

    return (
        <div
            className={selectedCard ? "inquiry-card-container selected-card"
                : "inquiry-card-container"}
            onClick={() => handleSetSelectedInquiryId(inquiry.id)}
        >
            <div className="inquiry-card-thought-container"
            >
                {inquiry.thought.length > 0 && inquiry.thought}
                {inquiry.thought.length == 0 && "No Title"}
            </div>

            <DeleteButton onClick={() => deleteInquiry(inquiry.id)} />
        </div>
    )
}

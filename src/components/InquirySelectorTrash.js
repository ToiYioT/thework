
import React from 'react'
import useTheWorkData from '../contexts/TheWorkContext'
import InquiryCardTrash from './InquiryCardTrash';

export default function InquirySelectorTrash() {

    const { data } = useTheWorkData();

    const filteredInquiries = data.slice(0).reverse().map(inquiry => {

        if (inquiry.deleted) {
            return <InquiryCardTrash
                inquiry={inquiry}
                key={inquiry.id}
            />
        }
    });

    return (
        <div className="inquiry-selector-container">
            {filteredInquiries}
        </div>
    )
}

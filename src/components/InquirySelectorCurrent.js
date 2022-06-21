
import React, { useContext, useRef, useState } from 'react'
import { InquiryContext } from './App'
import useTheWorkData from '../contexts/TheWorkContext';
import InquiryCard from './InquiryCard'
import { Button } from '@mantine/core';

export default function InquirySelectorCurrent() {

    const { setFocusedElementId,
        handleSetSelectedInquiryId
    } = useContext(InquiryContext);
    const { addInquiry, getNewInquiry, data } = useTheWorkData();


    const filteredInquiries = data.slice(0).reverse().map(inquiry => {

        if (!inquiry.deleted && !inquiry.archived) {
            return <InquiryCard
                inquiry={inquiry}
                key={inquiry.id}
            />
        }
    });

    function handleAddInquiry() {
        const newInquiry = getNewInquiry();
        setFocusedElementId(newInquiry.id);
        handleSetSelectedInquiryId(newInquiry.id);
        addInquiry(newInquiry);
    }

    return (
        <>
            <Button
                // className='add-inquiry-button'
                radius={'xl'}
                onClick={handleAddInquiry} >
                Add New
            </Button>
            <div className="inquiry-selector-container">
                {filteredInquiries}
            </div>

        </>
    )
}

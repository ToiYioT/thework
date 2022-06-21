
import React, { useContext } from 'react'
import useTheWorkData from '../contexts/TheWorkContext';
import { InquiryContext } from './App'
import DeleteButton from './DeleteButton';

import { Star, Trash } from 'tabler-icons-react';
import { Menu } from '@mantine/core';

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



            <div className="inquiry-card-buttons-container">
                {/* <Star
                    className='icon'
                    size={20}
                    color="grey"
                    tabIndex={-1}
                /> */}
                <Menu onClick={(e) => e.stopPropagation()}>
                    <Menu.Item
                        color="red"
                        icon={<Trash size={14} />}
                        onClick={() => deleteInquiry(inquiry.id)}
                    >Delete</Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

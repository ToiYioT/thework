import React, { useContext } from 'react'
import useTheWorkData from '../contexts/TheWorkContext';
import { InquiryContext } from './App'

import { Archive, Trash } from 'tabler-icons-react';
import { Menu } from '@mantine/core';

export default function InquiryCardArchive({ inquiry }) {

    const { handleSetSelectedInquiryId, } = useContext(InquiryContext);
    const { setInquiry } = useTheWorkData();

    return (
        <div
            className={inquiry.turnarounds.length === 0
                ? "inquiry-card-container empty-inquiry"
                : "inquiry-card-container"}
            onClick={() => handleSetSelectedInquiryId(inquiry.id)}
        >
            <div className="inquiry-card-thought-container"
            >
                {inquiry.thought.length > 0 && inquiry.thought}
                {inquiry.thought.length == 0 && "No Title"}
            </div>



            <div className="inquiry-card-buttons-container">
                <Menu onClick={(e) => e.stopPropagation()}>
                    <Menu.Item
                        icon={<Archive size={14} />}
                        onClick={() => setInquiry(inquiry.id, { ...inquiry, ...{ archived: false } })}
                    >Unarchive</Menu.Item>
                    <Menu.Item
                        color="red"
                        icon={<Trash size={14} />}
                        onClick={() => setInquiry(inquiry.id, { ...inquiry, ...{ deleted: true } })}
                    >Trash</Menu.Item>
                </Menu>
            </div>
        </div >
    )
}
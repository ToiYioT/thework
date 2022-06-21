
import { Button, Tabs } from '@mantine/core';
import React, { useContext, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { MoodCrazyHappy, Trash } from 'tabler-icons-react';
import useTheWorkData from '../contexts/TheWorkContext';
import { InquiryContext } from './App'
import InquiryCard from './InquiryCard'
import InquirySelectorCurrent from './InquirySelectorCurrent';
import InquirySelectorTrash from './InquirySelectorTrash';

export default function InquirySelector() {

    const [activeTab, setActiveTab] = useState(0);

    const { setFocusedElementId,
        handleSetSelectedInquiryId
    } = useContext(InquiryContext);
    const { addInquiry, getNewInquiry, data } = useTheWorkData();

    const [filterText, setFilterText] = useState("");
    const searchBarRef = useRef();

    const filteredInquiries = data.slice(0).reverse().map(inquiry => {

        if (inquiry.thought.includes(filterText) && tabFilterConditions(inquiry, activeTab)) {
            return <InquiryCard
                inquiry={inquiry}
                key={inquiry.id}
                tab={activeTab}
            />
        }
    });
    const noMatch = filteredInquiries.every(undefindeTest) &&
        data.length > 0;


    return (
        <div className="side-bar-container">

            <Tabs active={activeTab} onTabChange={setActiveTab}>
                <Tabs.Tab label="Current" icon={<MoodCrazyHappy size={18} />}>
                    <InquirySelectorCurrent />
                </Tabs.Tab>

                <Tabs.Tab label="Archived"
                    icon={<Trash size={14} />}
                >

                    <div className="search-bar-container">
                        <div>Filter</div>
                        <TextareaAutosize
                            onChange={e => setFilterText(e.target.value)}
                            ref={searchBarRef}
                            className="filter-field"
                        />
                    </div>

                </Tabs.Tab>
                <Tabs.Tab label="Trash"
                    icon={<Trash size={18} />}
                >
                    <InquirySelectorTrash />
                </Tabs.Tab>
            </Tabs>


            {/* <div className="inquiry-selector-container">
                {noMatch ? <div className="no-results-container">Nothing here...</div>
                    : filteredInquiries
                }
            </div> */}

        </div>
    )
}

function undefindeTest(element) {
    return element === undefined;
}


function tabFilterConditions(inquiry, tabNumber) {
    if (tabNumber == 0) {
        return !inquiry.deleted && !inquiry.archived;

    } else if (tabNumber == 1) {
        return inquiry.archived && !inquiry.deleted;

    } else if (tabNumber == 2) {
        return inquiry.deleted;
    }
}
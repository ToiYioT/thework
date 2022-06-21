import React, { useRef, useState } from 'react'
import useTheWorkData from '../contexts/TheWorkContext'
import InquiryCardArchive from './InquiryCardArchive';
import TextareaAutosize from 'react-textarea-autosize'

export default function InquirySelectorArchive() {

    const { data } = useTheWorkData();

    const [filterText, setFilterText] = useState("");
    const searchBarRef = useRef();

    const filteredInquiries = data.slice(0).reverse().map(inquiry => {

        if (!inquiry.deleted && inquiry.archived && inquiry.thought.includes(filterText)) {
            return <InquiryCardArchive
                inquiry={inquiry}
                key={inquiry.id}
            />
        }
    });

    const noMatch = filteredInquiries.every(undefindeTest) &&
        data.length > 0;

    return (
        <>
            <div className="search-bar-container">
                <div>Filter</div>
                <TextareaAutosize
                    onChange={e => setFilterText(e.target.value)}
                    ref={searchBarRef}
                    className="filter-field"
                />
            </div>
            <div className="inquiry-selector-container">
                {noMatch ? <div className="no-results-container">Nothing here...</div>
                    : filteredInquiries
                }
            </div>
        </>
    )
}

function undefindeTest(element) {
    return element === undefined;
}
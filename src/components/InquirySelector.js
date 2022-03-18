
import React, { useContext, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { InquiryContext } from './App'
import InquiryCard from './InquiryCard'

export default function InquirySelector({ allInquiries }) {

    const { addInquiry,
        getNewInquiry,
        setFocusedElementId } = useContext(InquiryContext);

    const [filterText, setFilterText] = useState("");
    const searchBarRef = useRef();

    const filteredInquiries = allInquiries.slice(0).reverse().map(inquiry => {

        if (inquiry.thought.includes(filterText)) {
            return <InquiryCard
                inquiry={inquiry}
                key={inquiry.id}
            />
        }
    });
    const noMatch = filteredInquiries.every(undefindeTest);

    function handleAddInquiry() {
        const newInquiry = getNewInquiry();
        setFocusedElementId(newInquiry.id);
        addInquiry(newInquiry);

        searchBarRef.current.value = "";
        setFilterText("");
    }


    return (
        <div className="side-bar-container">

            <div className="search-bar-container">
                <div>Filter</div>
                <TextareaAutosize
                    onChange={e => setFilterText(e.target.value)}
                    ref={searchBarRef}
                />
            </div>

            <div className="inquiry-selector-container">
                {noMatch ? <div className="inquiry-card-container">NO MATCH</div>
                    : filteredInquiries
                }
            </div>
            <button
                className='add-turnaround-button'
                onClick={handleAddInquiry}
            >NEW INQUIRY</button>

        </div>
    )
}

function undefindeTest(element) {
    return element === undefined;
}


import React, { useContext, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import useTheWorkData from '../contexts/TheWorkContext';
import { InquiryContext } from './App'
import InquiryCard from './InquiryCard'

export default function InquirySelector() {

    const { setFocusedElementId,
        handleSetSelectedInquiryId
    } = useContext(InquiryContext);
    const { addInquiry, getNewInquiry, data } = useTheWorkData();

    const [filterText, setFilterText] = useState("");
    const searchBarRef = useRef();

    const filteredInquiries = data.slice(0).reverse().map(inquiry => {

        if (inquiry.thought.includes(filterText)) {
            return <InquiryCard
                inquiry={inquiry}
                key={inquiry.id}
            />
        }
    });
    const noMatch = filteredInquiries.every(undefindeTest) &&
        data.length > 0;

    function handleAddInquiry() {
        const newInquiry = getNewInquiry();
        setFocusedElementId(newInquiry.id);
        handleSetSelectedInquiryId(newInquiry.id);
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
                    className="filter-field"
                />
            </div>
            <button
                className='add-inquiry-button'
                onClick={handleAddInquiry}
            >ADD INQUIRY</button>

            <div className="inquiry-selector-container">
                {noMatch ? <div className="inquiry-card-container">NO MATCH</div>
                    : filteredInquiries
                }
            </div>

        </div>
    )
}

function undefindeTest(element) {
    return element === undefined;
}

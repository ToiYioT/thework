
import React, { useContext } from 'react'
import { InquiryContext } from './App'
import InquiryCard from './InquiryCard'

export default function InquirySelector({ allInquiries }) {

    const { addInquiry } = useContext(InquiryContext);

    return (
        <div className="side-bar-container">

            <div className="search-bar-container">
                <div>Filter</div>
                <input>

                </input>
            </div>

            <div className="inquiry-selector-container">
                {
                    allInquiries.map(inquiry => {
                        return <InquiryCard
                            inquiry={inquiry}
                            key={inquiry.id}
                        />
                    })
                }
            </div>
            <button
                className='add-turnaround-button'
                onClick={() => addInquiry()}
            >NEW INQUIRY</button>

        </div>
    )
}

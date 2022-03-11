
import React from 'react'

export default function InquiryCard({ thought }) {
    return (
        <div className="inquiry-card-container">
            <div className="inquiry-card-thought-container">
                {thought}
            </div>
        </div>
    )
}

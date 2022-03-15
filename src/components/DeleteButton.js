import React, { useContext } from 'react'
import { InquiryContext } from './App'

export default function DeleteButton({ onClick }) {

    const { saveUndoHistory } = useContext(InquiryContext);

    function handleClick() {
        saveUndoHistory();
        onClick();
    }

    return (
        <button
            className='delete-button'
            onClick={handleClick}
        >
            DELETE
        </button>
    )
}

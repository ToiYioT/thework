import React from 'react'

export default function DeleteButton({ onClick }) {
    return (
        <button
            className='delete-button'
            onClick={onClick}
        >
            DELETE
        </button>
    )
}

import React, { useContext } from 'react'
import { InquiryContext } from './App'
import { ActionIcon } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

export default function DeleteButton({ onClick }) {

    const { saveUndoHistory } = useContext(InquiryContext);

    function handleClick() {
        saveUndoHistory();
        onClick();
    }

    return (
        <ActionIcon
            className='delete-icon-container'
            variant="default"
            size="lg">
            <Trash
                className='icon'
                size={20}
                color="red"
                tabIndex={-1}
                onClick={handleClick} />
        </ActionIcon>
    )
}

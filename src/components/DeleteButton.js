import React from 'react'
import { ActionIcon } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

export default function DeleteButton({ onClick }) {

    function handleClick() {
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

import React from 'react'
import { ActionIcon } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import useLongPress from '../hooks/useLongPress';
import { logDOM } from '@testing-library/react';

export default function DeleteButton({ onClick }) {

    function onLongPress() {
        onClick();
    }

    const longPressEvent = useLongPress(onLongPress, () => null);

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
                {...longPressEvent}
                onClick={(e) => e.stopPropagation()}
            />
        </ActionIcon>
    )
}

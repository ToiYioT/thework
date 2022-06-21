
import { Tabs } from '@mantine/core';
import React, { useState } from 'react'
import { Archive, MoodCrazyHappy, Trash } from 'tabler-icons-react';
import InquirySelectorArchive from './InquirySelectorArchive';
import InquirySelectorCurrent from './InquirySelectorCurrent';
import InquirySelectorTrash from './InquirySelectorTrash';

export default function InquirySelector() {

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="side-bar-container">

            <Tabs active={activeTab} onTabChange={setActiveTab}>
                <Tabs.Tab label="Current" icon={<MoodCrazyHappy size={18} />}>
                    <InquirySelectorCurrent />
                </Tabs.Tab>

                <Tabs.Tab label="Archive"
                    icon={<Archive size={18} />}
                >
                    <InquirySelectorArchive />

                </Tabs.Tab>
                <Tabs.Tab label="Trash"
                    icon={<Trash size={18} />}
                >
                    <InquirySelectorTrash />
                </Tabs.Tab>
            </Tabs>
        </div>
    )
}

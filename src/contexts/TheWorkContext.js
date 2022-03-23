import React, { createContext, useContext, useState } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid"

const TheWorkContext = createContext();

export default function useTheWorkData() {
    return useContext(TheWorkContext);
}

export function TheWorkProvider({ children }) {

    const [data, setData] = useLocalStorage("thework-data", [getNewInquiry()]);

    function setInquiry(id, newInquiry) {
        setData(prevData => {
            return prevData.map(inquiry => {
                if (inquiry.id === id) return newInquiry;
                return inquiry;
            });
        });
    }

    function addInquiry(inquiry) {
        const newInquiry = inquiry;
        setData(prevData => {
            return [...prevData, newInquiry];
        });
    }

    function deleteInquiry(id) {
        setData(prevData => {
            return prevData.filter(inquiry => inquiry.id !== id);
        });
    }


    return (
        <TheWorkContext.Provider
            value={{
                data,
                setData,

                getNewExample,
                getNewTurnaround,
                getNewInquiry,

                setInquiry,
                addInquiry,
                deleteInquiry,
            }}
        >
            {children}
        </TheWorkContext.Provider>
    )
}



//////////////////
///// DATA ///////
//////////////////
function getNewInquiry() {
    const newInqury = {
        id: uuidv4(),
        thought: "",
        isThatTrue: "",
        areYouSure: "",
        howDoYouReact: "",
        whoWouldYouBe: "",
        turnarounds: []
    }

    return newInqury;
}

function getNewTurnaround() {
    const newTurnaround = {
        id: uuidv4(),
        turnaround: "",
        examples: [
            getNewExample()
        ]
    }

    return newTurnaround;
}

function getNewExample() {
    const newExample = {
        id: uuidv4(),
        example: "",
    }

    return newExample;
}

import React, { useContext } from 'react'
import { InquiryContext } from './App'
import Turnaround from './Turnaround'

export default function TurnaroundSection({ turnaroundData, updateInquiry }) {

    const turnarounds = turnaroundData.map(turnaround => {
        return (
            <Turnaround
                key={turnaround.id}
                turnaround={turnaround}

            />
        )
    })

    const { getNewTurnaround } = useContext(InquiryContext);

    function addTurnaround() {
        const newTurnarounds = [...turnaroundData, getNewTurnaround()];
        updateInquiry({ turnarounds: newTurnarounds });
    }

    function changeTurnaround(id, newTurnaround) {

    }

    function deleteTurnaround(id) {

    }

    return (
        <div className="turnaround-section-container">
            <div className="thought-title question">Turnarounds</div>
            {turnarounds}

            <button
                className='button'
                onClick={addTurnaround}
            >NEW TURNAROUND</button>
        </div>
    )
}

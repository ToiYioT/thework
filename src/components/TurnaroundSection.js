
import React, { useContext } from 'react'
import { InquiryContext } from './App'
import Turnaround from './Turnaround'

export default function TurnaroundSection({ turnaroundData, updateInquiry }) {

    const turnarounds = turnaroundData.map(turnaround => {
        return (
            <Turnaround
                key={turnaround.id}
                turnaround={turnaround}
                deleteTurnaround={deleteTurnaround}
                changeTurnaround={changeTurnaround}
            />
        )
    })

    const { getNewTurnaround } = useContext(InquiryContext);

    function addTurnaround() {
        const newTurnarounds = [...turnaroundData, getNewTurnaround()];
        updateInquiry({ turnarounds: newTurnarounds });
    }

    function changeTurnaround(id, newTurnaround) {

        const newTurnarounds = turnaroundData.map(turnaround => {
            if (turnaround.id === id) return newTurnaround;
            return turnaround;
        })

        updateInquiry({ turnarounds: newTurnarounds });
    }

    function deleteTurnaround(id) {
        const newTurnarounds = turnaroundData.filter(turnaround => {
            return turnaround.id !== id;
        })
        updateInquiry({ turnarounds: newTurnarounds });
    }

    return (
        <div className="turnaround-section-container">
            <div className="turnaround-title">Turnarounds</div>

            <div className="turnarounds-container">

                {turnarounds}
            </div>

            <button
                className='add-turnaround-button'
                onClick={addTurnaround}
            >NEW TURNAROUND</button>
        </div>
    )
}

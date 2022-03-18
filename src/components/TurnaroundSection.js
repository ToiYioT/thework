
import React, { useContext } from 'react'
import { InquiryContext } from './App'
import Turnaround from './Turnaround'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default function TurnaroundSection({ turnaroundData, updateInquiry }) {

    const turnarounds = turnaroundData.map(turnaround => {
        return (
            <CSSTransition
                key={turnaround.id}
                timeout={500}
                classNames="fade-item"
            >
                <Turnaround
                    key={turnaround.id}
                    turnaround={turnaround}
                    deleteTurnaround={deleteTurnaround}
                    changeTurnaround={changeTurnaround}
                />
            </CSSTransition>
        )
    })

    const { getNewTurnaround, setFocusedElementId } = useContext(InquiryContext);

    function addTurnaround() {

        const newTurnaround = getNewTurnaround();
        const newTurnarounds = [...turnaroundData, newTurnaround];
        setFocusedElementId(newTurnaround.id);
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
                <TransitionGroup>
                    {turnarounds}
                </TransitionGroup>
            </div>

            <button
                className='add-turnaround-button'
                onClick={addTurnaround}
            >NEW TURNAROUND</button>
        </div>
    )
}


import React, { useContext } from 'react'
import { InquiryContext } from './App'
import Turnaround from './Turnaround'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export default function TurnaroundSection({ turnaroundData, updateInquiry }) {

    const turnarounds = turnaroundData.map((turnaround, index) => {
        return (
            <CSSTransition
                key={turnaround.id}
                timeout={500}
                classNames="fade-item"
            >
                <Draggable
                    key={turnaround.id}
                    draggableId={turnaround.id}
                    index={index}
                >
                    {(provided) => (
                        <Turnaround
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}

                            key={turnaround.id}
                            turnaround={turnaround}
                            deleteTurnaround={deleteTurnaround}
                            changeTurnaround={changeTurnaround}
                        />
                    )}

                </Draggable>
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

            <Droppable droppableId="turnarounds" type='turnarounds'>
                {(provided) => (
                    <div
                        className="turnarounds-container"
                        {...provided.droppableProps}
                        ref={provided.innerRef}>

                        <TransitionGroup>
                            {turnarounds}
                            {provided.placeholder}
                        </TransitionGroup>
                    </div>
                )}
            </Droppable>

            <button
                className='add-turnaround-button'
                onClick={addTurnaround}
            >NEW TURNAROUND</button>
        </div>
    )
}

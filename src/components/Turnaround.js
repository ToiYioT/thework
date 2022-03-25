import React, { useContext, useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { InquiryContext } from './App';
import DeleteButton from './DeleteButton'
import TurnaroundExample from './TurnaroundExample';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useTheWorkData from '../contexts/TheWorkContext';


export default function Turnaround(props) {

    const {
        turnaround,
        deleteTurnaround,
        changeTurnaround,

        innerRef,
        draggableProps,
        dragHandleProps
    } = props;

    const textAreaRef = useRef();
    const { focusedElementId, setFocusedElementId
    } = useContext(InquiryContext);
    const { getNewExample } = useTheWorkData();

    useEffect(() => {
        if (focusedElementId.current == turnaround.id) {
            textAreaRef.current.focus();
            setFocusedElementId(null);
        }
    }, []);

    const exampleElements = turnaround.examples.map((example, index) => {

        function handleChange(change) {
            const newExample = { ...example, ...change }
            updateExample(example.id, newExample);
        }

        return (
            <CSSTransition
                key={example.id}
                timeout={300}
                classNames="fade-item"
            >
                <Draggable
                    key={example.id}
                    draggableId={example.id}
                    index={index}
                >
                    {(provided) => (
                        <TurnaroundExample
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}

                            key={example.id}
                            example={example}
                            handleChange={handleChange}
                            deleteExample={deleteExample}
                            addExampleAfter={addExampleAfter}
                            focusPreviousExample={focusPreviousExample}
                        />
                    )}

                </Draggable>

            </CSSTransition>)
    });

    function updateTurnaround(change) {

        const newTurnaround = { ...turnaround, ...change };
        changeTurnaround(turnaround.id, newTurnaround);
    }

    // adds a new example at the end of the list
    function addExample() {
        const newExample = getNewExample();
        const newExamples = [...turnaround.examples, newExample];

        setFocusedElementId(newExample.id);
        updateTurnaround({ examples: newExamples });
    }

    function addExampleAfter(id) {

        const newExample = getNewExample();
        const newExamples = [...turnaround.examples];
        const idIndex = newExamples.findIndex(element => element.id === id);
        newExamples.splice(idIndex + 1, 0, newExample);

        setFocusedElementId(newExample.id);
        updateTurnaround({ examples: newExamples });
    }

    function deleteExample(id) {
        const newExamples = turnaround.examples.filter(example => {
            return example.id !== id;
        })
        updateTurnaround({ examples: newExamples });
    }

    function focusPreviousExample(id) {
        const idIndex = turnaround.examples.findIndex(
            example => example.id === id
        );
        const newFocusedId = idIndex > 0 ? turnaround.examples[idIndex - 1].id
            : null;

        setFocusedElementId(newFocusedId);
    }

    function updateExample(id, newExample) {
        const newExamples = turnaround.examples.map(example => {
            if (example.id === id) return newExample;
            return example;
        })
        updateTurnaround({ examples: newExamples });
    }


    return (
        <div className="turnaround-container"
            ref={innerRef}
            {...draggableProps}
        >
            <div className="turnaround-handle"
                {...dragHandleProps}
            >. . .</div>


            <div className="turnaround-title-container">
                <TextareaAutosize
                    className='question input-field'
                    defaultValue={turnaround.turnaround}
                    onChange={(e) => updateTurnaround({ turnaround: e.target.value })}
                    ref={textAreaRef}
                    placeholder="Turn that around.."
                />
                <DeleteButton onClick={() => deleteTurnaround(turnaround.id)} />
            </div>

            <Droppable droppableId={turnaround.id} type="examples">
                {(provided) => (
                    <div
                        className="examples-container"
                        {...provided.droppableProps}
                        ref={provided.innerRef}>

                        <TransitionGroup>
                            {exampleElements}
                            {provided.placeholder}
                        </TransitionGroup>

                        <button
                            className='add-example-button'
                            onClick={addExample}
                        >
                            +
                        </button>
                    </div>
                )}
            </Droppable>
        </div >
    )
}

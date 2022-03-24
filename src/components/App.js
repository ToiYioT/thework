import { createContext, useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useTheWorkData from "../contexts/TheWorkContext";
import '../css/app.css'
import InquiryView from "./InquiryView";
import InquirySelector from './InquirySelector';

export const InquiryContext = createContext();

export default function App() {
  const {
    setInquiry,
    data,
    setData
  } = useTheWorkData();

  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const undoHistory = useRef([data]);
  const focusedElementId = useRef(null);


  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === 'z') {
        undo();
      }
    });
  }, []);

  const selectedInquiry = data.find(inquiry => inquiry.id === selectedInquiryId);

  const contextValue = {
    handleSetSelectedInquiryId,
    selectedInquiryId,
    saveUndoHistory,
    undo,
    setFocusedElementId,
    focusedElementId,
  }

  function closeInquiryView() {
    setSelectedInquiryId(null);
  }

  function handleSetSelectedInquiryId(id) {

    const newId = selectedInquiryId === id ? null : id;
    setSelectedInquiryId(newId);
  }

  function setFocusedElementId(id) {
    focusedElementId.current = id;
  }

  function saveUndoHistory() {
    undoHistory.current.push(data);
  }


  function undo() {
    const lastState = undoHistory.current.pop();
    if (lastState) {

      setData(lastState);
    }
  }

  function handleDragEnd(result) {

    if (result.destination == null) return;

    if (result.type === "examples") {
      handleMoveExample(result);
    } else if (result.type == "turnarounds") {
      handleMoveTurnaround(result);
    }
  }

  function handleMoveTurnaround(result) {
    const newTurnarounds = [...selectedInquiry.turnarounds];
    const movedTurnaround = newTurnarounds.splice(result.source.index, 1)[0];
    newTurnarounds.splice(result.destination.index, 0, movedTurnaround);

    const newInquiry = { ...selectedInquiry, turnarounds: newTurnarounds };
    setInquiry(selectedInquiry.id, newInquiry);
  }

  function handleMoveExample(result) {
    const sourceTurnaround = {
      ...selectedInquiry.turnarounds.find(
        turnaround => turnaround.id === result.source.droppableId)
    };
    const destinationTurnaround = {
      ...selectedInquiry.turnarounds.find(
        turnaround => turnaround.id === result.destination.droppableId)
    };
    const draggableExampleIndex = sourceTurnaround.examples.findIndex(
      example => example.id === result.draggableId
    )

    const removedExample = sourceTurnaround.examples.splice(draggableExampleIndex, 1)[0];
    destinationTurnaround.examples.splice(result.destination.index, 0, removedExample);

    const newTurnarounds = selectedInquiry.turnarounds.map(turnaround => {
      if (turnaround.id === destinationTurnaround.id)
        return destinationTurnaround;
      else if (turnaround.id === sourceTurnaround.id)
        return sourceTurnaround;
      else return turnaround;
    });

    const newInquiry = { ...selectedInquiry, turnarounds: newTurnarounds };
    setInquiry(selectedInquiry.id, newInquiry);
  }

  return (
    <InquiryContext.Provider value={contextValue}>
      <div className="main-container">

        <InquirySelector />
        {selectedInquiry &&

          <DragDropContext onDragEnd={handleDragEnd}>
            <InquiryView
              inquiryData={selectedInquiry}
              key={selectedInquiry.id}
              closeView={closeInquiryView}
            />

          </DragDropContext>

        }
      </div>
    </InquiryContext.Provider>
  );
}



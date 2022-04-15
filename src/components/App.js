import { createContext, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useTheWorkData from "../contexts/TheWorkContext";
import '../css/app.css'
import InquiryView from "./InquiryView";
import InquirySelector from './InquirySelector';
import { Portal } from "@mantine/core";

export const InquiryContext = createContext();

export default function App() {
  const {
    setInquiry,
    data,
    setData
  } = useTheWorkData();

  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const focusedElementId = useRef(null);
  const selectedInquiry = data.find(inquiry => inquiry.id === selectedInquiryId);

  const contextValue = {
    handleSetSelectedInquiryId,
    selectedInquiryId,
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
          <Portal>
            <DragDropContext onDragEnd={handleDragEnd}>

              <InquiryView
                inquiryData={selectedInquiry}
                key={selectedInquiry.id}
                closeView={closeInquiryView}
              />
            </DragDropContext>

          </Portal>

        }


      </div>
    </InquiryContext.Provider>
  );
}



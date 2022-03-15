import { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid"
import '../css/app.css'
import useLocalStorage from "../hooks/useLocalStorage";
import InquirySelector from "./InquirySelector";
import InquiryView from "./InquiryView";

export const InquiryContext = createContext();

export default function App() {
  const [data, setData] = useLocalStorage("thework-data", [getNewInquiry()]);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const undoHistory = useRef([data]);

  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === 'z') {
        undo();
      }
    });
  }, []);

  const selectedInquiry = data.filter(inquiry => inquiry.id === selectedInquiryId)[0];

  const contextValue = {
    setInquiry,
    addInquiry,
    handleSetSelectedInquiryId,
    selectedInquiryId,
    deleteInquiry,
    getNewTurnaround,
    getNewExample,
    saveUndoHistory,
    undo
  }

  function handleSetSelectedInquiryId(id) {

    const newId = selectedInquiryId === id ? null : id;
    setSelectedInquiryId(newId);
  }

  function setInquiry(id, newInquiry) {
    setData(prevData => {
      return prevData.map(inquiry => {
        if (inquiry.id === id) return newInquiry;
        return inquiry;
      });
    });
  }

  function addInquiry() {
    const newInquiry = getNewInquiry();
    setData(prevData => {
      return [...prevData, newInquiry];
    });

    handleSetSelectedInquiryId(newInquiry.id);
  }

  function deleteInquiry(id) {
    setData(prevData => {
      return prevData.filter(inquiry => inquiry.id !== id);
    });
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

  return (
    <InquiryContext.Provider value={contextValue}>
      <div className="main-container">
        <InquirySelector allInquiries={data} />

        {selectedInquiry &&
          <InquiryView
            inquiryData={selectedInquiry}
            key={selectedInquiry.id}
          />
        }
        {
          !selectedInquiry &&
          <div className="no-inquiry-selected">
            {data.length > 0 ? "Select an inquiry!" : "Create a new Inquiry!"}
          </div>
        }

      </div>
    </InquiryContext.Provider>
  );
}



function getNewInquiry() {
  const newInqury = {
    id: uuidv4(),
    thought: "New Thought",
    isThatTrue: "",
    areYouSure: "",
    howDoYouReact: "",
    whoWouldYouBe: "",
    turnarounds: [
      getNewTurnaround(),
    ]
  }

  return newInqury;
}

function getNewTurnaround() {
  const newTurnaround = {
    id: uuidv4(),
    turnaround: "New Turnaround",
    examples: []
  }

  return newTurnaround;
}

function getNewExample() {
  const newExample = {
    id: uuidv4(),
    example: "New example",
  }

  return newExample;
}
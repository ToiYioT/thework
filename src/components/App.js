import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import '../css/app.css'
import useLocalStorage from "../hooks/useLocalStorage";
import InquirySelector from "./InquirySelector";
import InquiryView from "./InquiryView";

export const InquiryContext = createContext();

export default function App() {
  const [data, setData] = useLocalStorage("thework-data", [getNewInquiry()]);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const selectedInquiry = data.filter(inquiry => inquiry.id === selectedInquiryId)[0];

  const contextValue = {
    setInquiry,
    addInquiry,
    handleSetSelectedInquiryId,
    selectedInquiryId,
    deleteInquiry,
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

      </div>

    </InquiryContext.Provider>
  );
}



function getNewInquiry() {
  const newInqury = {
    id: uuidv4(),
    thought: "I'm bad",
    isThatTrue: "Yes",
    areYouSure: "No",
    howDoYouReact: "Bad",
    whoWouldYouBe: "Good",
    turnarounds: [
      getNewTurnaround()
    ]
  }

  return newInqury;
}

function getNewTurnaround() {
  const newTurnaround = {
    id: uuidv4(),
    turnaround: "I'm not bad",
    examples: [
      getNewExample()
    ]
  }

  return newTurnaround;
}

function getNewExample() {
  const newExample = {
    id: uuidv4(),
    example: "Because I'm awesome!",
  }

  return newExample;
}
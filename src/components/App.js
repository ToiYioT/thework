import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import '../css/app.css'
import useLocalStorage from "../hooks/useLocalStorage";
import InquirySelector from "./InquirySelector";
import InquiryView from "./InquiryView";

export const InquiryContext = createContext();

export default function App() {
  const [data, setData] = useLocalStorage("thework-data", [getNewInquiry()]);
  const [selectedInquiryId, setSelectedInquiryId] = useState(data[0].id);

  const selectedInquiry = data.filter(inquiry => inquiry.id === selectedInquiryId)[0];

  const contextValue = {
    setInquiry,
    addInquiry,
    handleSetSelectedInquiryId,
    selectedInquiryId,
  }

  function handleSetSelectedInquiryId(id) {
    setSelectedInquiryId(id);
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
    setData(prevData => {
      return [...prevData, getNewInquiry()];
    })
  }

  return (
    <InquiryContext.Provider value={contextValue}>
      <div className="main-container">
        <InquirySelector allInquiries={data} />
        <InquiryView
          inquiryData={selectedInquiry}
          key={selectedInquiry.id}
        />

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
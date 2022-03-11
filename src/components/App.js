import { createContext } from "react";
import { v4 as uuidv4 } from "uuid"
import '../css/app.css'
import useLocalStorage from "../hooks/useLocalStorage";
import InquirySelector from "./InquirySelector";
import InquiryView from "./InquiryView";

export const InquiryContext = createContext();

export default function App() {
  const [data, setData] = useLocalStorage("thework-data", [getNewInquiry()]);

  const contextValue = {
    setInquiry,
    addInquiry,
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
          inquiryData={data[0]}
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
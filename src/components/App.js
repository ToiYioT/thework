import { createContext } from "react";
import { v4 as uuidv4 } from "uuid"
import '../css/app.css'
import InquiryView from "./InquiryView";

export const InquiryContext = createContext();

export default function App() {


  return (
    <InquiryView inquiryData={getNewInquiry()} />

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
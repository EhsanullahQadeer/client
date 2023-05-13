import React,{useState} from "react";
import Accordion from 'react-bootstrap/Accordion';
import { accordionData } from "../Home2Components/data";
import "./Accordion.css"

const Accordions = () => {
  return (
   
   
    <div className="accordionWrapper">
          {/*  */}
          {accordionData?.map((item,i ) => {
            return (
              <Accordion style={{ marginBottom: "20px" }} defaultActiveKey={0}>
      <Accordion.Item eventKey={i}>
        <Accordion.Header><h1 className="accordionUpperHeading">{item?.head}</h1></Accordion.Header>
        <Accordion.Body>
        <p className="accordionSmallText">{item?.para}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
 
            );
          })}
        </div>
  );
};

export default Accordions;







   

/* <Accordion >
 <AccordionSummary
   expandIcon={<AddIcon style={{ color: "#00AAA1" }} />}
   aria-controls="panel1a-content"
   id="panel1a-header"
 >
   
 </AccordionSummary>
 <AccordionDetails>
   
 </AccordionDetails>
</Accordion> */
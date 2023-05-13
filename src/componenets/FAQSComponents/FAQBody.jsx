import React from "react";
import Accordions from "../CommonComponents/Accordion";
import Button from "@mui/material/Button";
import EastIcon from "@mui/icons-material/East";
import "./faq.css"
const Faq_Accordions = () => {
  return (
    <div className="">
    <div className="faq-accordian">
    <Accordions />
    </div>
      <div className="FAQContent">
        <h1>Can't find an answer to your question?</h1>
        <button className="contact-usBtn"><span className="mr-2">Contact Us</span><span className="fa-solid fa-arrow-right fa-sm"></span></button>
      </div>
    </div>
  );
};

export default Faq_Accordions;

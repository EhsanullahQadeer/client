import React from "react";
import "./AboutHeader.css";
import AboutHeader from "../CommonComponents/Header";

const AboutUsHeader = () => {
  return (
    <div className="aboutUsHeading">
      <AboutHeader
       head="About us" 
       para="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
          text ever since the 1500s." />
    </div>
  );
};

export default AboutUsHeader;

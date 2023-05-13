import React from "react";
import "./Header.css";

const AboutHeader = ({ head, para }) => {
  return (
    <div className="HeaderBigMain">
      <div className="HeaderMain">
        <h1><span >{head.substring(0, 4)}</span>{head.substring(4)}</h1>
        <p>{para}</p>
      </div>
    </div>
  );
};

export default AboutHeader;

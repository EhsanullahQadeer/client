import React from "react";
import "./Work.css";
import { WorkData } from "./data";
import Writers from "../CommonComponents/Writers";

const Work = () => {
  return (
    <div className="workMain">
      <div className="worksHeaderText">
        <h1 >How Do<span>es I</span>t Works</h1>
        <p style={{ marginBottom: "40px" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
          text ever since the 1500s.
        </p>
      </div>

      <div className="workContent">
        {WorkData?.map((item) => {
          return (
            <div className="singleWorkWrapper">
              <div className="workBox">
                <img src={item.img} />
              </div>
              <h1>{item?.heading}</h1>
              <p>{item?.para}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Work;

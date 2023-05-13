import React from "react";
import "./Feedback.css";
import Img from "../../assets/feedback.png";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

const Feedback = () => {
  return (
    <div className="feedBackBigMain">
      <div className="feedBackMain">
        <h1 className="feedBackHeader"><span className="underline">Aut</span>hors Feedback</h1>
        <div className="feedBackContent">
          <img src={Img} />
          <div>
            {/*  */}
            <div className="feedBackWriterBio">
              <div className="feedBackFlex">
                <h2 name="feedBackWriterName">Garrett Winters</h2>
                <p className="smallText">Fashion designer, Blogger, activist</p>
              </div>
              <div className="arrows">
                <div className="arrowLeft">
                  <AiOutlineLeft />
                </div>
                <div className="arrowRight">
                  <AiOutlineRight />
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <p className="bigText">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

import React from "react";
import { Link } from "react-router-dom";
import "./LearnWritting.css";
import img1 from "../../assets/whatsapp.png";

import learn1 from "../../assets/learn1.png";
import learn2 from "../../assets/learn2.png";

const LearnWritting = () => {
  return (
    <div id="becomeWriterSection" className="learnBigMain">
      <div className="learnMain">
        {/*  */}
        <div className="leanContentMain">
          <h1><span className="underline">Want to </span>Become an author or Learn Writing </h1>
          <div className="learnMainContent">
            <p>
              Dynamically underwhelm integrated outsourcing via timely models.
              Rapidiously reconceptualize visionary imperatives without 24/365
              catalysts for change. Completely streamline functionalized models.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
            <div className="learnWritingBtns">
              <Link to="/WriterForm"><button className="joinBtn active">Join Writing Course</button></Link>
              <button className="whatsAppBtn trans-btn-hv">
                <div className="learnFlex">
                <span className="fa-brands fa-whatsapp"></span> <span className="position-absolute ml-3">+92-333-1234567</span>
                  
                </div>
              </button>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="learnImages">
          <img src={learn1} className="learnOverlapImage" />
          <img src={learn2} />
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default LearnWritting;

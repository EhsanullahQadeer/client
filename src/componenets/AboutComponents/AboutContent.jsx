import React from "react";
import "./AboutContent.css";
import about1 from "../../assets/about1.png";
import about2 from "../../assets/about2.png";
import learn1 from "../../assets/learn1.png";

const AboutContent = () => {
  return (
    <div className="aboutBigMian">
      <div className="aboutMain">
        {/*  */}
        <div className="learnImages">
          <img src={learn1} className="learnOverlapImage" />
          <img src={about1} />
        </div>
        <div className="aboutContent">
          <h1>About us</h1>
          <div className="flexParas">
            <p>
              Dynamically underwhelm integrated outsourcing via timely models.
              Rapidiously reconceptualize visionary imperatives without 24/365
              catalysts for change. Completely streamline functionalized models
              and out-of-the-box functionalities. Authoritatively target
              proactive vortals vis-a-vis exceptional results. Compellingly
              brand emerging sources and compelling materials. Globally iterate
              parallel content
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
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      {/*  */}

      <div className="aboutMain">
        {/*  */}
        <div className="aboutContent">
          <h1>Mission & Vision</h1>
          <div className="flexParas">
            <p>
              Dynamically underwhelm integrated outsourcing via timely models.
              Rapidiously reconceptualize visionary imperatives without 24/365
              catalysts for change. Completely streamline functionalized models
              and out-of-the-box functionalities. Authoritatively target
              proactive vortals vis-a-vis exceptional results. Compellingly
              brand emerging sources and compelling materials. Globally iterate
              parallel content
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
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="learnImages">
          <img src={learn1} className="learnOverlapImage" />
          <img src={about2} />
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default AboutContent;

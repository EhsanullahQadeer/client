import React from "react";
import "./WritersList.css";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import { writers } from "./data";
import RightComponent from "../componenets/CommonComponents/RightComponent";
import Footer from "../componenets/CommonComponents/Footer";
import SingleWriter from "../componenets/CommonComponents/SingleWriter";
import Header from "../componenets/CommonComponents/Header";

const WritersList = () => {
  return (
    <div className="writerListMain" >
      <LightNavbar signIn={true} getStarted={true} person={false} />
      {/*  */}
      <Header
        head="writers List"
        para=" Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s."
      />
      {/*  */}

      <div className="writersListMain">
        <div className="writersListPart1">
          {writers?.map((writer) => {
            return <SingleWriter writer={writer} />;
          })}
        </div>

        <div className="writersListPart2">
          <RightComponent />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WritersList;

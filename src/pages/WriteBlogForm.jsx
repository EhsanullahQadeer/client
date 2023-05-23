import React from "react";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import Header from "../componenets/WriteBlogComponents/WriteHeader";
import Body from "../componenets/WriteBlogComponents/WriteBody";

const WriteBlogForm = () => {
  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      {/* <Header /> */}
      <Body />
      <Footer />
    </div>
  );
};

export default WriteBlogForm;

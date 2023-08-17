import React, { useEffect } from "react";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import Header from "../componenets/WriteBlogComponents/WriteHeader";
import Body from "../componenets/WriteBlogComponents/WriteBody";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WriteBlogForm = () => {
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state.user);
  // Check if conditions are met before rendering the component
  if (!activeUser || (activeUser && !activeUser.isApproved
    )) {
    useEffect(() => {
      !activeUser
        ? navigate("/SignIn")
        : !activeUser.isApproved&& navigate("/creator#becomeWriterSection");
    }, [activeUser]);
  } else {
    return (
      <div>
        <LightNavbar signIn={true} getStarted={true} />
        {/* <Header /> */}
        <Body />
        <Footer />
      </div>
    );
  }
};

export default WriteBlogForm;

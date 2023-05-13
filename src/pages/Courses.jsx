import React from "react";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import CoursesHeader from "../componenets/CoursesComponents/CoursesHaeder";
import CoursesBody from "../componenets/CoursesComponents/CoursesBody";

const Courses = () => {
  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      <CoursesHeader />
      <CoursesBody />
      <Footer />
    </div>
  );
};

export default Courses;

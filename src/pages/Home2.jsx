import React from "react";
import Footer from "../componenets/CommonComponents/Footer";
import Hero from "../componenets/CommonComponents/Hero";
import {
  Numbers,
  Work,
  Network,
  Space,
  Feedback,
  LearnWritting,
  Home_Accordian,
} from "../componenets/Home2Components/index";

const About = () => {
  return (
    <div>
      <Hero home={2} />
      <Numbers />
      <Work />
      <Network />
      <Space />
      <Feedback />
      <LearnWritting />
      <Home_Accordian />
      <Footer />
    </div>
  );
};

export default About;

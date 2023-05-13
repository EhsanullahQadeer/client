import React from "react";
import Hero from "../componenets/CommonComponents/Hero";
import Network from "../componenets/Home2Components/Network";
import Space from "../componenets/Home2Components/Space";
import Home_Accordian from "../componenets/Home2Components/Home_Accordian.jsx"
import Footer from "../componenets/CommonComponents/Footer";

const GetStarted = () => {
  return (
    <div>
      <Hero />
      <Network />
      <Space />
      <Home_Accordian />
      <Footer />
    </div>
  );
};

export default GetStarted;

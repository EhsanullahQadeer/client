import React from "react";
import Navbar from "./Navbar";
import HeroText from "./HeroText";
import "./Hero.css";

const Hero = (props) => {
  return (
    <div className="heroMain">
      <Navbar />
      <div className="hero-text-div">
      <HeroText home={props.home}/>
      </div>
    </div>
  );
};

export default Hero;

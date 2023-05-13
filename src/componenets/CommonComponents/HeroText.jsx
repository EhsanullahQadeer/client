// WithOut Swipper
import React from "react";
import "./HeroText.css";
import { Link } from "react-router-dom";

const HeroText = (props) => {
  function scrollToBlog(){
    const element = document.getElementById("blogPosts");
    element.scrollIntoView();
  }

  function home1Btn(){
return(
  <div className="heroTextFlex">
        <Link to="/#blogPosts"><button onClick={scrollToBlog} className="md-btns trans-btn-hv">
          Start Reading
        </button></Link>
        <Link to="/signIn"><button className="md-btns blue-btn-hv">Sign In</button></Link>
      </div>
)
  }
  function home2Btn(){
    return(
<div className="heroTextFlex">
        <Link to="/signIn"><button className="md-btns trans-btn-hv">
          Start Writing
        </button></Link>
      </div>
    )
  }
  return (
    <div className="heroTextMain">
      <h1>Stay curious.</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s.
      </p>
      {props.home==2?home2Btn():home1Btn()}
      
    </div>
  );
};
export default HeroText;

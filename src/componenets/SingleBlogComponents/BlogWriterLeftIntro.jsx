import React from "react";
import "./index.css";
import Bookmark from "../../assets/Vector.png"
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { AiOutlineLinkedin } from "react-icons/ai";
import { BiLinkAlt } from "react-icons/bi";

const BlogWriterLeftIntro = ({ name, image, date, time: timeData }) => {
  return (
    <div className="blogsWriterLeftIntroMain">
      {/*  */}
      <div>
        {/*  */}
        <div className="blogWriterLeftIntroFlex">
          <img src={image} style={{ height: "40px", width: "40px" }} />
          <div>
            <h1 className="writerName">{name}</h1>
            <div className="singleBlogFlex">
                  <p> <i className="fa-sharp fa-regular fa-calendar-days fa-sm"></i></p>
              <p>{date}</p>
              <div className="blogLine"></div>
             
              <p>|</p>
             <p><i className="fa-sharp fa-regular fa-clock fa-sm"></i></p> 
              <p>{timeData}</p>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
      <div className="d-flex align-items-center">
      <div className="blogIconsMain mr-5">
      <a href=""><CiTwitter className="blogIcons fa-lg mx-1" /></a>
        <a href=""><CiFacebook className="blogIcons fa-lg mx-1" /></a>
        <a href=""><AiOutlineLinkedin className="blogIcons fa-lg mx-1" /></a>
        <a href=""><BiLinkAlt  className="blogIcons fa-lg mx-1" /></a>
      </div>
      <a href=""><img src={Bookmark}/></a>
      </div>
    </div>
  );
};

export default BlogWriterLeftIntro;

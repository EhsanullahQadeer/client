import React, { useState, useEffect } from "react";
import "./index.css";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { AiOutlineLinkedin } from "react-icons/ai";
import { BiLinkAlt } from "react-icons/bi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
//
import BookMark from "./BookMark";
const BlogWriterLeftIntro = ({
  name,
  image,
  date,
  time: timeData,
  writerId,
  setisBookMarked,
  isBookmarked,
}) => {
  return (
    <div className="blogsWriterLeftIntroMain">
      {/*  */}
      <div>
        {/*  */}
        <div className="blogWriterLeftIntroFlex">
          <Link className="link" to={`/WriterPublicProfile/${writerId}`}>
            <div className="cur-point" title="Visit Writer Profile">
              {image ? (
                <img className="singleBlogWriterImg" src={image} />
              ) : (
                <AccountCircleIcon
                  className="dummyProfileImage"
                  style={{ fontSize: "55px" }}
                />
              )}
            </div>
          </Link>
          <div>
            <h1 className="writerName">{name}</h1>
            <div className="singleBlogFlex">
              <p>
                {" "}
                <i className="fa-sharp fa-regular fa-calendar-days fa-sm"></i>
              </p>
              <p>{date}</p>
              <div className="blogLine"></div>

              <p>|</p>
              <p>
                <i className="fa-sharp fa-regular fa-clock fa-sm"></i>
              </p>
              <p>{timeData}</p>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
      <div className="d-flex align-items-center mt-3 mt-sm-0">
        <div className="blogIconsMain mr-5">
          <a href="">
            <CiTwitter className="blogIcons fa-lg mx-1" />
          </a>
          <a href="">
            <CiFacebook className="blogIcons fa-lg mx-1" />
          </a>
          <a href="">
            <AiOutlineLinkedin className="blogIcons fa-lg mx-1" />
          </a>
          <a href="">
            <BiLinkAlt className="blogIcons fa-lg mx-1" />
          </a>
        </div>
        <BookMark
          setisBookMarked={setisBookMarked}
          isBookmarked={isBookmarked}
        />
      </div>
    </div>
  );
};

export default BlogWriterLeftIntro;

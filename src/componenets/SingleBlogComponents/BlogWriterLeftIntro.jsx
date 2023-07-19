import React from "react";
import "./index.css";
import { Tooltip, IconButton } from "@mui/material";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { AiOutlineLinkedin } from "react-icons/ai";
import { BiLinkAlt } from "react-icons/bi";
import { SmallAlert } from "../Alert/Alerts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  addBookmarkApi,
  removeBookmarkApi,
} from "../../features/blog/blogSlice";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
//
const BlogWriterLeftIntro = ({
  name,
  image,
  date,
  time: timeData,
  bookmarked,
}) => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  let apiData = { blogId: blogId, userId: userId };

  const [isBookmarked,setisBookMarked]=useState("");
  useEffect(()=>{
    setisBookMarked(bookmarked)
  },[bookmarked])
  function addBookmarkFun() {
    dispatch(addBookmarkApi(apiData)).then((res) => {
      if (!res.error) {
        setisBookMarked(true);
        SmallAlert({ icon: "success", title: "Added to bookmark" });
      }
    });
  }
  function removeBookmarkFun() {
    dispatch(removeBookmarkApi(apiData)).then((res) => {
      if (!res.error) {
        setisBookMarked(false);
        SmallAlert({
          icon: "success",
          title: "Removed from bookmark",
          danger: true,
        });
      }
    });
  }

  return (
    <div className="blogsWriterLeftIntroMain">
      {/*  */}
      <div>
        {/*  */}
        <div className="blogWriterLeftIntroFlex">

        { image? <img  className="singleBlogWriterImg" src={image} />
          :<AccountCircleIcon className='dummyProfileImage' style={{fontSize:"55px"}}/>}
          
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
        {!isBookmarked ? (
          <Tooltip className="mt-2 mt-sm-0" title="Add to bookmark" placement="top-start" arrow>
            <IconButton onClick={addBookmarkFun} className="addBookmarkIconBtn">
              <BookmarkAddOutlinedIcon className="addBookmarkIcon" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip
            className="toolTip"
            title="Remove from bookmark"
            placement="top-start"
            arrow
          >
            <IconButton
              onClick={removeBookmarkFun}
              className="addBookmarkIconBtn"
            >
              <BookmarkRemoveOutlinedIcon className="addBookmarkIcon" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default BlogWriterLeftIntro;

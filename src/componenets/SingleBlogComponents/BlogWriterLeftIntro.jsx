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
import { ShareConfirmModal } from "../CommonComponents/ShareConfirmModal";
import { Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
const BlogWriterLeftIntro = ({
  name,
  image,
  blogTitle,
  description,
  date,
  time: timeData,
  writerId,
  setisBookMarked,
  isBookmarked,
}) => {
  const [btnTitle, setBtnTitle] = useState('open');
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const allUrls = {
    Facebook: `https://www.facebook.com/dialog/share&app_id=${''}&display=popup&href=${location.href}`,
    Twitter: `https://twitter.com/intent/tweet?text=${blogTitle}&url=${location?.href}`,
    Linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${location?.href}`,
  };
  const handleOnClick = (title)=> {
    if (title == 'copy') {
      setIsCopied(true);
      window.navigator.clipboard.writeText(`${location.href}`);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } else {
      setOpen(true);
      setUrl(allUrls[`${title}`]);
      setBtnTitle(title);
    }

  };
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
          <FontAwesomeIcon icon={faTwitter} onClick={()=> handleOnClick('Twitter')} className="blogIcons twitterIcon fa-lg mx-1" />
          <FontAwesomeIcon icon={faFacebook} onClick={()=> handleOnClick('Facebook')} className="blogIcons facebookIcon fa-lg mx-1" />
          <FontAwesomeIcon icon={faLinkedin} onClick={()=> handleOnClick('Linkedin')} className="blogIcons linkedinIcon fa-lg mx-1" />
          <Tooltip title={<div>{isCopied && <FontAwesomeIcon icon={faCheck} color="#4DFF4D"/>} {!isCopied ? 'Copy' : 'Copied!'}</div>}><BiLinkAlt onClick={()=> handleOnClick('copy')} className="blogIcons fa-lg mx-1" /></Tooltip>
        </div>
        <BookMark
          setisBookMarked={setisBookMarked}
          isBookmarked={isBookmarked}
        />
      </div>
      <ShareConfirmModal description={description} title={blogTitle} url={url} btnTitle={btnTitle} open={open} setOpen={setOpen} />
    </div>
  );
};

export default BlogWriterLeftIntro;

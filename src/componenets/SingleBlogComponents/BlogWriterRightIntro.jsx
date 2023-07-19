import React from "react";
import "./index.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Writer_Files_URL } from "../../utils";

const BlogWriterRightIntro = (props) => {
  let writerImg;
  if(props?.writterImg){
    writerImg=Writer_Files_URL+props?.writterImg;
  }
  return (
    <div className="singleBlogWriterInfoRight">
     {writerImg? <img  src={writerImg} style={{ height: "70px", width: "70px" ,borderRadius:"50%" }} />:
      <AccountCircleIcon style={{fontSize:"80px"}} className='dummyProfileImage' />}
      <h1>{props?.writterName}</h1>
      <p>{props?.writterDesignation}
      </p>
    </div>
  );
};

export default BlogWriterRightIntro;

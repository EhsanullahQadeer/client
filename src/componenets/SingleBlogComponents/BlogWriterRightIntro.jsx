import React from "react";
import "./index.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Writer_Files_URL } from "../../utils";
import { Link } from "react-router-dom";
const BlogWriterRightIntro = ({writterImg,writterName,writterDesignation,writerId}) => {
  let writerImg;
  if(writterImg){
    writerImg=Writer_Files_URL+writterImg;
  }
  return (
    <div className="singleBlogWriterInfoRight">
     <Link className="link" to={`/WriterPublicProfile/${writerId}`}>
    <div title="Visit Writer Profile">
     {writerImg? <img  src={writerImg} style={{ height: "70px", width: "70px" ,borderRadius:"50%" }} />:
      <AccountCircleIcon style={{fontSize:"80px"}} className='dummyProfileImage' />}
      </div>
      </Link>
      <h1>{writterName}</h1>
      <p>{writterDesignation}
      </p>
    </div>
  );
};

export default BlogWriterRightIntro;

import React from "react";
import parse from "html-react-parser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Writer_Files_URL } from "../../utils";
import { gettingBlogDescription,gettingTumbnailImg } from "../logicFunctionalities/logics";
export default function SingleBlogHomePage(props) {
  //For blog tumbnail
  let writerPhoto;
  if (props?.writterImage) {
    writerPhoto = Writer_Files_URL + props?.writterImage;
  }
  let description= gettingBlogDescription(props?.description);
  let src=gettingTumbnailImg(props?.description)
  return (
    <div className="singleBlog">
      <div className="singleBlog-img">
        <img src={src} />
      </div>
      <div className="blogsContent">
        <div className="travelChip">
          <p>{props.category}</p>
        </div>
        <div className="blogsHead">
          <p>{props?.title}</p>
        </div>
        <div className="trendingFlex">
          <div className="trendingFlex-img">
            {writerPhoto ? (
              <img src={writerPhoto} />
            ) : (
              <AccountCircleIcon className="dummyProfileImage" />
            )}
          </div>

          <p>{props?.name}</p>
          <p>|</p>
          <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>

          <p>{props?.date}</p>
          <p>|</p>
          <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
          <p>{props?.time}</p>
        </div>
        <p
          className="trendingEnd-blog"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
}

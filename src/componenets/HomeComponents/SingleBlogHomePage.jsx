import React from "react";
import parse from "html-react-parser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Writer_Files_URL } from "../../utils";
import { gettingBlogDescription,gettingTumbnailImg } from "../logicFunctionalities/logics";
import { Link } from "react-router-dom";
export default function SingleBlogHomePage(props) {
  //For blog tumbnail
  let writerPhoto;
  if (props?.writterImage) {
    writerPhoto = Writer_Files_URL + props?.writterImage;
  }
  let description= gettingBlogDescription(props?.description);
  let src=gettingTumbnailImg(props?.description)
  return (
    <div className="singleBlog homeSingleBlog">
      <div className="singleBlog-img homeSingleBlog-img">
        <img src={src} />
      </div>
      <div className="blogsContent">
        <div className="travelChipSection">
          <Link to={`/category/${props?.category}`} className="travelChip travelChipCategory">
            <p>{props.category}</p>
          </Link>
          <div className="trendingFlex-writerTop">
            <div className="trendingFlex-img">
              {writerPhoto ? (
                <img src={writerPhoto} />
              ) : (
                <AccountCircleIcon className="dummyProfileImage" />
              )}
            </div>

            <p>{props?.name}</p>
          </div>
        </div>
        <div className="blogsHead">
          <p>{props?.title}</p>
        </div>
        <div className="trendingFlex homeTrendingFlex">
          <Link to={`/WriterPublicProfile/${props?.writer}`} title="Open writer profile" className="trendingFlexSections trendingFlex-writer">
            <div className="trendingFlex-img">
              {writerPhoto ? (
                <img src={writerPhoto} />
              ) : (
                <AccountCircleIcon className="dummyProfileImage" />
              )}
            </div>

            <p>{props?.name} |</p>
            {/* <p>|</p> */}
          </Link>

          <div className="trendingFlexSections">
            <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>

            <p>{props?.date} |</p>
            {/* <p>|</p> */}
          </div>

          <div className="trendingFlexSections">
            <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
            <p>{props?.time}</p>
          </div>
        </div>
        <p
          className="trendingEnd-blog"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
}

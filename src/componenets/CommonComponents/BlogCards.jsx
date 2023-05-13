import React from "react";
// import { blogsData } from "../data";
import img from "../../assets/trending.png";
import calender from "../../assets/calender.png";
import time from "../../assets/time.png";
import Add from "./Add";
import timeToRead from "../timeToRead/timeToRead";
import img1 from "../../assets/blog1.png";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";

const BlogCards = (props) => {
  return (
    <div>
      <div className="blogsPart1">
        <div>
        <div className="blogsPart1-flex-gap">
          {props.blogsData.slice(0, 3).map((item) => {
          let date =new Date(item?.createdAt).toUTCString().slice(4,16);
            let time= timeToRead(item?.description);
            const blogDescription=parse(""+item?.description)
            return (
              <Link to={`/blog/${item?._id}`}>
              <div className="singleBlog">
                 <div className="singleBlog-img">
                <img src={img1} />
                </div>
                <div className="blogsContent">
                  <div className="travelChip">
                    <p>{item?.category}</p>
                  </div>
                  <div className="blogsHead">
                    <p>{item?.title}</p>
                  </div>
                  <div className="trendingFlex">
                  <div className="trendingFlex-img">
                    <img  src={img} />
                    </div>
                    
                    <p>{item?.writter[0]?.name}</p>
                   <p>|</p>
                   <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>
                    <div className="trendingTime">
                    <p>{date}</p>
                    <p>|</p>
                    <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                    <p>{time}</p>
                  </div>
                  </div>
                  
                  <p className="trendingEnd-blog" dangerouslySetInnerHTML={{ __html:blogDescription}}></p>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
        <Add />
        
       <div>
        <div className="blogsPart1-flex-gap">
        {props.blogsData.slice(3).map((item) => {
          let date =new Date(item?.createdAt).toUTCString().slice(4,16);
            let time= timeToRead(item?.description);
            const blogDescription=parse(""+item?.description)
            return (
              <Link to={`/blog/${item?._id}`}>
              <div className="singleBlog">
              <div className=" singleBlog-img">
                <img src={img1} />
                </div>
                <div className="blogsContent">
                  <div className="travelChip">
                    <p>{item?.category}</p>
                  </div>
                  <div className="blogsHead">
                    <p>{item?.title}</p>
                  </div>
                  <div className="trendingFlex">
                    <img  src={img} />
                    <p>{item?.writter[0]?.name}</p>
                    <span className="fa-xs">|</span>
                  <div className="trendingTime">
                  <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>
                    <p>{date}</p>
                    <span className="fa-xs">|</span>
                    <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                    <p>{time}</p>
                  </div>
                  </div>
                  
                  <p className="trendingEnd-blog" dangerouslySetInnerHTML={{ __html:blogDescription}}></p>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCards;

import React from "react";
import img from "../../assets/trending.png";
import calender from "../../assets/calender.png";
import time from "../../assets/time.png";

const BlogCard = ({ item }) => {
  return (
    <div>
      <div className="blogsPart1">
        <div>
          <div className="singleBlog">
            <img className="singleBlog-img" src={item?.img} />
            <div className="blogsContent">
              <div className="travelChip">
                <p>Travel</p>
              </div>
              <div className="blogsHead">
                <p>Design is the Mix of emotions</p>
              </div>
              <div className="trendingFlex">
                <img src={img} />
                <p>{item?.name}</p>
                <span className="fa-xs">|</span>
              <div className="trendingTime">
              <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>
                <p>{item?.date}</p>
                <span className="fa-xs">|</span>
                    <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                <p>{item?.time}</p>
              </div>
              </div>
              <p className="writer-detail-blog-p">{item?.lastText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

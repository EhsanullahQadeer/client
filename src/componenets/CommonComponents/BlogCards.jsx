import React from "react";
import Add from "./Add";
import timeToRead from "../timeToRead/timeToRead";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { gettingTumbnailImg } from "../logicFunctionalities/logics";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Writer_Files_URL } from "../../utils";
import { DisplayAdd } from "../../functions/Functions";

const BlogCards = ({blogsData}) => {
  const { userId } = useSelector((state) => state.user);
  return (
    <div>
      <div className="blogsPart1">
        <div>
          <div className="blogsPart1-flex-gap">
            {blogsData.map((item, index) => {
              let topstr = item?.topStory;
              let topstrwriter = item?.writter;
              let date = new Date(item?.createdAt || item?.topStory?.createdAt)
                .toUTCString()
                .slice(4, 16);
              let time = timeToRead(
                item?.description || item?.topStory?.description
              );
              const blogDescription = parse(
                "" + (item?.description || item?.topStory?.description)
              );
              let src = gettingTumbnailImg(
                item?.description || topstr?.description
              );
              let photo = item?.writter[0]?.photo || topstrwriter?.photo;
              photo && (photo = Writer_Files_URL + photo);

              return (
                <>
                  <Link to={`/blog/${item?._id}/${userId}`}>
                    <div className="singleBlog">
                      <div className="singleBlog-img">
                        <img src={src} />
                      </div>
                      <div className="blogsContent">
                        <div className="travelChip">
                          <p>{item?.category || topstr?.category}</p>
                        </div>
                        <div className="blogsHead">
                          <p>{item?.title || topstr?.title}</p>
                        </div>
                        <div className="trendingFlex">
                          {photo ? (
                            <div className="trendingFlex-img">
                              <img src={photo} />
                            </div>
                          ) : (
                            <FaUserCircle size={18} color={"#b1b1b1"} />
                          )}

                          <p>{item?.writter[0]?.name || topstrwriter?.name}</p>
                          <p>|</p>
                          <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>
                          <div className="trendingTime">
                            <p>{date}</p>
                            <p>|</p>
                            <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                            <p>{time}</p>
                          </div>
                        </div>

                        <p
                          className="trendingEnd-blog"
                          dangerouslySetInnerHTML={{ __html: blogDescription }}
                        ></p>
                      </div>
                    </div>
                  </Link>
                  <DisplayAdd blogs={blogsData} index={index}/>
                </>
              );
            })}
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCards;

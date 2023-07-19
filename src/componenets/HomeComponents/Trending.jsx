import React, { useEffect } from "react";
import "./Trending.css";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingBlogsApi } from "../../features/blog/blogSlice";
import timeToRead from "../timeToRead/timeToRead";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { Writer_Files_URL } from "../../utils";
import { gettingBlogDescription } from "../logicFunctionalities/logics";
const Trending = () => {
  const dispatch = useDispatch();
  const { TrendingBlogs } = useSelector((state) => state.blog);
  const {userId}= useSelector((state)=>state.user);
  useEffect(() => {
    dispatch(getTrendingBlogsApi());
  }, []);
  return (
    <div className="trendingMain">
      <div className="trendingText">
        <h2 className="fancyDectorationTrading trendingText-h2">Trending</h2>

        <div className="trendingGrid">
          {TrendingBlogs.map((item) => {
            let writerImg;
            if (item.writer?.photo) {
              writerImg = Writer_Files_URL + item.writer?.photo;
            }
            let date = new Date(item?.createdAt).toUTCString().slice(4, 16);
            let time = timeToRead(item?.description);

            const blogDescription = gettingBlogDescription(
              "" + item?.description
            );

            return (
              <Link className="link" to={`/blog/${item?._id}/${userId}`}>
                <div className="trendingContainer">
                  <a className="trendingHead">{item?.title}</a>
                  <div className="trendingFlex">
                    {writerImg ? (
                      <img className="rounded-circle" src={writerImg} />
                    ) : (
                      <AccountCircleIcon className="dummyProfileImage" />
                    )}
                    <p>{item?.writer?.name}</p>
                  </div>
                  <div className="trendingTime">
                    <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>
                    <p>{date}</p>
                    <span className="fa-xs">|</span>
                    <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                    <p>{time}</p>
                  </div>
                  <p
                    className="trendingEnd mt-2"
                    dangerouslySetInnerHTML={{ __html: blogDescription }}
                  ></p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trending;

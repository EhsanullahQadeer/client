import React, { useEffect } from "react";
import "./Trending.css";
import img from "../../assets/trending.png";
import { trendingData } from "../data";
import { useDispatch ,useSelector} from "react-redux";
import { getTrendingBlogsApi } from "../../features/blog/blogSlice";
import parse from 'html-react-parser';
import timeToRead from "../timeToRead/timeToRead";
import { Link } from "react-router-dom";
const Trending = () => {
const dispatch=useDispatch();
const {TrendingBlogs}=useSelector((state)=>state.blog);
  useEffect(()=>{
    dispatch(getTrendingBlogsApi())
  },[])
  return (
    <div className="trendingMain">
      <div className="trendingText">
        <h2 className="fancyDectorationTrading trendingText-h2">Trending</h2>

        <div className="trendingGrid">
          {TrendingBlogs.map((item) => {
          let date =new Date(item?.createdAt).toUTCString().slice(4,16);
            let time= timeToRead(item?.description);
            const blogDescription=parse(""+item?.description)
            return (
              <Link className="link" to={`/blog/${item?._id}`}>
              <div className="trendingContainer">
                <a className="trendingHead">{item?.title}</a>
                <div className="trendingFlex">
                  <img src={img} />
                  <p>{item?.writer?.name}</p>
                </div>
                <div className="trendingTime">
                <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>  
                  <p>{date}</p>
                  <span className="fa-xs">|</span>
                  <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                  <p>{time}</p>
                </div>
                <p className="trendingEnd mt-2" dangerouslySetInnerHTML={{ __html:blogDescription}} ></p>
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

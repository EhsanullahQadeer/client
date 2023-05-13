import React from 'react'
import img1 from "../../assets/blog1.png";
import img from "../../assets/trending.png";
import calender from "../../assets/calender.png";
import time from "../../assets/time.png";
import timeToRead from '../timeToRead/timeToRead';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export default function Writter_Articles(props) {
  return (
    props?.blogsData?.map((item)=>{
        let date =new Date(item?.createdAt).toUTCString().slice(4,16);
        let time= timeToRead(item?.description);
        const blogDescription=parse(""+item?.description)

        return <Link className="link" to={`/blog/${item?._id}`}><div className="writerBlogs">
    <div className="writerArticlesFlex">
    <div>
      <div className="blogsPart1">
        <div>
          <div className="singleBlog">
            <img className="singleBlog-img" src={img1} />
            <div className="blogsContent">
              <div className="travelChip">
                <p>{item?.category}</p>
              </div>
              <div className="blogsHead">
                <p style={{maxWidth:"400px"}}>{item?.title}</p>
              </div>
              <div className="trendingFlex">
                <img src={img} />
                <p className='whiteSpace'>{item?.writer?.name}</p>
                <span className="fa-xs">|</span>
              <div className="trendingTime">
              <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>
                <p className='whiteSpace'>{date}</p>
                <span className="fa-xs">|</span>
                    <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                <p className='whiteSpace'>{time}</p>
              </div>
              </div>
              <p className="writer-detail-blog-p" dangerouslySetInnerHTML={{__html:blogDescription}} ></p>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div>
        <button className={`${item?.status.toLowerCase()}Chip`}>{item?.status}</button>
      </div>
    </div>
    </div>
    </Link>
    })
    
  )
}

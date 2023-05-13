import React from "react";
import "./index.css";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import IntroLeft from "../componenets/SingleBlogComponents/BlogWriterLeftIntro";
import IntroRight from "../componenets/SingleBlogComponents/BlogWriterRightIntro";
import BlogContent from "../componenets/SingleBlogComponents/BlogContent";
import BlogChips from "../componenets/SingleBlogComponents/WriterBlogChips";
import BlogComments from "../componenets/SingleBlogComponents/BlogComments";
import RightComponent from "../componenets/CommonComponents/RightComponent";
import Image from "../assets/blogWriter.png";
import { useParams } from 'react-router-dom';
import SingleWriter from "../componenets/CommonComponents/SingleWriter";
import { writers } from "./data";
import { useDispatch,useSelector } from "react-redux";
import { getSingleBlogsApi } from "../features/blog/blogSlice";
import { useEffect } from "react";
import timeToRead from "../componenets/timeToRead/timeToRead";

const SingleBlog = () => {
  const dispatch=useDispatch();
  let {isLoading,singleBlog}=useSelector((state)=>state.blog)
  let {blogId} = useParams();

  useEffect(()=>{
   dispatch(getSingleBlogsApi(blogId))
  },[])

  let arr = [
    "Productivity",
    "2022 In Review",
    "Artificial Intelligence",
    "Technology",
    "Machine Learning",
  ];
  const time = timeToRead(singleBlog?.description)
  const date =new Date(singleBlog?.createdAt).toUTCString().slice(4,16);
  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      <div className="singleBlogMain">
        {/*  */}
        <div className="singleBlogContent">
          <IntroLeft
            image={Image}
            name={singleBlog?.writer?.name}
            date={date}
            time={time}
          />
          <BlogContent 
            title={singleBlog.title}
            description={singleBlog?.description}
          />
          <BlogChips chips={arr} />
          <SingleWriter writer={writers[1]} />
          <BlogComments />
        </div>
        {/*  */}
        <div className="singleBlogSideBar">
          <IntroRight />
          <RightComponent />
        </div>
        {/*  */}
      </div>
      <Footer />
    </div>
  );
};

export default SingleBlog;

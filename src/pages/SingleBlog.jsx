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
import { useParams } from "react-router-dom";
import SingleWriter from "../componenets/CommonComponents/SingleWriter";
import { writers } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlogsApi } from "../features/blog/blogSlice";
import { useEffect } from "react";
import timeToRead from "../componenets/timeToRead/timeToRead";
import { Writer_Files_URL } from "../utils";

const SingleBlog = () => {
  const dispatch = useDispatch();
  let { isLoading, singleBlog } = useSelector((state) => state.blog);
  let { blogId, userId } = useParams();
  const data = {
    blogId: blogId,
    userId: userId,
  };
  useEffect(() => {
    dispatch(getSingleBlogsApi(data));
  }, []);
  let arr = [
    "Productivity",
    "2022 In Review",
    "Artificial Intelligence",
    "Technology",
    "Machine Learning",
  ];
  const time = timeToRead(singleBlog?.description);
  const date = new Date(singleBlog?.createdAt).toUTCString().slice(4, 16);
  let writerImg;
  if(singleBlog?.writer?.photo){
    writerImg=Writer_Files_URL+singleBlog?.writer?.photo;
  }
  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      <div className="singleBlogMain">
        {/*  */}
        <div className="singleBlogContent">
          <IntroLeft
            image={writerImg}
            name={singleBlog?.writer?.name}
            date={date}
            time={time}
            blogId={singleBlog?._id}
            bookmarked={singleBlog?.bookmarked}
          />
          <BlogContent
            title={singleBlog.title}
            description={singleBlog?.description}
          />
          {/* <BlogChips chips={arr} /> */}
          {/* <SingleWriter writer={writers[1]} /> */}
          <BlogComments liked={singleBlog?.liked} likes={singleBlog?.likes} />
        </div>
        {/*  */}
        <div className="singleBlogSideBar">
          <IntroRight
            writterImg={singleBlog?.writer?.photo}
            writterName={singleBlog?.writer?.name}
            writterDesignation={singleBlog?.writer?.designation}
          />
          <RightComponent />
        </div>
        {/*  */}
      </div>
      <Footer />
    </div>
  );
};

export default SingleBlog;

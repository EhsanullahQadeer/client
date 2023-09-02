import React, { useState } from "react";
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
import { getSingleBlogsApi } from "../features/blog/blogThunk";
import { useEffect } from "react";
import timeToRead from "../componenets/timeToRead/timeToRead";
import { Writer_Files_URL } from "../utils";
import { useLocation } from "react-router-dom";
import CommentHeaderChip from "../componenets/SingleBlogComponents/comment/CommentHeaderChip";

const SingleBlog = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  let { isLoading, singleBlog } = useSelector((state) => state.blog);
  let { blogId, userId } = useParams();
  const data = {
    blogId: blogId,
    userId: userId,
  };
  useEffect(() => {
    dispatch(getSingleBlogsApi(data));
  }, [location]);
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
  if (singleBlog?.writer?.photo) {
    writerImg = Writer_Files_URL + singleBlog?.writer?.photo;
  }
  let writerId = singleBlog.writer?._id;
  //
  let bookmarked = singleBlog?.bookmarked;
  const [isBookmarked, setisBookMarked] = useState("");
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    setisBookMarked(bookmarked);
  }, [bookmarked]);

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
            blogTitle={singleBlog.title}
            description={singleBlog?.description}
            writerId={writerId}
            setisBookMarked={setisBookMarked}
            isBookmarked={isBookmarked}
          />
          <BlogContent
            title={singleBlog.title}
            description={singleBlog?.description}
            titleLanguage={singleBlog?.titleLanguage}
          />
          {/* <BlogChips chips={arr} /> */}
          {/* <SingleWriter writer={writers[1]} /> */}
          <CommentHeaderChip
            setisBookMarked={setisBookMarked}
            isBookmarked={isBookmarked}
            totalComments={totalComments}
            liked={singleBlog?.liked}
            likes={singleBlog?.likes}
          />
          <BlogComments
            totalComments={totalComments}
            setTotalComments={setTotalComments}
          />
        </div>
        {/*  */}
        <div className="singleBlogSideBar">
          <IntroRight
            writterImg={singleBlog?.writer?.photo}
            writterName={singleBlog?.writer?.name}
            writterDesignation={singleBlog?.writer?.designation}
            writerId={writerId}
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

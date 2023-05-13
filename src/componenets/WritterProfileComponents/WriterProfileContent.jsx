import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./WriterProfileContent.css";
import Writer from "../../assets/writerImage.png";
import { autoLoadMore } from "../logicFunctionalities/logics";

import Footer from "../CommonComponents/Footer";
import Writter_Articles from "./Writter_Articles";
import { getsingleWriterBlogsApi } from "../../features/blog/blogSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  setupGetCurrentWriter,
  removeAlert,
} from "../../features/writerRequest/writerRequestSlice";

const WriterProfileContent = () => {
  let dispatch = useDispatch();
  let { currentWriterInfo, isLoading, showAlert } = useSelector(
    (state) => state.writerRequest
  );
  let { singleWritterBlogs, loadMore } = useSelector((state) => state.blog);

  let { name, designation } = currentWriterInfo;
  const { writerId } = useParams();

  //This is for articles section
  const [displayArticles, setDisplayArticles] = useState({
    allArticles: true,
    pendingArticles: false,
    rejectedArticles: false,
  });

  const [blogsData, setBlogsData] = useState([]);
  const { page, ref, setReached, setPage } = autoLoadMore();
  // pageIndex
  let apiData = {
    writerId,
    articlesType: "",
    pageIndex:page ,
    pageSize: 10,
  };
  //Fetching Blog apis here
  useEffect(() => {
    if (displayArticles.allArticles) {
      apiData.articlesType = "all";
      dispatch(getsingleWriterBlogsApi(apiData));
    } else if (displayArticles.pendingArticles) {
      apiData.articlesType = "Pending";
      dispatch(getsingleWriterBlogsApi(apiData));
    } else if (displayArticles.rejectedArticles) {
      apiData.articlesType = "Rejected";
      dispatch(getsingleWriterBlogsApi(apiData));
    }
    //This is for auto load more blogs
   
  }, [displayArticles, page]);
    
  useEffect(()=>{
    if (loadMore) {
      setTimeout(() => {
        setReached(false);
      }, 1000);
      loadMore = false;
    } else {
      setReached(true);
    }
  },[page,loadMore])
  

  //This is for storing data in useState load from api
useEffect(()=>{
  if (page == 1) {
  setBlogsData(singleWritterBlogs);
} else if (page > 1) {
  setBlogsData((pre) => {
    return [...pre, ...singleWritterBlogs];
  });
}
},[singleWritterBlogs])
  


  //getting All blogs
  function allArticlesFun() {
    setPage(1);
    setDisplayArticles({
      allArticles: true,
      pendingArticles: false,
      rejectedArticles: false,
    });
    apiData.articlesType = "all";
  }
  //getting pendingblogs
  function pendingArticlesFun() {
    setPage(1);
    setDisplayArticles({
      allArticles: false,
      pendingArticles: true,
      rejectedArticles: false,
    });
  }
  //getting rejected blogs
  function rejectedArticlesFun() {
    setPage(1);
    setDisplayArticles({
      allArticles: false,
      pendingArticles: false,
      rejectedArticles: true,
    });
  }
  //This is for getting writer profile information
  useEffect(() => {
    dispatch(setupGetCurrentWriter());
    allArticlesFun();
  }, []);


  return (
    <div className="WriterProfileContentBigMain">
      {/* First Part Starts */}
      <div className="WriterProfileContentMain">
        {/*  */}
        <div className="writerProfileBiography">
          {/*  */}
          <div className="writerImageBio">
            <div>
              <img src={Writer} />
              <p className="writerName">{name}</p>
              <p className="writerBio">{designation}</p>
            </div>
            <div className="writtersIcons">
              <div
                className="rightSideBarBigIcons rightSideBarTwitter"
                style={{ color: "#FFFFFF" }}
              >
                <i className="fa-brands fa-facebook-f fa-xl"></i>
              </div>
              <div className=" rightSideBarBigIcons ">
                <i className="fa-brands fa-twitter fa-xl"></i>
              </div>
              <div className="rightSideBarBigIcons">
                <i className="fa-brands fa-instagram fa-xl"></i>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="writersBtns">
            <Link to="/Write">
              <button className="writting">Start Writting</button>
            </Link>

            <button className="articlesBtn">All Articles</button>
            <button className="draftsBtn">All Drafts</button>
          </div>
        </div>
        {/* First Parts ends  */}

        <div className="writerArticlesInfo">
          <div className="writerArticleLinks">
            <p
              onClick={allArticlesFun}
              className={displayArticles.allArticles == true && "activeLink"}
            >
              All Articles
            </p>
            <p
              onClick={pendingArticlesFun}
              className={
                displayArticles.pendingArticles == true && "activeLink"
              }
            >
              Pending Articles{" "}
            </p>
            <p
              onClick={rejectedArticlesFun}
              className={
                displayArticles.rejectedArticles == true && "activeLink"
              }
            >
              Rejected Articles
            </p>
          </div>

          <div className="writerLine"></div>

          {displayArticles.allArticles == true && (
            <Writter_Articles blogsData={blogsData} />
          )}
          {displayArticles.pendingArticles == true && (
            <Writter_Articles blogsData={blogsData} />
          )}
          {displayArticles.rejectedArticles == true && (
            <Writter_Articles blogsData={blogsData} />
          )}
          <button className="invisible" ref={ref}>
            Load More
          </button>
        </div>
      </div>

      {/*  */}
      <Footer />
    </div>
  );
};

export default WriterProfileContent;

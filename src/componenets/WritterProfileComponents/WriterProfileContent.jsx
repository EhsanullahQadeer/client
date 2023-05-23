import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./WriterProfileContent.css";
import Writer from "../../assets/writerImage.png";
import { autoLoadMore } from "../logicFunctionalities/logics";
import Img from "../../assets/Profile-PNG-File.png";
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
  let { currentWriterInfo, isLoading, showAlert,image } = useSelector(
    (state) => state.writerRequest
  );
  let { singleWritterBlogs, loadMore } = useSelector((state) => state.blog);

  let { name, designation } = currentWriterInfo;
  const { writerId } = useParams();

  //This is for articles section
  const [displayArticles, setDisplayArticles] = useState({
    activeArticles: true,
    // pendingArticles: false,
    // rejectedArticles: false,
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
    if (displayArticles.activeArticles) {
      apiData.articlesType = "Active";
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
  function activeArticlesFun() {
    setPage(1);
    setDisplayArticles({
      activeArticles: true
    });
    // apiData.articlesType = "Active";
  }
  //getting pendingblogs
  function pendingArticlesFun() {
    setPage(1);
    setDisplayArticles({
      pendingArticles: true
    });
  }
  //getting rejected blogs
  function rejectedArticlesFun() {
    setPage(1);
    setDisplayArticles({
      rejectedArticles: true
    });
  }
  //
  function recentActivitiesFun(){
    setPage(1);
    setDisplayArticles({
      recentActivities: true
    });
  }
  //This is for getting writer profile information
  useEffect(() => {
    dispatch(setupGetCurrentWriter());
    activeArticlesFun();
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
              <img src={image?image:Img} />
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
              onClick={activeArticlesFun}
              className={displayArticles.activeArticles == true && "activeLink"}
            >
            Active Articles
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
            <p
              onClick={recentActivitiesFun}
              className={
                displayArticles.recentActivities && "activeLink"
              }
            >
              Recent Activities
            </p>
          </div>

          <div className="writerLine"></div>

          {displayArticles.activeArticles && (
            <Writter_Articles blogsData={blogsData} />
          )}
          {displayArticles.pendingArticles && (
            <Writter_Articles blogsData={blogsData} />
          )}
          {displayArticles.rejectedArticles && (
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

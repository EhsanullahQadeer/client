import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./WriterProfileContent.css";
import { autoLoadMore } from "../logicFunctionalities/logics";
import Img from "../../assets/Profile-PNG-File.png";
import Footer from "../CommonComponents/Footer";
import Writter_Articles from "./Writter_Articles";
import { Writer_Files_URL } from "../../utils";
import {
  getsingleWriterBlogsApi,
  getRecentViewedBlogsApi,
  getBookmarkApi,
} from "../../features/blog/blogThunk";

import { useDispatch, useSelector } from "react-redux";
import {
  removeAlert,
} from "../../features/writerRequest/writerRequestSlice";
import { setupGetCurrentWriter } from "../../features/writerRequest/writerRequestThunk";

const WriterProfileContent = () => {
  const dispatch = useDispatch();
  const { userId, writerId, activeUser } = useSelector((state) => state.user);
  let { currentWriterInfo, isLoading, showAlert, image } = useSelector(
    (state) => state.writerRequest
  );
  let { singleWritterBlogs, loadMore } = useSelector((state) => state.blog);

  let { name, designation } = currentWriterInfo;
  // const {writerId} = useParams();

  //This is for articles section
  const [displayArticles, setDisplayArticles] = useState(() => {
    if (writerId) {
      return { activeArticles: true };
    } else {
      return { recentActivities: true };
    }
  });
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { page, ref, setReached, setPage } = autoLoadMore();
  // pageIndex
  let apiData = {
    writerId,
    userId: userId,
    articlesType: "",
    pageIndex: page,
    pageSize: 10,
  };
  //Fetching Blog apis here
  useEffect(() => {
    if (displayArticles.activeArticles) {
      apiData.articlesType = "Active";
      writerId && dispatch(getsingleWriterBlogsApi(apiData));
    } else if (displayArticles.pendingArticles) {
      apiData.articlesType = "Pending";
      writerId && dispatch(getsingleWriterBlogsApi(apiData));
    } else if (displayArticles.rejectedArticles) {
      apiData.articlesType = "Rejected";
      writerId && dispatch(getsingleWriterBlogsApi(apiData));
    } else if (displayArticles.recentActivities) {
      dispatch(getRecentViewedBlogsApi(apiData));
    } else if (displayArticles.myBookmarks) {
      dispatch(getBookmarkApi(apiData));
    }
    //This is for auto load more blogs
  }, [displayArticles, page]);

  useEffect(() => {
    if (loadMore) {
      setLoading(true);
      setTimeout(() => {
        setReached(false);
      }, 1000);
      loadMore = false;
    } else {
      setReached(true);
    }
    setLoading(false);
  }, [page, loadMore]);

  //This is for storing data in useState load from api
  useEffect(() => {
    if (page == 1) {
      setBlogsData("");
      setBlogsData(singleWritterBlogs);
    } else if (page > 1) {
      setBlogsData((pre) => {
        return [...pre, ...singleWritterBlogs];
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [singleWritterBlogs]);

  //getting All blogs
  function activeArticlesFun() {
    setLoading(true);
    setBlogsData([]);
    setPage(1);
    setDisplayArticles({
      activeArticles: true,
    });
    // apiData.articlesType = "Active";
  }
  //getting pendingblogs
  function pendingArticlesFun() {
    setLoading(true);
    setBlogsData([]);
    setPage(1);
    setDisplayArticles({
      pendingArticles: true,
    });
  }
  //getting rejected blogs
  function rejectedArticlesFun() {
    setLoading(true);
    setBlogsData([]);
    setPage(1);
    setDisplayArticles({
      rejectedArticles: true,
    });
  }
  //
  function recentActivitiesFun() {
    setLoading(true);
    setBlogsData([]);
    setPage(1);
    setDisplayArticles({
      recentActivities: true,
    });
  }
  function myBookmarksFun() {
    setLoading(true);
    setBlogsData([]);
    setPage(1);
    setDisplayArticles({
      myBookmarks: true,
    });
  }
  //This is for getting writer profile information
  useEffect(() => {
    writerId && dispatch(setupGetCurrentWriter());
    writerId && activeArticlesFun();
  }, []);
  let writerPhoto;
  if (activeUser?.photo) {
    writerPhoto = Writer_Files_URL + "/" + activeUser?.photo;
  }
  return (
    <div className="WriterProfileContentBigMain">
      {/* First Part Starts */}
      <div className="WriterProfileContentMain">
        {/*  */}
        <div className="writerProfileBiography">
          {/*  */}
          <div className="writerImageBio">
            <div>
              <img className="img-fluid" src={writerPhoto || Img} />
              <p className="writerName">
                {activeUser?.name ||
                  activeUser?.firstName + " " + activeUser?.lastName}
              </p>
              <p className="writerBio">{activeUser?.designation}</p>
            </div>

            {writerId && (
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
            )}
          </div>
          {/*  */}
          {writerId && (
            <div className="writersBtns">
              <Link to="/Write">
                <button className="writting">Start Writting</button>
              </Link>

              <button className="articlesBtn">All Articles</button>
              <button className="draftsBtn">All Drafts</button>
            </div>
          )}
        </div>
        {/* First Parts ends  */}

        <div className="writerArticlesInfo">
          {/* <div></div> style={{overflow:"auto"}} */}
          <div className="writerArticleLinks">
            {writerId && (
              <>
                <p
                  onClick={activeArticlesFun}
                  className={
                    displayArticles.activeArticles == true && "activeLink"
                  }
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
              </>
            )}
            <p
              onClick={recentActivitiesFun}
              className={displayArticles.recentActivities && "activeLink"}
            >
              Recent Activities
            </p>
            <p
              onClick={myBookmarksFun}
              className={displayArticles?.myBookmarks && "activeLink"}
            >
              My Bookmarks
            </p>
          </div>
          <div className="writerLine"></div>
          {loading ? <div className="loader-container">
            <div className="loader"></div>
          </div> : !blogsData?.length ? <div className="loader-container">No Data</div> :
            <><Writter_Articles
              userId={userId}
              blogsData={blogsData}
              bookmark={displayArticles?.myBookmarks ? true : false}
              description={displayArticles?.myBookmarks && "hide"}
              recentViewedTime={displayArticles?.recentActivities ? true : false}
              setBlogsData={setBlogsData}
            />
              <button className="invisible" ref={ref}>
                Load More
              </button></>}
        </div>
      </div>

      {/*  */}
      <Footer />
    </div>
  );
};

export default WriterProfileContent;

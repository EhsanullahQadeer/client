import React, { useEffect, useState, useRef } from "react";
import RightComponent from "../componenets/CommonComponents/RightComponent";
import BlogCards from "../componenets/CommonComponents/BlogCards";
import "./Category.css";
import pin from "../assets/pin.png";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleCategoryBlogsApi
} from "../features/blog/blogThunk";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { LoadApi } from "../componenets/logicFunctionalities/logics";

const Category = () => {
  const [activeLink, setActiveLink] = useState("latest");
  let { categoryName } = useParams();
  const targetElementRef = useRef(null);
  const latestCategory = useRef(categoryName);
  const latestActiveLink = useRef(activeLink);
  const isDispatching = useRef(true);
  let dispatch = useDispatch();
  let { isLoading, showAlert } = useSelector((state) => state.blog);
  const [blogsData, setBlogsData] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(13);
  const [page, setPage] = useState(1);

  let isLoadMore = page <= Math.ceil(totalBlogs / 13);
  useEffect(() => {
    isDispatching.current = isLoadMore;
  }, [isLoadMore]);
  //i used useRef because changes are not reflecting in getBlogs() directly
  function getBlogs() {
    if (isDispatching.current) {
      let category = latestCategory.current;
      let activeLink = latestActiveLink.current;
      setPage((pre) => {
        let data = {
          pageSize: 13,
          pageIndex: pre,
          category: category,
          storyType: activeLink,
        };
        dispatch(getSingleCategoryBlogsApi(data)).then((res) => {
          let result = res.payload[0];
          setTotalBlogs(result.totalRecords[0]?.total);
          setBlogsData((pre) => {
            return [...pre, ...result.blogs];
          });
        });
        return (pre += 1);
      });
    }
  }

  useEffect(() => {
    setBlogsData([]);
    setPage(1);
    setTotalBlogs(13);
    isDispatching.current = true;
    latestCategory.current = categoryName;
    latestActiveLink.current = activeLink;
    //Call it intially
    getBlogs();
    LoadApi(targetElementRef, getBlogs);
  }, [categoryName, activeLink]);
  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} person={false} />
      <div className="categoryBlogMain">
        <div className="categoryBlogs">
          <div className="categoryTextFlex">
            <div className="categoryFlex">
              <h1 className="pinBox">
                <img src={pin} />
              </h1>
              <h1 className="categoryHeading">{categoryName}</h1>
            </div>
            <p className="categoryPara">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <Link to="/Write">
              <button className="categoryBtn">Start writing</button>
            </Link>
          </div>
          {categoryName != "Top Stories" && (
            <div className="categoryLinks">
              <p
                onClick={() => setActiveLink("latest")}
                className={`categoryLink ${
                  activeLink == "latest" ? "categoryActiveLink" : ""
                }`}
              >
                Latest
              </p>
              <p
                onClick={() => setActiveLink("topStories")}
                className={`categoryLink ${
                  activeLink == "topStories" ? "categoryActiveLink" : ""
                }`}
              >
                Top Stories
              </p>
            </div>
          )}
          <div className="categoryLine"></div>

          <BlogCards blogsData={blogsData} />
          {/*  */}

          <button
            ref={targetElementRef}
            className="home-loadMore-btn invisible"
          >
            Load More
          </button>
        </div>
        <div className="categoryRight">
          <RightComponent category={categoryName} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;

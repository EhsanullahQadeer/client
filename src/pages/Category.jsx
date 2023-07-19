import React, { useEffect, useState } from "react";
import RightComponent from "../componenets/CommonComponents/RightComponent";
import BlogCards from "../componenets/CommonComponents/BlogCards";
import "./Category.css";
import pin from "../assets/pin.png";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import { useDispatch, useSelector } from "react-redux";
 import { getSingleCategoryBlogsApi,getTopStoriesApi} from "../features/blog/blogSlice";
 import { useParams } from 'react-router-dom';
 import { autoLoadMore } from "../componenets/logicFunctionalities/logics";


const Category = () => {
  const {page,ref,setReached,setPage}= autoLoadMore();


  let {categoryName} =useParams();
  let dispatch =useDispatch();
  let {isLoading,showAlert,singleCategorsBlogs,loadMore}= useSelector((state)=>state.blog);
  const [blogsData,setBlogsData]=useState([])
  

   useEffect(()=>{
    setBlogsData([])
    setPage(1)
   },[categoryName])
  useEffect(()=>{ 
    let data={pageSize:13,pageIndex:page,category:categoryName}
    if(categoryName=="Top Stories"){
      dispatch(getTopStoriesApi(data))
    }else{
      dispatch(getSingleCategoryBlogsApi(data))
    }
  },[page,categoryName])


  useEffect(()=>{
    if(page==1){
      setBlogsData([ ...singleCategorsBlogs])
    }else if(page>1){
      setBlogsData((pre)=>{
        return[
          ...pre,...singleCategorsBlogs
        ]
      })
    }
    if (loadMore){
      setTimeout(
        ()=>{
          setReached(false)
        },500)
    }else{
      setReached(true)
    }
  },[singleCategorsBlogs])
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
            <button className="categoryBtn">Start writing</button>
          </div>

          <div className="categoryLinks">
            <p className="categoryActiveLink">Latest</p>
            <p className="categoryLink">Top Stories</p>
          </div>
          <div className="categoryLine"></div>

          <BlogCards 
            blogsData={blogsData}
          />
          <button  ref={ref} className="home-loadMore-btn invisible"  href="">Load More</button>
        </div>
        <div className="categoryRight">
          <RightComponent 
          category={categoryName} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;

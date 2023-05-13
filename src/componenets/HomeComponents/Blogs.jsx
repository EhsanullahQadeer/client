import React,{useState,useRef} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {useLocation} from 'react-router-dom';
import {useEffect } from "react";
import timeToRead from "../timeToRead/timeToRead";
import { getAllBLogsApi } from "../../features/blog/blogSlice";
import "./Blogs.css";
import { blogsData } from "../data";
import img from "../../assets/trending.png";
import RightComponent from "../CommonComponents/RightComponent";
import Add from "../CommonComponents/Add";

import img1 from "../../assets/blog1.png";
import SingleBlogHomePage from "./SingleBlogHomePage";
import { Metadata } from "libphonenumber-js/min";
import { autoLoadMore } from "../logicFunctionalities/logics";




const Blogs = () => {
  //this is used to auto loadmore blogs
  const {page,ref,setReached}= autoLoadMore();
  //Only related to blogs data 
  let dispatch =useDispatch();
  let {isLoading,showAlert,blogs}= useSelector((state)=>state.blog);
  const [blogsData,setBlogsData]=React.useState([])
  useEffect(
    ()=>{
       dispatch(getAllBLogsApi(page)).then((data)=>{
        let blogApiData=data.payload[0].data;
        if(data.meta.requestStatus=="fulfilled" ){
          if (blogApiData.length ==0){
            setReached(true)
          }else{
            setTimeout(
              ()=>{
                setReached(false)
              },500
            )
            
          }
          if(page==1){
            setBlogsData((pre)=>{
              return[ ...blogApiData]
            }
          )
          }else if(page>1){
            setBlogsData((pre)=>{
              return[...pre,...blogApiData]
            }
          )
          }
        }
      })
    },[page]
  )
 
  const location = useLocation();
  useEffect(()=> {
    if (location.hash =="#blogPosts") {
      const element = document.getElementById("blogPosts");
      element.scrollIntoView();
    } else {
     
    }
  }, [location]);

  return (
    <div id="blogPosts" className="blogsMain">
      {/*  */}
      <div className="blogsPart1">
        <div className="blogsPart1-flex-gap">
          {blogsData.slice(0, 3).map((data) => {
            let date =new Date(data.createdAt).toUTCString().slice(4,16);
            let time= timeToRead(data?.description);
            return (
            <Link to={`/blog/${data._id}`}><SingleBlogHomePage 
             writterImage={img1}
             blogImg={img}
              title={data?.title}
              name={data?.writter[0]?.name}
              date={date}
              time={time}
              description={data?.description}
              category={data?.category}
             /></Link>
            );
          })}
        </div>
        <Add />
        
       <div>
        <div className="blogsPart1-flex-gap">
        {blogsData.slice(3).map((data) => {
            let date =new Date(data.createdAt).toUTCString().slice(4,16);
            let time= timeToRead(data?.description);
            return (
            <Link to={`/blog/${data._id}`}><SingleBlogHomePage 
             writterImage={img1}
             blogImg={img}
              title={data?.title}
              name={data?.writter[0]?.name}
              date={date}
              time={time}
              description={data?.description}
              category={data?.category}
             /></Link>
            );
          })}
          {/* onClick={loadMore} */}
          <button ref={ref} className="home-loadMore-btn" style={{visibility:"hidden"}}  >Load More</button>
        </div> 
        
        </div>
      </div> 
      {/*  */}

      <div className="blogsPart2">
        <RightComponent />
      </div>
    </div>
   
  );
};

export default Blogs;

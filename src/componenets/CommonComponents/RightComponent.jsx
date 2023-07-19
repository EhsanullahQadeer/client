import React, { useEffect, useState } from "react";
import "./RightComponent.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaUserCircle } from "react-icons/fa";
// import { writers } from "../data";
import { Link } from "react-router-dom";
import { setupGetTopWritters } from "../../features/writerRequest/writerRequestSlice";
import { getTopStoriesApi } from "../../features/blog/blogSlice";
import timeToRead from "../timeToRead/timeToRead";
import { gettingTumbnailImg } from "../logicFunctionalities/logics";
import { useDispatch,useSelector } from "react-redux";
import { Writer_Files_URL } from "../../utils";


const RightComponent = (props) => {
  let {topWriters} = useSelector((state) => state.writerRequest);
  let {topStories} = useSelector((state) => state.blog);
  const {userId}= useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const [topStr,setTopStr]=useState([]);
  useEffect(()=>{
    if(topStr.length==0){
      setTopStr(topStories)
    }
  },[topStories])
 
  useEffect(()=>{
    dispatch(setupGetTopWritters())
    dispatch(getTopStoriesApi())
  },[])
  return (
    
    <div className="rightSideBarMain">
      {/*  */}
      {props?.category!="Top Stories" &&<>
      <div className="rightSideBarMainFlex">
        <h2 className="fancyDectoration">Top Stories</h2>
        <Link to="/category/Top Stories">View All</Link>
      </div>
      {/*  */}
      <div className="rightSideBarMainFlex-gap" >
        {topStr.slice(0,4).map((item) => {
          let writerImg;
          if(item?.writter?.photo){
            writerImg= Writer_Files_URL+item?.writter?.photo;
          }
          let fName =item?.writter?.name.split(" ")[0].slice(0,10)
           let time= timeToRead(item?.topStory?.description);
        let src= gettingTumbnailImg(item?.topStory?.description)
          return (
            <Link to={`/blog/${item?.topStory?._id}/${userId}`}>
            <div className="singleBlog ">
              <div>
              <img  src={src} className="rightSideBarMainImage" />
              </div>
              <div className="blogsContent right-blogsContent">
                <div className="travelChip">
                  <p>{item?.topStory?.category}</p>
                </div>
                <p className="singleBlogtrendingEnd">
                  {item?.topStory?.title}
                </p>
                <div className="trendingFlex trendingFlex-right">
                 {writerImg? <img className="circularImg" src={writerImg} />:<AccountCircleIcon className='dummyProfileImage' />}
                  <p  className="whiteSpace">{fName}</p>
                  
                <div className="trendingTime">
                <span className="fa-xs">|</span>
                <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                  <p className="whiteSpace">{time}</p>
                </div>
                </div>
              </div>
            </div>
            </Link>
          );
        })}
      </div>
      </>}
     
      {/*  */}
      {props?.writerSideBar!="disable" &&<div className="">
      <div className="rightSideBarMainFlex rightSideBarMainFlex-top-writer">
        <h2 className="fancyDectoration">Top Writers</h2>
        
        <Link to="/writersList">View All</Link>
      </div>
      {/*  */}
      <div className="rightSideBarMain-top-writer-flex" >
        {topWriters.map((data) => {
          let writer =data?.topWriter?._id;
          let writerImg;
          if(writer?.photo){
            writerImg=Writer_Files_URL+writer?.photo;
          }
          return (
            <div className="writterWrapper">
            <Link className="link" to={`/WriterPublicProfile/${writer?._id}`}> 
            {writerImg?<img className="topWriter-img" src={writerImg} />:
            <FaUserCircle size={80} color={"#b1b1b1"} />}
            {/* style={{fontSize:"80px"}} className='dummyProfileImage ' */}
            
            </Link>
              <div className="writtersContent">
                <Link className="link" to={`/WriterPublicProfile/${writer?._id}`}>
                <div>
                  <p className="writterName">{writer?.name}</p>
                  <p className="writterBio">{writer?.designation}</p>
                </div>
                </Link>
                <div className="writtersIcons">
                  
                {writer?.facebookId&& <a href={writer?.facebookId}><div className="rightComponentWritersIcons bg-blue fa-brands fa-facebook-f fa-sm"></div></a>}
                {writer?.twitterId&& <a href={writer?.twitterId}><div className="rightComponentWritersIcons fa-brands fa-twitter fa-sm"></div></a>}
                {writer?.instagramId&& <a href={writer?.instagramId}><div className="rightComponentWritersIcons fa-brands fa-instagram fa-sm"></div></a>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>}
     

 
      {/*  */}
      <div className="rightSideBarMain-md quick-stats-md-div">
      <div className="rightSideBarMain-quick-stats">
        <div className="rightSideBarMainFlex rightSidebarFlexBoxes">
          <h2 className="fancyDectoration">Quick Stats</h2>
        </div>
        <div className="quick-stats">
          <div className="quick-stats-items">
            <p className="amount">14</p>
            <p className="amountContent">New Post</p>
          </div>
          <div className="quick-stats-items">
            <p className="amount">480</p>
            <p className="amountContent">total visitors</p>
          </div>
          <div className="quick-stats-items">
            <p className="amount">29</p>
            <p className="amountContent">New subscribers</p>
          </div>
          <div className="quick-stats-items">
            <p className="amount">138</p>
            <p className="amountContent">blog read</p>
          </div>
        </div>
      </div>
      </div>
      {/*  */}
      <div className="rightSideBarMainFlex-followUs">
      <div className="follow-us-md-lg">
      <div className="rightSideBarMainFlex rightSidebarFlexBoxes">
        <h2 className="fancyDectoration">Follow Us</h2>
      </div>
      <div className="writtersIcons">
        <div className=" rightSideBarBigIcons rightSideBarTwitter">
          <a href=""> <i style={{ color: "#FFFFFF" }} className="fa-brands fa-twitter fa-xl"></i></a>
        </div>
        <div className="rightSideBarBigIcons">
        <a href=""><i className="fa-brands fa-facebook-f fa-xl"></i></a>
        </div>
        <div className="rightSideBarBigIcons">
        <a href=""><i className="fa-brands fa-pinterest fa-xl"></i></a>
        </div>
        <div className="rightSideBarBigIcons">
        <a href=""><i className="fa-brands fa-square-instagram fa-xl"></i></a>
        </div>
      </div>
      </div>
      </div>
      {/*  */}
     
      <div className="rightSideBarMain-md">
      <div style={{marginTop:"50px"}}>
      <div className="rightSideBarMainFlex rightSidebarFlexBoxes">
        <h2 className="fancyDectoration">Categories </h2>
        {/* <a href="">View All</a> */}
      </div>
      </div>
      <div  className="rightSideBarCategories">
      {props?.category !="Travel" && <Link to="/category/Travel"> <div className="rightSideBarSingleCategory">
          Travel
        </div></Link>}
        {props?.category !="Lifestyle" &&<Link to="/category/Lifestyle"><div className="rightSideBarSingleCategory">
        Lifestyle
        </div></Link>}
        {props?.category !="Fashion" && <Link to="/category/Fashion"><div className="rightSideBarSingleCategory">
        Fashion
        </div></Link>}
        {props?.category !="Data Science" && <Link to="/category/Data Science"><div className="rightSideBarSingleCategory active">
        Data Science
        </div></Link>}
        {props?.category !="Business" &&<Link to="/category/Business"><div className="rightSideBarSingleCategory">
        Business
        </div></Link>}
        {props?.category !="Design" && <Link to="/category/Design"><div className="rightSideBarSingleCategory">
        Design
        </div></Link>}
        {props?.category !="Health" &&  <Link to="/category/Health"><div className="rightSideBarSingleCategory">
        Health
        </div></Link>}
        {props?.category !="Food" &&  <Link to="/category/Food"><div className="rightSideBarSingleCategory">
        Food
        </div></Link>}
        {props?.category !="Art" && <Link to="/category/Art"><div className="rightSideBarSingleCategory">
        Art
        </div></Link>}
      </div>
      </div>
      {/*  */}
      <div className="rightSideBarMain-md want-travel-lg">
      <div className="rightSideBarAdd">
        <h2>want to travel sikkim by car?</h2>
        <p>
          Did you come here for something in particular or just general
          Riker-bashing? And blowing into
        </p>
        <button className="addBtn">Visit Us</button>
      </div>
    </div>
 
    </div>
  );
};

export default RightComponent;

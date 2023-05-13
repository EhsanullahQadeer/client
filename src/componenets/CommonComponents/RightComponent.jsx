import React from "react";
import "./RightComponent.css";
import { blogsData } from "../data";
import img from "../../assets/trending.png";
import { writers } from "../data";
import { Link } from "react-router-dom";
const RightComponent = (props) => {
  return (
    <div className="rightSideBarMain">
      {/*  */}
      <div className="rightSideBarMainFlex">
        <h2 className="fancyDectoration">Top Stories</h2>
        <a href="">View All</a>
      </div>
      {/*  */}
      <div className="rightSideBarMainFlex-gap" >
        {blogsData.slice(0, 4).map((item) => {
          return (
            <div className="singleBlog ">

              <img  src={item?.img} className="rightSideBarMainImage" />
              <div className="blogsContent right-blogsContent">
                <div className="travelChip">
                  <p>Travel</p>
                </div>
                <p className="singleBlogtrendingEnd">
                  set video playback speed with javascript version
                </p>
                <div className="trendingFlex trendingFlex-right">
                  <img src={img} />
                  <p>{item?.name}</p>
                  
                <div className="trendingTime">
                <span className="fa-xs">|</span>
                <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                  <p>{item?.time}</p>
                </div>
                </div>
              </div>
            </div>
            
          );
        })}
      </div>
      <div/>
     
      {/*  */}
      <div className="">
     
      <div className="rightSideBarMainFlex rightSideBarMainFlex-top-writer">
        <h2 className="fancyDectoration">Top Writers</h2>
        <a href="">View All</a>
      </div>
      {/*  */}
      <div className="rightSideBarMain-top-writer-flex" >
        {writers.map((writer) => {
          return (
            <div className="writterWrapper">
              <img src={writer?.img} />
              <div className="writtersContent">
                <div>
                  <p className="writterName">{writer.name}</p>
                  <p className="writterBio">{writer?.bio}</p>
                </div>
                <div className="writtersIcons">
                  
                  <a href=""><div className="rightComponentWritersIcons bg-blue fa-brands fa-facebook-f fa-sm"></div></a>
                  <a href=""><div className="rightComponentWritersIcons fa-brands fa-twitter fa-sm"></div></a>
                  <a href=""><div className="rightComponentWritersIcons fa-brands fa-instagram fa-sm"></div></a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
     

 
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
        <a href="">View All</a>
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

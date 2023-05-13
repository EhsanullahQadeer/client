import React from 'react'
import parse from 'html-react-parser';


export default function SingleBlogHomePage(props) {
  return (
    <div className="singleBlog">
    <div className="singleBlog-img">
   <img src={props?.writterImage} />
   </div>
   <div className="blogsContent">
     <div className="travelChip">
       <p>{props.category}</p>
     </div>
     <div className="blogsHead">
       <p>{props?.title}</p>
     </div>
     <div className="trendingFlex">
     <div className="trendingFlex-img">
       <img  src={props?.blogImg} />
       </div>
       
       <p>{props?.name}</p>
      <p>|</p>
      <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>
       
       <p>{props?.date}</p>
       <p>|</p>
       <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
       <p>{props?.time}</p>
      
     </div>
     <p className="trendingEnd-blog" dangerouslySetInnerHTML={{ __html: parse(props?.description) }}></p>
     
     
   </div>
 </div>
  )
}

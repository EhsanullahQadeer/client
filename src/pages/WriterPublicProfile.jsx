import React from "react";
import WriterIntro from "../componenets/WriterPublicProfileComponents/WriterIntro";
import RightComponent from "../componenets/CommonComponents/RightComponent";
import Footer from "../componenets/CommonComponents/Footer";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import "./index.css";
import { useDispatch,useSelector } from "react-redux";
import { setupGetSingleWriter } from "../features/writerRequest/writerRequestSlice";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getsingleWriterBlogsApi } from "../features/blog/blogSlice";
import { autoLoadMore } from "../componenets/logicFunctionalities/logics";
import timeToRead from "../componenets/timeToRead/timeToRead";
import { Link } from "react-router-dom";
import SingleBlogHomePage from "../componenets/HomeComponents/SingleBlogHomePage";

const WriterPublicProfile = () => {
  const {writerId}=useParams()
  const dispatch=useDispatch();
  const {singleWriter}=useSelector(state=>state.writerRequest)
  const {userId}= useSelector((state)=>state.user);
  useEffect(()=>{
    dispatch(setupGetSingleWriter(writerId))
  },[writerId])


  let { singleWritterBlogs, loadMore } = useSelector((state) => state.blog);

  const [blogsData, setBlogsData] = useState([]);
  const { page, ref, setReached, setPage } = autoLoadMore();
  // pageIndex
  let apiData = {
    writerId,
    articlesType: "Active",
    pageIndex:page ,
    pageSize: 10,
  };
  //Fetching Blog apis here
  useEffect(() => {
    dispatch(getsingleWriterBlogsApi(apiData));
     if (loadMore) {
      setTimeout(() => {
        setReached(false);
      }, 1000);
      loadMore = false;
    } else {
      setReached(true);
    }
  }, [writerId,page]);
  //this is for when writerId changes caling apis
  useEffect(()=>{
    setPage(1)
  },[writerId])
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

  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      <div className="writerPublicProfileMain">
        <div className="writerIntro">
          <WriterIntro writer={singleWriter} />
          
          <div className="blogsPart1">
        <div className="blogsPart1-flex-gap">
          {blogsData.map((data) => {
            let date =new Date(data.createdAt).toUTCString().slice(4,16);
            let time= timeToRead(data?.description);
            return (
            <Link to={`/blog/${data._id}/${userId}`}>
            <SingleBlogHomePage 
             writterImage={data?.writer?.photo}
              title={data?.title}
              name={data?.writer.name}
              date={date}
              time={time}
              description={data?.description}
              category={data?.category}
             /></Link>
            );
          })}
          <button ref={ref} className="home-loadMore-btn" style={{visibility:"hidden"}}>Load More</button>
        </div>
        </div>
          </div>
        
        <div className="writerPublicProfileMainSidebar">
          <RightComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WriterPublicProfile;

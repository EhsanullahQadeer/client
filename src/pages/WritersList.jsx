import React from "react";
import "./WritersList.css";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import { writers } from "./data";
import { useEffect } from "react";
import RightComponent from "../componenets/CommonComponents/RightComponent";
import Footer from "../componenets/CommonComponents/Footer";
import SingleWriter from "../componenets/CommonComponents/SingleWriter";
import Header from "../componenets/CommonComponents/Header";
import { useDispatch,useSelector } from "react-redux";
import { autoLoadMore } from "../componenets/logicFunctionalities/logics";
import { setupGetTopWritters } from "../features/writerRequest/writerRequestSlice";

const WritersList = () => {
  let {topWriters,loadMore} = useSelector((state) => state.writerRequest);
  const dispatch=useDispatch();


 //this is used to auto loadmore blogs
 const {page,ref,setReached}= autoLoadMore();

 let {isLoading,showAlert,blogs}= useSelector((state)=>state.blog);
 const [writersData,setWritersData]=React.useState([])
 
 // pageIndex
 let apiData = {
  pageIndex:page ,
  pageSize: 10,
};
 useEffect(() => {
 dispatch(setupGetTopWritters(apiData))
}, [page]);


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


// This is for storing data in useState load from api
useEffect(()=>{
if (page == 1) {
setWritersData(topWriters);
} else if (page > 1) {
setWritersData((pre) => {
  return [...pre, ...topWriters];
});
}
},[topWriters])


  return (
    <div className="writerListMain" >
      <LightNavbar signIn={true} getStarted={true} person={false} />
      {/*  */}
      <Header
        head="writers List"
        para=" Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s."
      />
      {/*  */}

      <div className="writersListMain">
        <div className="writersListPart1">
          {writersData?.map((data) => {
          let writer =data?.topWriter?._id;
            return <SingleWriter writer={writer} />;
          })}
          <button ref={ref} className="home-loadMore-btn" style={{visibility:"hidden"}}   >Load More</button>
        </div>
        
        <div className="writersListPart2">
          <RightComponent writerSideBar="disable"/>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WritersList;

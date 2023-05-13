import React from "react";
import WriterIntro from "../componenets/WriterPublicProfileComponents/WriterIntro";
import RightComponent from "../componenets/CommonComponents/RightComponent";
import Footer from "../componenets/CommonComponents/Footer";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import "./index.css";
import { writers } from "./data";
import BlogCard from "../componenets/CommonComponents/BlogCard";
import { blogsData } from "../componenets/data";

const WriterPublicProfile = () => {
  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      <div className="writerPublicProfileMain">
        <div className="writerIntro">
          <WriterIntro writer={writers[0]} />
          {blogsData.slice(0, 4).map((item) => {
            return <BlogCard item={item} />;
          })}
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

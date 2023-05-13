import React from "react";
import Hero from "../componenets/CommonComponents/Hero";
import ImageGrid from "../componenets/HomeComponents/ImageGrid";
import Trending from "../componenets/HomeComponents/Trending";
import Footer from "../componenets/CommonComponents/Footer";
import Blogs from "../componenets/HomeComponents/Blogs";

const Home = () => {
  return (
    <div className="homeMain">
      <Hero />
      <ImageGrid />
      <Trending />
      <Blogs />
      <Footer />
    </div>
  );
};

export default Home;

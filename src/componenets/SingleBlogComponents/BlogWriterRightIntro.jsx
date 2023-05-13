import React from "react";
import "./index.css";
import Img from "../../assets/blogWriter.png";

const BlogWriterRightIntro = () => {
  return (
    <div className="singleBlogWriterInfoRight">
      <img src={Img} style={{ height: "70px", width: "70px" }} />
      <h1>Cassie Kozyrkov</h1>
      <p>
        Chief Decision Scientist, Google. ❤️ Stats, ML/AI, data, puns, art,
        theatre, decision science. All views are my own.
      </p>
    </div>
  );
};

export default BlogWriterRightIntro;

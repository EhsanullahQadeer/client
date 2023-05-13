import React, { useState } from "react";
import "./index.css";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png";
import Up from "../../assets/badgeUp.png";
import Down from "../../assets/badgeDown.png";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import feed from "../../assets/feedback.png";
import { commentArr } from "./CommentsData";
import img1 from "../../assets/Ellipse 77.png";

const BlogComments = () => {
  var [commentData, setCommentData] = useState(commentArr);
  var topCommentArr = [
    {
      img: img1,
      name: "Uzair Ahmed Baig",
      time: "4 days ago",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. text of the printing and typesetting industry. Lorem Ipsum has been the industry",
      replies: "Hide",
    },
  ];

  var [topComment, setTopComment] = useState(topCommentArr);

  return (
    <div className="commentsMain">
      <div className="commentsChipMain">
        <div className="commentBigFlex">
          <div className="commentSmallFlex">
            <img src={like} />
            <p className="mr-2">2.4K</p>
          </div>
          <div className="commentSmallFlex">
            <img src={comment} />
            <p>23</p>
          </div>
        </div>
        <div className="commentBigFlex">
          <img className="mr-3" src={Up} />
          <img src={Down} />
        </div>
      </div>
      {/*  */}
      <div className="commnetPreNextContent">
        <p>
          AI in drug development — <br /> towards fully autonomous <br /> drug
          discovery
        </p>
        <p>
          Robots Need to Be Afraid of <br /> Humans Not the Other Way <br />{" "}
          Around
        </p>
      </div>

      <div className="commnetArrows">
        <a style={{ textDecoration: "none", color: "inherit" }} href="">
          <div className="singleArrows">
            <span className="mr-2">
              <BsArrowLeft />
            </span>
            <p className="mt-1">Previous Post</p>
          </div>
        </a>
        <a style={{ textDecoration: "none", color: "inherit" }} href="">
          <div className="singleArrows">
            <p className="mt-1">Next Post</p>
            <span className="ml-2">
              <BsArrowRight />
            </span>
          </div>
        </a>
      </div>

      {/*  */}
      <h1 className="commnetsResponse">Total Responses - 4672</h1>

      {/*  */}
      <div className="commentCard">
        <div className="commentWriterFlex">
          <img src={feed} />
          <p className="commentWriterFlexName">Michael Franklin</p>
        </div>
        <p className="commentWriterComment">What are your thoughts?</p>
        <h2 className="commentFurther">Comment</h2>
      </div>

      <div className="commentLightCard-div">

      <div className="topCommentCard-div">
        {topComment.map((data ,i) => {
          return (
              <div key={i} className="commentTop_card">
                <div className="d-flex justify-content-between commentHeader">
                  <div className="d-flex ">
                    <img className="mr-3" src={data.img} alt="img" />
                    <div>
                      <p className="commentName-p">{data.name}</p>
                      <span className="commentTime">{data.time}</span>
                    </div>
                  </div>
                  <a href=""><i className="fa-solid fa-ellipsis fa-2xl mr-4"></i></a>
                  
                </div>

                <p className="commentDescription-p">{data.description}</p>
                <button className="commentReadMore" href="">Read More</button>

                <div className="d-flex ">
                  <div className="mt-3">
            
                    <img src={comment} alt="img" />
                    <button className="ml-2">{data.replies} Replies</button>
                  </div>
                  
                </div>
              </div>
          );
        })}</div>



        <div className="commentCardReply_Div">
        {commentData.map((data, i) => {
          return (
            <div key={i} className="commentReply_card">
              <div  className="d-flex justify-content-between commentHeader">
                <div className="d-flex ">
                  <img className="commentPicture" src={data.img} alt="img" />
                  <div>
                    <p className="commentName-p">{data.name}</p>
                    <span className="commentTime">{data.time}</span>
                  </div>
                </div>
                <a href=""><i className="fa-solid fa-ellipsis fa-2xl mr-4"></i></a>
              </div>

              <p className="commentDescription-p">{data.description}</p>
              <button className="commentReadMore" href="">Read More</button>

              <div className="d-flex justify-content-between  ">
                <div className="mt-3">  
                  <img src={comment} alt="img" />
                  <button className="ml-2">{data.replies} Replies</button>
                </div>
                <button>Reply</button>
              </div>
            </div>
          );
        })}
        </div>


      </div>
    </div>
  );
};

export default BlogComments;

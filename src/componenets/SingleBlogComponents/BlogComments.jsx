import React, { useState, useRef } from "react";
import "./index.css";
import { IconButton } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import feed from "../../assets/feedback.png";
import moment from "moment";
import img1 from "../../assets/Ellipse 77.png";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import BookMark from "./BookMark";
import { Writer_Files_URL } from "../../utils";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { SmallAlert } from "../Alert/Alerts";
import WriteComment from "./comment/WriteComment";
import Step1Repies from "./comment/Step1Repies";
const BlogComments = ({ totalComments, setTotalComments }) => {
  moment().format();
  const { processing } = useSelector((state) => state.comments);
  const [commentsData, setCommentsData] = useState([]);
  const [editerror, setEditerror] = useState("");
  return (
    <div className="commentsMain ">
      <h1 className="commnetsResponse">Total Responses - {totalComments}</h1>
      <WriteComment
        setCommentsData={setCommentsData}
        processing={processing.comment}
      />
      <Step1Repies
        commentsData={commentsData}
        editerror={editerror}
        setEditerror={setEditerror}
        setCommentsData={setCommentsData}
      />
    </div>
  );
};

export default BlogComments;

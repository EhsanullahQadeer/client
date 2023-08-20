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
import {
  createCommentApi,
  replyToCommentApi,
  createReplyToReplyApi,
  getAllCommentsApi,
  getCommentRepliesApi,
  getReplyToCommentReplyApi,
  updateCommentApi,
  updateCommentReplyApi,
  updateReplyToReplyApi,
  deleteCommentApi,
  deleteCommentReplyApi,
  deleteReplyToReplyApi,
} from "../../features/comments/commentThunk";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { SmallAlert } from "../Alert/Alerts";
import WriteComment from "./comment/WriteComment";
import Step1Repies from "./comment/Step1Repies";
const BlogComments = ({ totalComments, setTotalComments }) => {
  moment().format();
  let { blogId } = useParams();
  const dispatch = useDispatch();
  const { activeUser, userId } = useSelector((state) => state.user);
  const { processing} = useSelector((state) => state.comments);

  const [commentsData, setCommentsData] = useState([]);

  //get comment replies

  //

  const [replyValue, setReplyValue] = useState("");
  const [editReplyValue, setEditReplyValue] = useState("");

  

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // ...................................Create................................................................



  // ...................................Report................................................................

  const handleReport = () => {};

  // ...................................Edit/Upadte................................................................

  //handling editcommet Upadte
  const [editerror, setEditerror] = useState("");

  //handle reply edit
  const [editReplyId, setEditReplyId] = useState(0);

  // function handleEditReply(id, text) {
  //   setEditReplyId(id);
  //   setEditReplyValue(text);
  //   setIfnoChangeEditValue(text);
  // }
  //handle edit comment Reply
  // function submitEditCommentReply(replyId, index) {
  //   let submit = editReplyValue.replace(/\s/g, "").length > 1;
  //   if (submit) {
  //     if (!(ifnoChangeEditValue == editReplyValue)) {
  //       let data = { replyId: replyId, text: { text: editReplyValue } };

  //       dispatch(updateCommentReplyApi(data)).then((res) => {
  //         if (!res.error) {
  //           let newArr = [...replyData];
  //           newArr[index] = res.payload;
  //           setReplyData(newArr);
  //           setEditReplyId(0);
  //           setReplyValue("");
  //         }
  //       });
  //     } else {
  //       setEditerror("You dont's have any changes to save.");
  //       setTimeout(() => {
  //         setEditerror("");
  //       }, 2000);
  //     }
  //   } else {
  //     setEditerror("You can not submit empty Reply.");
  //     setTimeout(() => {
  //       setEditerror("");
  //     }, 2000);
  //   }
  // }
  // ...................................Delete................................................................

  //handle delete reply
  // function handleDeleteReply(replyId, index) {
  //   dispatch(deleteCommentReplyApi(replyId)).then((res) => {
  //     if (!res.error) {
  //       SmallAlert({
  //         icon: "success",
  //         title: "Reply deleted successfully.",
  //         danger: true,
  //       });
  //       setReplyData((prevData) => prevData.filter((_, i) => i !== index));
  //     }
  //   });
  // }

  // ........................................................................................................

  //toggle like

  // handling reply readmore
  const [expandReply, setExpandReply] = useState();
  // function togglExpandReply(id) {
  //   if (expandReply == id) {
  //     setExpandReply(0);
  //   } else {
  //     setExpandReply(id);
  //   }
  // }

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
        // replyValue={replyValue}
        // setReplyValue={setReplyValue}

        
      />

      {/* ,..............................comments.............................................. */}
    </div>
  );
};

export default BlogComments;

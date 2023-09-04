import React, { createContext, useState, useRef, useEffect } from "react";
import { Writer_Files_URL } from "../../../utils";
import moment from "moment";
import CommentOptions from "./commentMoreAction";
import comment from "../../../assets/comment.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import defImg from "../../../assets/Profile-PNG-File.png";

import {
  getAllCommentsApi,
  replyToCommentApi,
  updateCommentApi,
  deleteCommentApi,
} from "../../../features/comments/commentThunk";
import { SmallAlert } from "../../Alert/Alerts";
import Step2Repies from "./Step2Repies";
import WriteReply from "./WriteReply";
import { ReportModal } from "../../CommonComponents/ReportModal";

// Step 1: Create a Combined Context
export const CombinedContext = createContext();
export default function Step1Repies({
  commentsData,
  editerror,
  setEditerror,
  setCommentsData,
}) {
  moment().format();
  const dispatch = useDispatch();
  const { activeUser, userId } = useSelector((state) => state.user);
  const { processing } = useSelector((state) => state.comments);

  let { blogId } = useParams();
  const handleReport = () => {
    setOpenReportModal(true);
  };
  const [expandedComments, setExpandedComments] = useState([]);
  const [openReplyId, setopenReplyId] = useState(0);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [toggleShowReplyId, setToggleReplyId] = useState(0);
  const [pageIndex, setpageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //this state used to track is their is any changes during edit or not
  const [trackChangesInput, setTrackChangesInput] = useState("");
  const [editCommentValue, setEditCommentValue] = useState("");
  //Reply Text
  const [replyText, setReplyText] = useState("");
  //commentId
  const [commentId, setCommentId] = useState("");
  //
  const [replyData, setReplyData] = useState([]);
  const [tempReplyData, setTempReplyData] = useState([]);

  //get all comments
  useEffect(() => {
    let dataSet = { pageIndex, blogId };
    dispatch(getAllCommentsApi(dataSet)).then(({ payload }) => {
      setCommentsData((pre) => [...pre, ...payload.comments]);
      let _totalPages = Math.ceil(payload.totalCount / 10);
      setTotalPages(_totalPages);
    });
  }, [pageIndex]);
  //handling edit comment input
  const editCommentInputRef = useRef([]);
  const [editCommentId, setEditCommentId] = useState(0);

  // handle delete comment
  function handleDelete(commentId, index) {
    dispatch(deleteCommentApi(commentId)).then((res) => {
      if (!res.error) {
        SmallAlert({
          icon: "success",
          title: "Comment deleted successfully.",
          danger: true,
        });
        commentsData.filter(() => {});
        setCommentsData((prevData) => prevData.filter((_, i) => i !== index));
      }
    });
  }

  //Handling Readmore
  const toggleCommentExpansion = (commentId) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments((prevExpanded) => {
        return prevExpanded.filter((id) => id !== commentId);
      });
    } else {
      setExpandedComments((prevExpanded) => [...prevExpanded, commentId]);
    }
  };
  //Edit comment
  const handleEdit = (id, text) => {
    setEditCommentId(id);
    setEditCommentValue(text);
    setTrackChangesInput(text);
  };
  useEffect(() => {
    if (editCommentId) {
      // Set focus on the input field when editCommentId changes
      let currentInput = editCommentInputRef.current[editCommentId];
      currentInput.focus();
      let value = currentInput.value;
      currentInput.setSelectionRange(value.length, value.length);
    }
  }, [editCommentId]);
  //updateEditedComment
  function updateEditedComment(commentId, index) {
    let submit = editCommentValue.replace(/\s/g, "").length > 0;
    if (submit) {
      if (!(trackChangesInput == editCommentValue)) {
        let data = { commentId: commentId, text: editCommentValue };
        dispatch(updateCommentApi(data)).then((res) => {
          let newArr = [...commentsData];
          newArr[index] = res.payload;
          setCommentsData(newArr);
          setEditCommentId(0);
          if (!res.error) {
            // setInputValue("");
          }
        });
      } else {
        setEditerror("You dont's have any changes to save.");
        setTimeout(() => {
          setEditerror("");
        }, 2000);
      }
    } else {
      setEditerror("You can not submit empty comment.");
      setTimeout(() => {
        setEditerror("");
      }, 2000);
    }
  }
  //handle input
  const handleInputChange = (event) => {
    let { value, name } = event.target;
    if (value.length > 2000) {
      value = value.slice(0, 2000);
    }
    if (name == "reply") {
      setReplyText(value);
    } else {
      setEditCommentValue(value);
    }
  };
  //hadle reply to comment
  const handleReplyToComment = (commentId, closeOpenedReplies) => {
    //by this only reply will open which coment is selected
    setopenReplyId(commentId);
    closeOpenedReplies && setCommentId("");
    setReplyText("");
  };

  //create comment reply
  function submitReply(id) {
    let submit = replyText.replace(/\s/g, "").length > 0;
    if (submit) {
      dispatch(replyToCommentApi({ commentId: id, text: replyText })).then(
        (res) => {
          if (!res.error) {
            // setReplyData((pre) => [res.payload, ...pre]);
            setTempReplyData((pre) => [res.payload, ...pre]);
            setReplyText("");
            setopenReplyId(0);
            // setToggleReplyId(id);
          }
        }
      );
    }
  }

  const childRef = useRef(null);

  //get comment replies
  function handleShowReplies(id) {
    //make empty state
    setReplyData([]);
    if (commentId != id) {
      childRef.current.getCommentReplies(id);
      setCommentId(id);
    } else {
      setCommentId("");
    }
  }

  // ................................................................................................
  // making all the state gloabal to use in child gloabal instead passing as props
  const contextValue = {
    openReplyId,
    setopenReplyId,
    replyText,
    setReplyText,
    handleInputChange,
    handleEdit,
    userId,
    editCommentId,
    setEditCommentId,
    editCommentValue,
    editerror,
    editCommentInputRef,
    toggleCommentExpansion,
    expandedComments,
    commentId,
    handleReplyToComment,
    trackChangesInput,
    openReportModal,
    setOpenReportModal,
  };

  return (
    <CombinedContext.Provider value={contextValue}>
      <div>
        <div className="commentLightCard-div">
          <div className="topCommentCard-div">
            {commentsData.map((data, i) => {
              let user = data?.userId;
              let isShowReplies = data?.replyCount > 0;
              let showReplyText =
                data?.replyCount > 1
                  ? `Show ${data?.replyCount} Replies`
                  : "Show 1 Reply";
              let hidReplyText =
                data?.replyCount > 1 ? "Hide Replies" : "Hide Reply";

              let userPhoto;
              if (user?.photo) {
                userPhoto = Writer_Files_URL + user?.photo;
              }
              const formattedTime = moment(data.createdAt).fromNow();
              const commentLines = Math.ceil(data.text.length / 80);
              const isCommentExpanded = commentLines <= 3;

              //Open to edit
              let isSelected = editCommentId == data._id;
              //Open Readmore
              let isExpandComment = expandedComments.includes(data._id);
              //
              let text = data.text;
              //if not readmore clicked
              if (!isExpandComment && text.length > 240) {
                text = text.slice(0, 240) + "......";
              }
              //open reply to comment
              let isReply = openReplyId == data._id;
              //
              return (
                <div>
                  <div key={i} className="commentTop_card">
                    <div className="d-flex justify-content-between commentHeader">
                      <div className="d-flex ">
                        <img
                          className="comment-user-img mr-3 img-fluid rounded-circle"
                          src={userPhoto || defImg}
                          alt="img"
                        />
                        <div>
                          <p className="commentName-p">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <span className="commentTime">{formattedTime}</span>
                        </div>
                      </div>

                      <CommentOptions
                        handleDelete={() => {
                          handleDelete(data._id, i);
                        }}
                        handleEdit={() => {
                          handleEdit(data._id, data.text);
                        }}
                        handleReport={handleReport}
                        user={user._id == userId}
                        isShowAction={!(editCommentId == data._id)}
                        id={data._id}
                      />
                    </div>
                    {/* ..................................................................... */}
                    <div className={`${isSelected ? "pb-5" : ""}`}>
                      <TextField
                        name="editComment"
                        className="w-100"
                        id="filled-multiline-flexible"
                        placeholder="What are your thoughts?"
                        multiline
                        maxRows={isSelected ? 10 : ""}
                        variant="standard"
                        maxLength="100"
                        value={isSelected ? editCommentValue : text}
                        helperText={
                          isSelected &&
                          (editCommentValue.length >= 2000
                            ? "You can write only upto 2000 character"
                            : editerror && editerror)
                        }
                        error
                        required
                        //when edit clicked id of comment to edit is added in state
                        InputProps={{
                          readOnly: !isSelected,
                        }}
                        onChange={handleInputChange}
                        inputRef={(input) =>
                          (editCommentInputRef.current[data._id] = input)
                        }
                      />
                      {/* Reply To Comment Text Field */}
                      {isReply && (
                        <WriteReply
                          submitReply={submitReply}
                          processing={processing.replyToComment}
                          commentId={data._id}
                        />
                      )}

                      {/* These button will only display when edit clicked ... */}
                      {isSelected && (
                        <div className="float-right mt-2">
                          {!processing.editComment && (
                            <Button
                              onClick={() => {
                                setEditCommentId(0);
                              }}
                              style={{ color: "#f24e1e" }}
                              variant="text"
                              size="small"
                            >
                              Cancel
                            </Button>
                          )}
                          <LoadingButton
                            onClick={() => {
                              updateEditedComment(data._id, i);
                            }}
                            style={{ color: "#0065fd" }}
                            className="ml-3"
                            variant="text"
                            size="small"
                            loadingPosition="end"
                            loading={processing.editComment}
                          >
                            <div
                              className={` ml-2 ${
                                processing.editComment ? "mr-4" : ""
                              }`}
                            >
                              {processing.editComment ? "Saving" : "Save"}
                            </div>
                          </LoadingButton>
                        </div>
                      )}
                    </div>
                    {/* hide read more when edit opens */}
                    {!isSelected && !isReply && !isCommentExpanded && (
                      <button
                        onClick={() => toggleCommentExpansion(data._id)}
                        className="commentReadMore mt-2"
                      >
                        {expandedComments.includes(data._id)
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}

                    {/* hide and show reply div */}
                    {/* Two condititons for hide when edit selected and also hide when reply open */}
                    {!isSelected && !isReply && (
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        {/* also make invisible when intially comment has no reply */}
                        <div className={`${!isShowReplies && "invisible"}`}>
                          <LoadingButton
                            onClick={() => {
                              handleShowReplies(data._id);
                            }}
                            // this is beacuse to prevent loading on other comments
                            loading={
                              commentId == data._id &&
                              processing.showCommentReply
                            }
                            loadingPosition="end"
                            variant="text"
                            size="small"
                          >
                            <img src={comment} alt="img" />
                            <span
                              className={` ml-2 ${
                                processing.showCommentReply ? "mr-4" : ""
                              }`}
                            >
                              {/*processing.showCommentReply because it shhould change text after loading  */}

                              {!processing.showCommentReply
                                ? !(commentId == data._id)
                                  ? showReplyText
                                  : hidReplyText
                                : showReplyText}
                            </span>
                          </LoadingButton>
                        </div>
                        <div>
                          <LoadingButton
                            onClick={() => {
                              handleReplyToComment(data._id, true);
                            }}
                          >
                            Reply
                          </LoadingButton>
                        </div>
                      </div>
                    )}
                  </div>

                  {/*.................................... Coment Reply................................................ */}
                  <Step2Repies
                    key={"Step2Repies" + i}
                    data={data}
                    ref={childRef}
                    commentId={commentId}
                    replyData={replyData}
                    setReplyData={setReplyData}
                    tempReplyData={tempReplyData}
                    setTempReplyData={setTempReplyData}
                    setEditCommentId={setEditCommentId}
                    handleEdit={handleEdit}
                    editCommentValue={editCommentValue}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center mt-5">
          {pageIndex < totalPages && (
            <button
              onClick={() => {
                setpageIndex((pre) => pre + 1);
              }}
              className="home-loadMore-btn"
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <ReportModal/>
    </CombinedContext.Provider>
  );
}

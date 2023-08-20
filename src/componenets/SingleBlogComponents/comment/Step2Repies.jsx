import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import comment from "../../../assets/comment.png";
import { getCommentRepliesApi } from "../../../features/comments/commentThunk";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import defImg from "../../../assets/Profile-PNG-File.png";
import CommentOptions from "./commentMoreAction";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  updateCommentReplyApi,
  deleteCommentReplyApi,
  createReplyToReplyApi
} from "../../../features/comments/commentThunk";
import { SmallAlert } from "../../Alert/Alerts";
import Step3Replies from "./step3Replies";
import WriteReply from "./WriteReply";
import SmallComment from "./SmallComment";
import { CombinedContext } from "./Step1Repies";




const Step2Repies = (
  {
    commentId,
    data,
    replyData,
    setReplyData,
    tempReplyData,
    setTempReplyData,
    setEditCommentId,
    editCommentId,
    handleEdit,
    trackChangesInput,
    editCommentValue,
    editCommentInputRef,
    expandedComments,
    setExpandedComments,
    toggleCommentExpansion,
    handleReplyToComment,
    openReplyId
  },
  ref
) => {
  useImperativeHandle(ref, () => ({
    getCommentReplies,
  }));

  const dispatch = useDispatch();

  moment().format();
  const { activeUser, userId } = useSelector((state) => state.user);
  const { processing } = useSelector((state) => state.comments);
  const [editerror, setEditerror] = useState("");

  const {handleInputChange,replyText,setReplyText,setopenReplyId} = useContext(CombinedContext);



  //Getting comment replies
  function getCommentReplies(commentId) {
    dispatch(getCommentRepliesApi(commentId)).then((res) => {
      if (!res.error) {
        setReplyData(res.payload);
      }
    });
  }

  //handle edit comment Reply
  function submitEditCommentReply(replyId, index, arrayName) {
    let submit = editCommentValue.replace(/\s/g, "").length > 1;
    if (submit) {
      if (!(trackChangesInput == editCommentValue)) {
        let data = { replyId: replyId, text: { text: editCommentValue } };

        dispatch(updateCommentReplyApi(data)).then((res) => {
          //Their are types we are using to map through replies ,, one is temp in this array the use replied now,
          //in reply data array we set data comes from backend of specific comments
          let newArr;
          if (!res.error) {
            if (arrayName == "tempReplyData") {
              newArr = [...tempReplyData];
              newArr[index] = res.payload;
              setTempReplyData(newArr);
            } else if (arrayName == "replyData") {
              newArr = [...replyData];
              newArr[index] = res.payload;
              setReplyData(newArr);
              //Now we need to check is this reply is availble in temp array to reflect edit changes ,we also have
              // change text of repliy in temp data
              let isReplyAvailbleIndex = tempReplyData.findIndex(
                (item) => item._id == replyId
              );
              //beacuse when it does not find any reply ,-1 will be in isReplyAvailbleIndex
              if (isReplyAvailbleIndex != -1) {
                // we set this value directly bcz no need to render autoo
                tempReplyData[isReplyAvailbleIndex] = res.payload;
              }
            }

            setEditCommentId(0);
          }
        });
      } else {
        setEditerror("You dont's have any changes to save.");
        setTimeout(() => {
          setEditerror("");
        }, 2000);
      }
    } else {
      setEditerror("You can not submit empty Reply.");
      setTimeout(() => {
        setEditerror("");
      }, 2000);
    }
  }
  //handle delete reply
  function handleDeleteReply(replyId, index, arrayName) {
    dispatch(deleteCommentReplyApi(replyId)).then((res) => {
      if (!res.error) {
        SmallAlert({
          icon: "success",
          title: "Reply deleted successfully.",
          danger: true,
        });
        if (arrayName == "tempReplyData") {
          setTempReplyData((prevData) =>
            prevData.filter((_, i) => i !== index)
          );
        } else if (arrayName == "replyData") {
          setReplyData((prevData) => prevData.filter((_, i) => i !== index));
          //Now we need to check is this reply is availble in temp array to remove
          let isReplyAvailbleIndex = tempReplyData.findIndex(
            (item) => item._id == replyId
          );
          if (isReplyAvailbleIndex != -1) {
            // we remove reply directly bcz no need to render autoo
            tempReplyData.splice(isReplyAvailbleIndex, 1);
          }
        }
      }
    });
  }

  function handleReport() {}

  function submitReply(id){
    console.log(id);
    let submit = replyText.replace(/\s/g, "").length > 1;
    if (submit) {
      dispatch(createReplyToReplyApi({ replyId: id, text: replyText })).then(
        (res) => {
          if (!res.error) {
            // setTempReplyData((pre) => [res.payload, ...pre]);
            setReplyText("");
            setopenReplyId(0);
          }
        }
      );
    }
  }

  return (
    <>
      {/* This is for to display comment for specifc commets */}
      {(data._id != commentId
        ? tempReplyData.some((element) => element.commentId == data._id)
        : true) && (
        <div className="commentCardReply_Div">
          {(data._id != commentId
            ? tempReplyData.filter((item) => item.commentId == data._id)
            : replyData
          ).map((replyDataValue, replyIndex) => {
            let replyUser = replyDataValue.userId;
            let isShowReplies =replyDataValue?.replyCount>0;
              let showReplyText =replyDataValue?.replyCount>1?`Show ${replyDataValue?.replyCount} Replies`:'Show 1 Reply';
              let hideReplyText=replyDataValue?.replyCount>1?'Hide Replies':'Hide Reply';

            let replyText = replyDataValue.text;
            let replyId = replyDataValue._id;
            const replyTime = moment(replyDataValue.createdAt).fromNow();
            let arrayName;
            if (data._id != commentId) {
              arrayName = "tempReplyData";
            } else {
              arrayName = "replyData";
            }
            //is edit edit selected
            let isSelected = editCommentId == replyId;

            const commentLines = Math.ceil(replyText.length / 80);
            const isCommentExpanded = commentLines <= 3;

            //
            let text = replyText;
            //if not readmore clicked
            //Open Readmore
            let isExpandComment = expandedComments == replyId;
            if (!isExpandComment && text.length > 240) {
              text = text.slice(0, 240) + "......";
            }
            //
            let isReply = openReplyId == replyId;
            return (
              <div key={replyIndex}>
                <div className="commentReply_card commentReplyMain">
                  <div className="d-flex justify-content-between commentHeader">
                    <div className="d-flex">
                      <img
                        className="replyUserImg"
                        src={replyDataValue.photo || defImg}
                        alt="img"
                      />
                      <div>
                        <p className="commentName-p">
                          {replyUser.firstName} {replyUser.lastName}
                        </p>
                        <span className="commentTime">{replyTime}</span>
                      </div>
                    </div>

                    <CommentOptions
                      handleDelete={() => {
                        handleDeleteReply(replyId, replyIndex, arrayName);
                      }}
                      handleEdit={() => {
                        handleEdit(replyId, replyText);
                      }}
                      handleReport={handleReport}
                      user={replyUser._id == userId}
                      isShowAction={!(editCommentId == replyId)}
                      commentsReply={true}
                    />
                  </div>

                  <>
                    {/* {!(editReplyId == replyDataValue._id) && ( */}
                    <div className="mt-4">
                      <TextField
                        name="commentReply"
                        className="w-100"
                        id="filled-multiline-flexible"
                        placeholder="Add a reply..."
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
                        onChange={handleInputChange}
                        inputRef={(input) =>
                          (editCommentInputRef.current[replyId] = input)
                        }
                      />

                      {/* Reply To Reply Text Field */}
                      {isReply && (
                        <WriteReply
                          submitReply={submitReply}
                          processing={processing.replyToComment}
                          commentId={replyId}
                        />
                      )}

                      {/* These button will only display when edit clicked ... */}
                      {isSelected && (
                        <div className="text-end w-100 pt-4 ">
                          {/* Cancel will disable when coment is updating ... */}
                          {!processing.editCommentReply && (
                            <Button
                              size="small"
                              onClick={() => {
                                setEditCommentId(0);
                              }}
                              style={{ color: "#f24e1e" }}
                              variant="text"
                            >
                              Cancel
                            </Button>
                          )}

                          <LoadingButton
                            onClick={() => {
                              submitEditCommentReply(
                                replyId,
                                replyIndex,
                                arrayName
                              );
                            }}
                            style={{ color: "#0065fd" }}
                            className="ml-3"
                            variant="text"
                            size="small"
                            loadingPosition="end"
                            loading={processing.editCommentReply}
                          >
                            <div
                              className={` ml-2 ${
                                processing.editCommentReply ? "mr-4" : ""
                              }`}
                            >
                              {processing.editCommentReply ? "Saving" : "Save"}
                            </div>
                          </LoadingButton>
                        </div>
                      )}
                    </div>
                    {/* )} */}
                  </>
                  {/* hide read more when edit opens */}
                  {(!isSelected && !isReply && !isCommentExpanded )&& (
                    <button
                      onClick={() => toggleCommentExpansion(replyId)}
                      className="commentReadMore mt-2"
                    >
                      {expandedComments == replyId ? "Read Less" : "Read More"}
                    </button>
                  )}

                  {/* hide and show reply div */}
                  {/* Two condititons for hide when edit selected and also hide when reply open */}
                  {!isSelected && !isReply && (
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    {/* also make invisible when intially comment has no reply */}
                    <div
                    className={`${
                      !isShowReplies &&
                      "invisible"
                    }`}
                    >
                      <LoadingButton
                        onClick={() => {
                          handleShowReplies(data._id);
                        }}
                        // this is beacuse to prevent loading on other comments
                        // loading={
                        //   commentId == data._id && processing.showCommentReply
                        // }
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
                          {!(commentId == replyId)
                            ? showReplyText
                            : hideReplyText}
                        </span>
                      </LoadingButton>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          handleReplyToComment(replyId,false);
                        }}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                  )}
                </div>
                <Step3Replies />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default forwardRef(Step2Repies);

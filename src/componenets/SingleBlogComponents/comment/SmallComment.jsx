import React, { useContext } from "react";
import defImg from "../../../assets/Profile-PNG-File.png";
import moment from "moment";
import CommentOptions from "./commentMoreAction";
import WriteReply from "./WriteReply";
import { CombinedContext } from "./Step1Repies";
import { Step2Context } from "./Step2Repies";
import comment from "../../../assets/comment.png";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { Writer_Files_URL } from "../../../utils";
export default function SmallComment({
  replyDataValue,
  replyIndex,
  arrayName,
  step3,
  parentUserName,
  submitEditReplyToReply,
  handleDeleteReplyToReply,
}) {
  moment().format();
  const { processing } = useSelector((state) => state.comments);

  //
  const {
    handleEdit,
    userId,
    editCommentId,
    editCommentValue,
    handleInputChange,
    editCommentInputRef,
    setEditCommentId,
    toggleCommentExpansion,
    expandedComments,
    commentId,
    handleReplyToComment,
    openReplyId,
  } = useContext(CombinedContext);

  const {
    currentReplyId,
    handleDeleteReply,
    handleReport,
    submitReply,
    submitEditCommentReply,
    editerror,
    handleShowReplies,
  } = useContext(Step2Context);

  let replyUser = replyDataValue.userId;
  const replyTime = moment(replyDataValue.createdAt).fromNow();

  //
  let replyId = replyDataValue._id;
  let replyText = replyDataValue.text;
  //is edit edit selected
  let isSelected = editCommentId == replyId;
  //
  let text = replyText;
  //
  let isReply = openReplyId == replyId;
  const commentLines = Math.ceil(replyText.length / 80);
  const isCommentExpanded = commentLines <= 3;
  //
  let isShowReplies = replyDataValue?.replyCount > 0;
  let showReplyText =
    replyDataValue?.replyCount > 1
      ? `Show ${replyDataValue?.replyCount} Replies`
      : "Show 1 Reply";
  let hideReplyText =
    replyDataValue?.replyCount > 1 ? "Hide Replies" : "Hide Reply";

  //Open Readmore
  let isExpandComment = expandedComments.includes(replyId);
  //
  //if not readmore clicked
  if (!isExpandComment && text.length > 240) {
    text = text.slice(0, 240) + "......";
  }

  //  processing
  let editProcessing;
  if (step3) {
    editProcessing = processing.editReplyToReply;
  } else {
    editProcessing = processing.editCommentReply;
  }
  //
  let userPhoto;
  if (replyUser?.photo) {
    userPhoto = Writer_Files_URL + replyUser?.photo;
  }
  return (
    <div className="commentReply_card commentReplyMain">
      <div className="d-flex justify-content-between commentHeader">
        <div className="d-flex">
          <img
            className="replyUserImg  img-fluid rounded-circle"
            src={userPhoto || defImg}
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
            if (step3) {
              handleDeleteReplyToReply(replyId, replyIndex);
            } else {
              handleDeleteReply(replyId, replyIndex, arrayName);
            }
          }}
          handleEdit={() => {
            handleEdit(replyId, replyText);
          }}
          handleReport={handleReport}
          user={replyUser._id == userId}
          isShowAction={!(editCommentId == replyId)}
          commentsReply={true}
          id={replyId}
        />
      </div>

      <>
        {/* {!(editReplyId == replyDataValue._id) && ( */}
        <div className="mt-4">
          {parentUserName && (
            <span className="replyUserNameMain">
              Replied to <span>@{parentUserName}</span>
            </span>
          )}
          <p className="invisible">spacer</p>
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
            //when edit clicked id of comment to edit is added in state
            InputProps={{
              readOnly: !isSelected,
            }}
            onChange={handleInputChange}
            inputRef={(input) => (editCommentInputRef.current[replyId] = input)}
          />

          {/* Reply To Reply Text Field */}
          {isReply && (
            <WriteReply
              submitReply={submitReply}
              processing={processing.replyToReply}
              commentId={replyId}
            />
          )}

          {/* These button will only display when edit clicked ... */}
          {isSelected && (
            <div className="text-end w-100 pt-4 ">
              {/* Cancel will disable when coment is updating ... */}
              {!editProcessing && (
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
                  if (step3) {
                    submitEditReplyToReply(replyId, replyIndex);
                  } else {
                    submitEditCommentReply(replyId, replyIndex, arrayName);
                  }
                }}
                style={{ color: "#0065fd" }}
                className="ml-3"
                variant="text"
                size="small"
                loadingPosition="end"
                loading={editProcessing}
              >
                <div className={` ml-2 ${editProcessing ? "mr-4" : ""}`}>
                  {editProcessing ? "Saving" : "Save"}
                </div>
              </LoadingButton>
            </div>
          )}
        </div>
        {/* )} */}
      </>
      {/* hide read more when edit opens */}
      {!isSelected && !isReply && !isCommentExpanded && (
        <button
          onClick={() => toggleCommentExpansion(replyId)}
          className="commentReadMore mt-2"
        >
          {expandedComments.includes(replyId) ? "Read Less" : "Read More"}
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
                handleShowReplies(replyId);
              }}
              // this is beacuse to prevent loading on other comments
              loading={
                currentReplyId.includes(replyId) && processing.showReplyToReply
              }
              loadingPosition="end"
              variant="text"
              size="small"
            >
              <img src={comment} alt="img" />
              <span
                className={` ml-2 ${processing.showReplyToReply ? "mr-4" : ""}`}
              >
                {/*processing.showReplyToReply because it shhould change text after loading  */}
                {/* currentReplyId[0] beacuse theri is herarically replies open more ids availbe we jsut want to get latest */}
                {!processing.showReplyToReply
                  ? currentReplyId[0] != replyId
                    ? showReplyText
                    : hideReplyText
                  : showReplyText}
              </span>
            </LoadingButton>
          </div>
          <div>
            <button
              onClick={() => {
                handleReplyToComment(replyId, false);
              }}
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

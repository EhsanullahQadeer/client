import React ,{useContext}from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

import { CombinedContext } from "./Step1Repies";


export default function WriteReply({
  processing,
  submitReply,
  commentId,
}) {
  const {setopenReplyId,setReplyText ,handleInputChange,replyText} = useContext(CombinedContext);



  function handleCancel() {
    setopenReplyId(0);
    //set to null...
    setReplyText("");
  }
  function handleSubmitReply() {
    submitReply(commentId);
    // submitEditCommentReply(replyDataValue._id, replyIndex);
  }
  return (
    <div className="mt-4">
      <TextField
        name="reply"
        className="w-100"
        id="filled-multiline-flexible"
        placeholder="Add a reply..."
        multiline
        maxRows={10}
        variant="standard"
        maxLength="100"
        autoFocus
        value={replyText}
        helperText={
          replyText.length >= 2000 && "You can write only upto 2000 character"
        }
        error
        required
        onChange={handleInputChange}
      />
      <div className="pt-2 pb-4">
        <LoadingButton
          className={`float-right ml-2}`}
          size="small"
          onClick={handleSubmitReply}
          loading={processing}
          loadingPosition="end"
          variant="text"
        >
          <span className={`${processing ? "mr-4" : ""}`}>
            {processing ? "Submitting" : "Reply"}
          </span>
        </LoadingButton>
        {/* Also remove cancel when reply is submitting */}
        {!processing && (
          <Button
          size="small"

            style={{ color: "#f24e1e" }}
            color="error"
            className="float-right"
            variant="text"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

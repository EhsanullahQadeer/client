import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Writer_Files_URL } from "../../../utils";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import defImg from "../../../assets/Profile-PNG-File.png";
import { useParams } from "react-router-dom";
import { createCommentApi } from "../../../features/comments/commentThunk";
export default function WriteComment({ setCommentsData, processing }) {
  const dispatch = useDispatch();
  let { blogId } = useParams();

  const { activeUser, userId } = useSelector((state) => state.user);
  const [inputValue, setInputValue] = useState("");

  //Create comment
  const submitComment = () => {
    let submit = inputValue.replace(/\s/g, "").length > 1;
    if (submit) {
      let data = { blogId: blogId, userId: userId, text: inputValue };

      dispatch(createCommentApi(data)).then((res) => {
        if (!res.error) {
          debugger
          setCommentsData((pre) => [res.payload, ...pre]);
          setInputValue("");
        }
      });
    } else {
    }
  };
  //handle input
  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value.slice(0, 2000));
  };
  //current user image
  let curentuserImg;
  if (activeUser?.photo) {
    curentuserImg = Writer_Files_URL + activeUser?.photo;
  }
  return (
    <div className="commentCard">
      <div className="commentWriterFlex">
        <img
          className=" img-fluid rounded-circle"
          src={curentuserImg || defImg}
        />
        <p className="commentWriterFlexName">
          {activeUser?.name
            ? activeUser?.name
            : activeUser?.firstName(activeUser?.lastName)}
        </p>
      </div>
      <div className="mt-4">
        <TextField
          className="w-100"
          id="filled-multiline-flexible"
          placeholder="What are your thoughts?"
          multiline
          maxRows={10}
          variant="standard"
          maxLength="100"
          value={inputValue}
          helperText={
            inputValue.length >= 2000 &&
            "You can write only upto 2000 character"
          }
          error
          required
          onChange={handleInputChange}
        />
        <div className="pt-2 pb-4">
          <LoadingButton
            className="float-right"
            size="small"
            onClick={submitComment}
            loading={processing}
            loadingIndicator=" "
            variant="standard"
          >
            <h2 className="commentFurther m-0">
              {processing ? "Submitting..." : "Comment"}
            </h2>
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

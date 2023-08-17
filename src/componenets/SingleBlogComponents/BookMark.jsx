import React from "react";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import { Tooltip, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SmallAlert } from "../Alert/Alerts";

//
import {
  addBookmarkApi,
  removeBookmarkApi,
} from "../../features/blog/blogThunk";
export default function BookMark({
  isBookmarked,
  setisBookMarked,
  Bookmarkcolor

}) {
  let dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const { blogId } = useParams();
  let apiData = { blogId: blogId, userId: userId };

  function addBookmarkFun() {
    dispatch(addBookmarkApi(apiData)).then((res) => {
      if (!res.error) {
        setisBookMarked(true);
        SmallAlert({ icon: "success", title: "Added to bookmark" });
      }
    });
  }
  function removeBookmarkFun() {
    dispatch(removeBookmarkApi(apiData)).then((res) => {
      if (!res.error) {
        setisBookMarked(false);
        SmallAlert({
          icon: "success",
          title: "Removed from bookmark",
          danger: true,
        });
      }
    });
  }
  return (
    <>
      {!isBookmarked ? (
        <Tooltip
          className="mt-2 mt-sm-0"
          title="Add to bookmark"
          placement="top-start"
          arrow
        >
          <IconButton  onClick={addBookmarkFun} className="addBookmarkIconBtn">
            <BookmarkAddOutlinedIcon style={{color: Bookmarkcolor ? Bookmarkcolor:""}} className="addBookmarkIcon" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          className="toolTip"
          title="Remove from bookmark"
          placement="top-start"
          arrow
        >
          <IconButton
            onClick={removeBookmarkFun}
            className="addBookmarkIconBtn"
          >
            <BookmarkRemoveOutlinedIcon style={{color: Bookmarkcolor ? Bookmarkcolor:""}}  className="addBookmarkIcon" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}

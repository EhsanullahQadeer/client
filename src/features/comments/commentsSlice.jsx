import { createSlice } from "@reduxjs/toolkit";
import {
  //create
  createCommentApi,
  replyToCommentApi,
  createReplyToReplyApi,
  //get
  getAllCommentsApi,
  getCommentRepliesApi,
  getReplyToCommentReplyApi,
  //update
  updateCommentApi,
  updateCommentReplyApi,
  updateReplyToReplyApi,
  //delete
  deleteCommentApi,
  deleteCommentReplyApi,
  deleteReplyToReplyApi,
} from "./commentThunk";



let initialState = {
  processing: false,
  comments: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [createCommentApi.pending]: (state) => {
      state.processing = true;
    },
    [createCommentApi.fulfilled]: (state, { payload }) => {
      state.processing = false;
    },
    [createCommentApi.rejected]: (state, { payload }) => {
      state.processing = false;
    },
    [getAllCommentsApi.fulfilled]: (state, { payload }) => {
      state.comments = payload;
    },
  },
});

export default commentSlice.reducer;

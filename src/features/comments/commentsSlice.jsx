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
  processing: {
    comment: false,
    replyToComment: false,
    showCommentReply: false,
    editCommentReply:false,
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [createCommentApi.pending]: (state) => {
      state.processing.comment = true;
    },
    [createCommentApi.fulfilled]: (state, { payload }) => {
      state.processing.comment = false;
    },
    [createCommentApi.rejected]: (state, { payload }) => {
      state.processing.comment = false;
    },
    [getAllCommentsApi.fulfilled]: (state, { payload }) => {},
    //
    [replyToCommentApi.pending]: (state) => {
      state.processing.replyToComment = true;
    },
    [replyToCommentApi.fulfilled]: (state) => {
      state.processing.replyToComment = false;
    },
    [replyToCommentApi.rejected]: (state) => {
      state.processing.replyToComment = false;
    },
    //
    [getCommentRepliesApi.pending]: (state) => {
      state.processing.showCommentReply = true;
    },
    [getCommentRepliesApi.fulfilled]: (state) => {
      state.processing.showCommentReply = false;
    },
    [getCommentRepliesApi.rejected]: (state) => {
      state.processing.showCommentReply = false;
    },
    //
    [updateCommentReplyApi.pending]: (state) => {
      state.processing.editCommentReply = true;
    },
    [updateCommentReplyApi.fulfilled]: (state) => {
      state.processing.editCommentReply = false;
    },
    [updateCommentReplyApi.rejected]: (state) => {
      state.processing.editCommentReply = false;
    },
  },
});

export default commentSlice.reducer;

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
    //
    comment: false,
    editComment: false,
    //
    replyToComment: false,
    replyToReply: false,
    //
    showCommentReply: false,
    showReplyToReply: false,
    //
    editCommentReply: false,
    editReplyToReply: false,
    //
    deleteComment: false,
    deleteReplyOfComent: false,
    deleteReplyOfReply: false,
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    //create
    [createCommentApi.pending]: (state) => {
      state.processing.comment = true;
    },
    [createCommentApi.fulfilled]: (state, { payload }) => {
      state.processing.comment = false;
    },
    [createCommentApi.rejected]: (state, { payload }) => {
      state.processing.comment = false;
    },
    //edit
    [updateCommentApi.pending]: (state) => {
      state.processing.editComment = true;
    },
    [updateCommentApi.fulfilled]: (state, { payload }) => {
      state.processing.editComment = false;
    },
    [updateCommentApi.rejected]: (state, { payload }) => {
      state.processing.editComment = false;
    },

    [getAllCommentsApi.fulfilled]: (state, { payload }) => {},
    //create
    [replyToCommentApi.pending]: (state) => {
      state.processing.replyToComment = true;
    },
    [replyToCommentApi.fulfilled]: (state) => {
      state.processing.replyToComment = false;
    },
    [replyToCommentApi.rejected]: (state) => {
      state.processing.replyToComment = false;
    },
    //create
    [createReplyToReplyApi.pending]: (state) => {
      state.processing.replyToReply = true;
    },
    [createReplyToReplyApi.fulfilled]: (state) => {
      state.processing.replyToReply = false;
    },
    [createReplyToReplyApi.rejected]: (state) => {
      state.processing.replyToReply = false;
    },
    ////get
    [getCommentRepliesApi.pending]: (state) => {
      state.processing.showCommentReply = true;
    },
    [getCommentRepliesApi.fulfilled]: (state) => {
      state.processing.showCommentReply = false;
    },
    [getCommentRepliesApi.rejected]: (state) => {
      state.processing.showCommentReply = false;
    },
    //get
    [getReplyToCommentReplyApi.pending]: (state) => {
      state.processing.showReplyToReply = true;
    },
    [getReplyToCommentReplyApi.fulfilled]: (state) => {
      state.processing.showReplyToReply = false;
    },
    [getReplyToCommentReplyApi.rejected]: (state) => {
      state.processing.showReplyToReply = false;
    },
    //edit
    [updateCommentReplyApi.pending]: (state) => {
      state.processing.editCommentReply = true;
    },
    [updateCommentReplyApi.fulfilled]: (state) => {
      state.processing.editCommentReply = false;
    },
    [updateCommentReplyApi.rejected]: (state) => {
      state.processing.editCommentReply = false;
    },
    //edit
    [updateReplyToReplyApi.pending]: (state) => {
      state.processing.editReplyToReply = true;
    },
    [updateReplyToReplyApi.fulfilled]: (state) => {
      state.processing.editReplyToReply = false;
    },
    [updateReplyToReplyApi.rejected]: (state) => {
      state.processing.editReplyToReply = false;
    },
    //delete
    [deleteCommentApi.pending]: (state) => {
      state.processing.deleteComment = true;
    },
    [deleteCommentApi.fulfilled]: (state) => {
      state.processing.deleteComment = false;
    },
    [deleteCommentApi.rejected]: (state) => {
      state.processing.deleteComment = false;
    },
    //delete
    [deleteCommentReplyApi.pending]: (state) => {
      state.processing.deleteReplyOfComent = true;
    },
    [deleteCommentReplyApi.fulfilled]: (state) => {
      state.processing.deleteReplyOfComent = false;
    },
    [deleteCommentReplyApi.rejected]: (state) => {
      state.processing.deleteReplyOfComent = false;
    },
    //delete
    [deleteReplyToReplyApi.pending]: (state) => {
      state.processing.deleteReplyOfReply = true;
    },
    [deleteReplyToReplyApi.fulfilled]: (state) => {
      state.processing.deleteReplyOfReply = false;
    },
    [deleteReplyToReplyApi.rejected]: (state) => {
      state.processing.deleteReplyOfReply = false;
    },
  },
});
export default commentSlice.reducer;

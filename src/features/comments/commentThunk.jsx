import { axiosConfig } from "../../functions/Functions";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosShowLoader } from "../../functions/Functions";
//create comment
export const createCommentApi = createAsyncThunk(
  "comment/createCommentApi",
  async (data, thunkAPI) => {
    return await axios.post(`comment/createComment`, data, axiosConfig);
  }
);

//replyToComment
export const replyToCommentApi = createAsyncThunk(
  "comment/replyToCommentApi",
  async (data, thunkAPI) => {
    const { commentId, text } = data;
    return await axios.post(
      `comment/replyToComment/${commentId}`,
      {
        text: text,
      },
      axiosConfig
    );
  }
);
//replyToReply
export const createReplyToReplyApi = createAsyncThunk(
  "comment/createReplyToReplyApi",
  async (data, thunkAPI) => {
    const { replyId, text } = data;
    debugger

    return axios.post(
      `comment/createReplyToReply/${replyId}`,
      {text},
      axiosConfig
    );
  }
);

//get
export const getAllCommentsApi = createAsyncThunk(
  "comment/getAllCommentsApi",
  async (data, thunkAPI) => {
    let { blogId, pageIndex } = data;
    return await axios.get(
      `comment/getAllComments/${blogId}?pageIndex=${pageIndex}`,
    );
  }
);
//get
export const getCommentRepliesApi = createAsyncThunk(
  "comment/getCommentRepliesApi",
  async (commentId, thunkAPI) => {
    return await axios.get(`comment/getCommentReplies/${commentId}`);
  }
);
// getReplyToCommentReply
export const getReplyToCommentReplyApi = createAsyncThunk(
  "comment/getReplyToCommentReplyApi",
  async (commentReplyId, thunkAPI) => {
    return await axios.get(`comment/getReplyToCommentReply/${commentReplyId}`);
  }
);

//updateComment
export const updateCommentApi = createAsyncThunk(
  "comment/updateCommentApi",
  async (data, thunkAPI) => {
    let { commentId, text } = data;
    return await axios.post(
      `comment/updateComment/${commentId}`,
     {text},
      axiosConfig
    );
  }
);
//updateCommentReply
export const updateCommentReplyApi = createAsyncThunk(
  "comment/updateCommentReplyApi",
  async (data, thunkAPI) => {
    let { replyId, text } = data;
    return await axios.post(
      `comment/updateCommentReply/${replyId}`,
      text,
      axiosConfig
    );
  }
);

//updateReplyToReply
export const updateReplyToReplyApi = createAsyncThunk(
  "comment/updateReplyToReplyApi",
  async (data, thunkAPI) => {
    let { replyToReplyId, text } = data;
    return await axios.post(
      `comment/updateReplyToReply/${replyToReplyId}`,
      text,
      axiosConfig
    );
  }
);

// delete comment
export const deleteCommentApi = createAsyncThunk(
  "comment/deleteCommentApi",
  async (commentId, thunkAPI) => {
    return await axios.post(
      `comment/deleteComment/${commentId}`,
      null,
      axiosConfig
    );
  }
);

// deleteCommentReply
export const deleteCommentReplyApi = createAsyncThunk(
  "comment/deleteCommentReplyApi",
  async (replyId, thunkAPI) => {
    return await axios.post(
      `comment/deleteCommentReply/${replyId}`,
      null,
      axiosConfig
    );
  }
);

//deleteReplyToReply
export const deleteReplyToReplyApi = createAsyncThunk(
  "comment/deleteReplyToReplyApi",
  async (replyToReplyId, thunkAPI) => {
    return await axios.post(
      `comment/deleteReplyToReply/${replyToReplyId}`,
      null,
      axiosConfig
    );
  }
);

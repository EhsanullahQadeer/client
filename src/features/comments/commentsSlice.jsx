import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  //create
  createComment,
  replyToComment,
  createReplyToReply,
  //get
  getAllComments,
  getCommentReplies,
  getReplyToCommentReply,
  //update
  updateComment,
  updateCommentReply,
  updateReplyToReply,
  //delete
  deleteComment,
  deleteCommentReply,
  deleteReplyToReply,
} from "./commentThunk";


//Create

//
export const createCommentApi = createAsyncThunk(
  "comment/createCommentApi",
  async (data, thunkAPI) => {
    return await createComment(data);
  }
);
//
export const replyToCommentApi = createAsyncThunk(
  "comment/replyToCommentApi",
  async (data, thunkAPI) => {
    return await replyToComment(data);
  }
);
//
export const createReplyToReplyApi = createAsyncThunk(
  "comment/createReplyToReplyApi",
  async (data, thunkAPI) => {
    return await createReplyToReply(data);
  }
);

//get

//
export const getAllCommentsApi = createAsyncThunk(
  "comment/getAllCommentsApi",
  async (data, thunkAPI) => {
    return await getAllComments(data);
  }
);
//
export const getCommentRepliesApi = createAsyncThunk(
  "comment/getCommentRepliesApi",
  async (data, thunkAPI) => {
    return await getCommentReplies(data);
  }
);
//
export const getReplyToCommentReplyApi = createAsyncThunk(
  "comment/getReplyToCommentReplyApi",
  async (data, thunkAPI) => {
    return await getReplyToCommentReply(data);
  }
);

//Update

//
export const updateCommentApi = createAsyncThunk(
  "comment/updateCommentApi",
  async (data, thunkAPI) => {
    return await updateComment(data);
  }
);
//
export const updateCommentReplyApi = createAsyncThunk(
  "comment/updateCommentReplyApi",
  async (data, thunkAPI) => {
    return await updateCommentReply(data);
  }
);
//
export const updateReplyToReplyApi = createAsyncThunk(
  "comment/updateReplyToReplyApi",
  async (data, thunkAPI) => {
    return await updateReplyToReply(data);
  }
);

//Delete

//
export const deleteCommentApi = createAsyncThunk(
  "comment/deleteCommentApi",
  async (commentId, thunkAPI) => {
    return await deleteComment(commentId);
  }
);
//
export const deleteCommentReplyApi = createAsyncThunk(
  "comment/deleteCommentReplyApi",
  async (replyId, thunkAPI) => {
    return await deleteCommentReply(replyId);
  }
);
//
export const deleteReplyToReplyApi = createAsyncThunk(
  "comment/deleteReplyToReplyApi",
  async (createReplyToReplyId, thunkAPI) => {
    return await deleteReplyToReply(createReplyToReplyId);
  }
);


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

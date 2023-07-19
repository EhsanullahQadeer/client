import { apiCall } from "../../CommonFunctions";

//create comment
export const createComment = async (data, thunkAPI) => {
  return await apiCall(`comment/createComment`, "post", data ,true);
};

//replyToComment
export const replyToComment = async (data, thunkAPI) => {
  const { commentId, text } = data;

  return await apiCall(`comment/replyToComment/${commentId}`, "post", {
    text: text,
  },true);
};
//createReplyToReply
export const createReplyToReply = async (data, thunkAPI) => {
  const { replyId, text } = data;
  return await apiCall(`comment/createReplyToReply/${replyId}`, "post", text ,true);
};

// getAllComments
export const getAllComments = async (data, thunkAPI) => {
  let {blogId,pageIndex}=data;
   return await apiCall(`comment/getAllComments/${blogId}?pageIndex=${pageIndex}`, 'get');
};

// getCommentReplies
export const getCommentReplies = async (commentId, thunkAPI) => {
  return await apiCall(`comment/getCommentReplies/${commentId}`, "get");
};

// getReplyToCommentReply
export const getReplyToCommentReply = async (commentReplyId, thunkAPI) => {
  return await apiCall(
    `comment/getReplyToCommentReply/${commentReplyId}`,
    "get"
  );
};

//updateComment

export const updateComment = async (data, thunkAPI) => {
  let { commentId, text } = data;
  return await apiCall(`comment/updateComment/${commentId}`, "post", text ,true);
};

//updateCommentReply

export const updateCommentReply = async (data, thunkAPI) => {
  let { replyId, text } = data;
  return await apiCall(`comment/updateCommentReply/${replyId}`, "post", text, true);
};

//updateReplyToReply
export const updateReplyToReply = async (data, thunkAPI) => {
  let { replyToReplyId, text } = data;
  return await apiCall(
    `comment/updateReplyToReply/${replyToReplyId}`,
    "post",
    text,
    true
  );
};

// delete comment
export const deleteComment = async (commentId, thunkAPI) => {
  return await apiCall(`comment/deleteComment/${commentId}`, "post","",true);
};

// deleteCommentReply
export const deleteCommentReply = async (replyId, thunkAPI) => {
  return await apiCall(`comment/deleteCommentReply/${replyId}`, "post" ,"",true);
};
//deleteReplyToReply
export const deleteReplyToReply = async (deleteReplyToReply, thunkAPI) => {
  return await apiCall(`comment/deleteReplyToReply/${replyToReplyId}`, "post" ,"",true);
};

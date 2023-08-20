import axios from "axios";
import { axiosConfig } from "../../functions/Functions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosShowLoader } from "../../functions/Functions";
import { axiosLoader_Auth } from "../../functions/Functions";
import { createPostAsyncThunk } from "../../functions/CreateAsyncThunk";
export const setupGetTopWritters = createAsyncThunk(
  "writer/setupGetTopWritters",
  async (data) => {
    let {pageIndex,pageSize} = data;
    return await axios.get(
      `writer/topWritters?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      pageIndex > 1 ? "" : axiosShowLoader
    );
  }
);
export const setupGetSingleWriter = createAsyncThunk(
  "writer/setupGetSingleWriter",
  async (writerId) => {
    return await axios.get(`writer/getSingleWriter/${writerId}`);
  }
);
export const setupGetCurrentWriter = createAsyncThunk(
  "writer/setupGetCurrentWriter",
  async () => {
    return await axios.get(`writer/currentWritter`, axiosConfig);
  }
);

export const setupUpdateWriter = createAsyncThunk(
  "writer/setupUpdateWriter",
  async (data, thunkAPI) => {
    let writerId = thunkAPI.getState().writerRequest.currentWriterInfo._id;
    return await axios.post(
      `writer/updateWriter/${writerId}`,
      data,
      axiosLoader_Auth
    );
  }
);

export const getWriterImage = createAsyncThunk(
  "writer/getWriterImage",
  async (imageFile, thunkAPI) => {
    let writerId = thunkAPI.getState().writerRequest.currentWriterInfo._id;
    const formData = new FormData();
    formData.append("writerPhoto", imageFile);
    return await axios.post(
      `writer/uploadWritterProfileImage/${writerId}`,
      formData,
      axiosConfig
    );
  }
);

export const removeWriterImageApi = createAsyncThunk(
  "writer/removeWriterImageApi",
  async (imgUrl, thunkAPI) => {
    let writerId = thunkAPI.getState().writerRequest.currentWriterInfo._id;
    return await axios.post(
      `writer/removeWritterProfileImage/${writerId}`,
      imgUrl,
      axiosConfig
    );
  }
);

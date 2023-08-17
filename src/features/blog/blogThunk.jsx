import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../functions/Functions";
import { axiosShowLoader } from "../../functions/Functions";

export const setupCreateBlog = createAsyncThunk(
  "blog/setupCreateBlog",
  async (blogData, thunkAPI) => {
    return await axios.post(`blog/`, blogData);
  }
);
//
export const getSingleCategoryBlogsApi = createAsyncThunk(
  "blog/getSingleCategoryBlogsApi",
  async (data, thunkAPI) => {
    let pageIndex=data.pageIndex;
    return await axios.get(
      `blog/getSingleCategoryBlogs?pageIndex=${pageIndex}&pageSize=${data.pageSize}&category=${data.category}&storyType=${data.storyType}`,
      pageIndex > 1?undefined:axiosShowLoader
    );
  }
);
//
export const getAllBLogsApi = createAsyncThunk(
  "blog/getAllBLogsApi",
  async (pageIndex) => {
    let pageSize = 13;
    return await axios.get(
      `blog/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    pageIndex > 1?'':axiosShowLoader

    );
  }
);
export const getSingleBlogsApi = createAsyncThunk(
  "blog/getSingleBlogsApi",
  async (data) => {
    debugger
    const { blogId, userId } = data;
    return await axios.get(
      `blog/singleBlog/${blogId}/${userId}`,
      axiosShowLoader
    );
  }
);
//
export const LikeSingleBlogApi = createAsyncThunk(
  "blog/LikeSingleBlog",
  async (blogId) => {
    return await axios.post(`blog/LikeSingleBlog/${blogId}`, null, axiosConfig);
  }
);
//
export const getTrendingBlogsApi = createAsyncThunk(
  "blog/getTrendingBlogsApi",
  async () => {
    return await axios.get("blog/trendingBlogs", axiosShowLoader);
  }
);
//
export const getsingleWriterBlogsApi = createAsyncThunk(
  "blog/getsingleWriterBlogsApi",
  async (writerData) => {
    return await axios.get(
      `blog/singleWriterBlogs?writerId=${writerData.writerId}&&articlesType=${writerData.articlesType}&pageIndex=${writerData.pageIndex}&pageSize=${writerData.pageSize}`
    );
  }
);
//
export const uploadBlogImgsApi = createAsyncThunk(
  "writer/getWriterImage",
  async (formData, thunkAPI) => {
    return await axios.post(`blog/uploadBlogImgs`, formData);
  }
);
//
export const getRecentViewedBlogsApi = createAsyncThunk(
  "blog/getRecentViewedBlogsApi",
  async (data, thunkAPI) => {
    return await axios.get(
      `recent/getRecentlyViewedBlogs/${data?.userId}?pageIndex=${
        data?.pageIndex || 1
      }&pageSize=${data?.pageSize || 10}`
    );
  }
);
//
export const addBookmarkApi = createAsyncThunk(
  "blog/addBookmarkApi",
  async (data, thunkAPI) => {
    return await axios.post(
      `recent/addBookmark/${data?.blogId}`,
      null,
      axiosConfig
    );
  }
);
//
export const removeBookmarkApi = createAsyncThunk(
  "blog/removeBookmarkApi",
  async (data, thunkAPI) => {
    return await axios.post(
      `recent/removeBookmark/${data?.blogId}`,
      null,
      axiosConfig
    );
  }
);
//
export const getBookmarkApi = createAsyncThunk(
  "blog/getBookmarkApi",
  async (data, thunkAPI) => {
    return await axios.get(
      `recent/getBookmark/${data?.userId}?pageIndex=${
        data?.pageIndex || 1
      }&pageSize=${data?.pageSize || 10}`
    );
  }
);

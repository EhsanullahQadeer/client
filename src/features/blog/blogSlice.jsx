import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createBlog,
  getAllBlogs,
  getSingleBlogs,
  getSingleCategoryBlogs,
  getTrendingBlogs,
  getTopStories,
  getsingleWriterBlogs,
  uploadBlogImgs,
  getRecentViewedBlogs,
  addBookmark,
  removeBookmark,
  getBookmark,
  LikeSingleBlog,
} from "./blogThunk";
//
export const setupCreateBlog = createAsyncThunk(
  "blog/setupCreateBlog",
  async (data, thunkAPI) => {
    return await createBlog(data, thunkAPI);
  }
);
//
export const getSingleCategoryBlogsApi = createAsyncThunk(
  "blog/getSingleCategoryBlogsApi",
  async (data, thunkAPI) => {
    return await getSingleCategoryBlogs(data, thunkAPI);
  }
);
//
export const getAllBLogsApi = createAsyncThunk(
  "blog/getAllBLogsApi",
  async (page) => {
    return await getAllBlogs(page);
  }
);
//
export const getSingleBlogsApi = createAsyncThunk(
  "blog/getSingleBlogsApi",
  async (data) => {
    return await getSingleBlogs(data);
  }
);
//
export const LikeSingleBlogApi = createAsyncThunk(
  "blog/LikeSingleBlog",
  async (data) => {
    return await LikeSingleBlog(data);
  }
);
//
export const getTrendingBlogsApi = createAsyncThunk(
  "blog/getTrendingBlogsApi",
  async () => {
    return await getTrendingBlogs();
  }
);
//
export const getTopStoriesApi = createAsyncThunk(
  "blog/getTopStoriesApi",
  async (data) => {
    return await getTopStories(data);
  }
);
//
export const getsingleWriterBlogsApi = createAsyncThunk(
  "blog/getsingleWriterBlogsApi",
  async (writerData) => {
    return await getsingleWriterBlogs(writerData);
  }
);
//
export const uploadBlogImgsApi = createAsyncThunk(
  "writer/getWriterImage",
  async (formData, thunkAPI) => {
    return await uploadBlogImgs(formData, thunkAPI);
  }
);
//
export const getRecentViewedBlogsApi = createAsyncThunk(
  "blog/getRecentViewedBlogsApi",
  async (data, thunkAPI) => {
    return await getRecentViewedBlogs(data, thunkAPI);
  }
);
//
export const addBookmarkApi = createAsyncThunk(
  "blog/addBookmarkApi",
  async (data, thunkAPI) => {
    return await addBookmark(data, thunkAPI);
  }
);
//
export const removeBookmarkApi = createAsyncThunk(
  "blog/removeBookmarkApi",
  async (data, thunkAPI) => {
    return await removeBookmark(data, thunkAPI);
  }
);
//
export const getBookmarkApi = createAsyncThunk(
  "blog/getBookmarkApi",
  async (data, thunkAPI) => {
    return await getBookmark(data, thunkAPI);
  }
);

let initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  blogs: [],
  singleBlog: [],
  singleCategorsBlogs: [],
  TrendingBlogs: [],
  singleWritterBlogs: [],
  topStories: [],
  isBookmarked: false,
  // recentViewedBlogs:[],
  loadMore: true,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    removeAlert: (state) => {
      state.isLoading = false;
      (state.alertText = ""), (state.alertType = ""), (state.showAlert = false);
    },
  },
  extraReducers: {
    //
    [setupCreateBlog.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = "Your Blog is Added Successfully";
      state.alertType = "success";
    },
    [setupCreateBlog.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = payload;
      state.alertType = "danger";
    },
    //
    [getAllBLogsApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllBLogsApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.blogs = payload[0].data;
    },
    [getAllBLogsApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = payload;
      state.alertType = "danger";
    },
    //
    [getSingleBlogsApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleBlogsApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singleBlog = payload.Blog;
    },
    [getSingleBlogsApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = payload;
      state.alertType = "danger";
    },
    //
    [getSingleCategoryBlogsApi.pending]: (state) => {
      state.isLoading = true;
      state.loadMore = true;
    },
    [getSingleCategoryBlogsApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singleCategorsBlogs = payload[0]?.data;
      if (payload[0]?.data?.length == 0) {
        state.loadMore = false;
      } else {
        state.loadMore = true;
      }
    },
    [getSingleCategoryBlogsApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = payload;
      state.alertType = "danger";
    },
    //
    [getTrendingBlogsApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getTrendingBlogsApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.TrendingBlogs = payload;
    },
    [getTrendingBlogsApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = payload;
      state.alertType = "danger";
    },
    //
    [getTopStoriesApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getTopStoriesApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.topStories = payload[0].topStories;
      state.singleCategorsBlogs = payload[0].topStories;
      if (payload[0]?.topStories?.length == 0) {
        state.loadMore = false;
      } else {
        state.loadMore = true;
      }
    },
    [getTopStoriesApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    //
    [getsingleWriterBlogsApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getsingleWriterBlogsApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singleWritterBlogs = payload;
      if (payload?.length == 0) {
        state.loadMore = false;
      } else {
        state.loadMore = true;
      }
    },
    [getsingleWriterBlogsApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = payload;
      state.alertType = "danger";
    },
    //
    [getRecentViewedBlogsApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecentViewedBlogsApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      // state.recentViewedBlogs=payload;
      state.singleWritterBlogs = payload;
      console.log(payload.length);
      if (payload.length == 0) {
        state.loadMore = false;
      } else {
        state.loadMore = true;
      }
    },
    [getRecentViewedBlogsApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    //
    [addBookmarkApi.pending]: (state) => {
      state.isLoading = true;
    },
    [addBookmarkApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isBookmarked = true;
    },
    [addBookmarkApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    //
    [removeBookmarkApi.pending]: (state) => {
      state.isLoading = true;
    },
    [removeBookmarkApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isBookmarked = false;
    },
    [removeBookmarkApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    //
    [getBookmarkApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getBookmarkApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singleWritterBlogs = payload;
      if (payload.length == 0) {
        state.loadMore = false;
      } else {
        state.loadMore = true;
      }
    },
    [getBookmarkApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },

    //
    //
    // [uploadBlogImgsApi.pending]: (state) => {
    //   // state.imgLoading = true;
    //  },
    //  [uploadBlogImgsApi.fulfilled]: (state, { payload }) => {
    //   //  state.imgLoading = false;
    //   //  state.image = payload.imgUrl ;
    //  },
    //  [uploadBlogImgsApi.rejected]: (state, payload) => {
    //   //  state.imgLoading = false;
    //  },
  },
});

export const { removeAlert } = blogSlice.actions;

export default blogSlice.reducer;

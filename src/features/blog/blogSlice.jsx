import { createSlice} from "@reduxjs/toolkit";
import {
  setupCreateBlog,
  getSingleCategoryBlogsApi,
  getAllBLogsApi,
  getSingleBlogsApi,
  LikeSingleBlogApi,
  getTrendingBlogsApi,
  getsingleWriterBlogsApi,
  uploadBlogImgsApi,
  getRecentViewedBlogsApi,
  addBookmarkApi,
  removeBookmarkApi,
  getBookmarkApi,
} from "./blogThunk";


let initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  blogs: [],
  singleBlog: [],
  TrendingBlogs: [],
  singleWritterBlogs: [],
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
    [getSingleBlogsApi.rejected]: (state, response) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = response.payload;
      state.alertType = "danger";
    },
    //
    [getSingleCategoryBlogsApi.pending]: (state) => {
      state.isLoading = true;
      state.loadMore = true;
    },
    [getSingleCategoryBlogsApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
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

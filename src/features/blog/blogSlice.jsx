import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createBlog,getAllBlogs,getSingleBlogs,
  getSingleCategoryBlogs,
  getTrendingBlogs,
  getsingleWriterBlogs
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
export const getAllBLogsApi=createAsyncThunk(
  "blog/getAllBLogsApi",
  async (page)=>{
    return await getAllBlogs(page)
  }
)
//
export const getSingleBlogsApi=createAsyncThunk(
  "blog/getSingleBlogsApi",
  async (blogId)=>{
    return await getSingleBlogs(blogId)
  }
)
//
export const getTrendingBlogsApi=createAsyncThunk(
  "blog/getTrendingBlogsApi",
  async ()=>{
    return await getTrendingBlogs()
  }
)
//

export const getsingleWriterBlogsApi=createAsyncThunk(
  "blog/getsingleWriterBlogsApi",
  async (writerData)=>{
    return await getsingleWriterBlogs(writerData)
  }
)



let initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  blogs:[],
  singleBlog:[],
  singleCategorsBlogs:[],
  TrendingBlogs:[],
  singleWritterBlogs:[],
  loadMore:true
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
      state.blogs=payload[0].data
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
      state.singleBlog=payload.Blog
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
      state.loadMore=true;
    },
    [getSingleCategoryBlogsApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singleCategorsBlogs=payload[0]?.data;
      if(payload[0]?.data?.length==0){
        state.loadMore=false
      }else{
        state.loadMore=true
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
      state.TrendingBlogs=payload;
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
      state.singleWritterBlogs=payload;
      if(payload?.length==0){
        state.loadMore=false;
      }else{
        state.loadMore=true;
      }
    },
    [getsingleWriterBlogsApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = payload;
      state.alertType = "danger";
    },
    
  },
});

export const { removeAlert } = blogSlice.actions;

export default blogSlice.reducer;

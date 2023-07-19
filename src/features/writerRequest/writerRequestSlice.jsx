import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Writer_Files_URL } from "../../utils";
let initialState = {
  isLoading: false,
  alertText: "",
  alertType: "",
  showAlert: false,
  currentWriterInfo: [],
  topWriters:[],
  singleWriter:{},
  image: "",
  imgLoading:false,
  loadMore:false
};

import {
  getCurrentWriter,
  writerImage,
  updateCurrentWriter,
  removeWriterImage,
  getTopWritters,
  getSingleWriter
} from "./writerRequestThunk";

export const setupGetTopWritters = createAsyncThunk(
  "writer/setupGetTopWritters",
  async(data)=>{
   return await getTopWritters(data)
  }    
);
export const setupGetSingleWriter = createAsyncThunk(
  "writer/setupGetSingleWriter",
  async(writerID)=>{
   return await getSingleWriter(writerID)
  }    
);
export const setupGetCurrentWriter = createAsyncThunk(
  "writer/setupGetCurrentWriter",
  async()=>{
   return await getCurrentWriter()
  }    
);

export const setupUpdateWriter = createAsyncThunk(
  "writer/setupUpdateWriter",
  async (data, thunkAPI) => {
    return await updateCurrentWriter(data, thunkAPI);
  }
);

export const getWriterImage = createAsyncThunk(
  "writer/getWriterImage",
  async (imageFile, thunkAPI) => {
    return await writerImage(imageFile, thunkAPI);
  }
);
export const removeWriterImageApi = createAsyncThunk(
  "writer/removeWriterImageApi",
  async (imgUrl, thunkAPI) => {
    return await removeWriterImage(imgUrl, thunkAPI);
  }
);




const writerRequestSlice = createSlice({
  name: "writerRequest",
  initialState,
  reducers: {
    removeAlert: (state) => {
      state.isLoading = false;
      (state.alertText = ""), (state.alertType = ""), (state.showAlert = false);
    },
    dispalyAlert: (state, action) => {
      (state.isLoading = true),
        (state.alertText = action.payload.alertText),
        (state.alertType = action.payload.alertType),
        (state.showAlert = true);
    },
    // removeWriterImage: (state) => {
    //   state.image = "";
    // },
  },
  extraReducers: {
    //
    [setupGetCurrentWriter.pending]: (state) => {
      state.isLoading = true;
    },
    [setupGetCurrentWriter.fulfilled]: (state, { payload }) => {
      let imgUrl;
      if(payload.currentWriter.photo){
        imgUrl=Writer_Files_URL+payload.currentWriter.photo;
      }
      state.currentWriterInfo = payload.currentWriter;
      state.image =imgUrl;
      state.isLoading = false;
    },
    [setupGetCurrentWriter.rejected]: (state, payload) => {
      state.isLoading = false;
    },
    //
    [setupGetTopWritters.pending]: (state) => {
      state.isLoading = true;
    },
    [setupGetTopWritters.fulfilled]: (state, { payload }) => {
      state.topWriters = payload.topWritters;
      state.isLoading = false;
      if(payload.topWritters.length==0){
        state.loadMore=false
      }else{
        state.loadMore=true
      }


    },
    [setupGetTopWritters.rejected]: (state, payload) => {
      state.isLoading = false;
    },
    //
    [setupUpdateWriter.pending]:(state) => {
      state.isLoading = true;
    },
    [setupUpdateWriter.fulfilled]: (state, { payload }) => {
      debugger
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Writer Updated Successfully";
    },
    [setupUpdateWriter.rejected]: (state, { payload }) => {
      (state.showAlert = true),
        (state.alertType = "danger"),
        (state.alertText = payload);
    },
    
    //
    [getWriterImage.pending]: (state) => {
     state.imgLoading = true;
    },
    [getWriterImage.fulfilled]: (state, { payload }) => {
      let imgUrl=Writer_Files_URL+payload.imgUrl;
      state.imgLoading = false;
      state.image = imgUrl;
    },
    [getWriterImage.rejected]: (state, payload) => {
      state.imgLoading = false;
    },
    //
  [removeWriterImageApi.pending]: (state) => {
    state.imgLoading = true;
  },
    [removeWriterImageApi.fulfilled]: (state, { payload }) => {
      state.imgLoading = false;
      // state.alertType = "success";
      // state.alertText = "Image Removed Successfully";
      state.image="";
    },
    [removeWriterImageApi.rejected]: (state, { payload }) => {
      state.imgLoading = false;
      // (state.showAlert = true),
      //   (state.alertType = "danger"),
      //   (state.alertText = payload);
    },
    //
    [setupGetSingleWriter.pending]: (state) => {
    state.isLoading = true;
    },
    [setupGetSingleWriter.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singleWriter=payload.writer;
    },
    [setupGetSingleWriter.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },



    
  },
});
// removeWriterImage
export const { removeAlert, dispalyAlert,  } =
  writerRequestSlice.actions;

export default writerRequestSlice.reducer;

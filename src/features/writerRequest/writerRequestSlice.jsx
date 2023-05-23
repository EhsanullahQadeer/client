import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  alertText: "",
  alertType: "",
  showAlert: false,
  currentWriterInfo: [],
  image: "",
  imgLoading:false
};

import {
  getCurrentWriter,
  writerImage,
  updateCurrentWriter,
  removeWriterImage
} from "./writerRequestThunk";

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
  async (event, thunkAPI) => {
    return await writerImage(event, thunkAPI);
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
      state.currentWriterInfo = payload.currentWriter;
      state.image = payload.currentWriter.photo;
      state.isLoading = false;
    },
    [setupGetCurrentWriter.rejected]: (state, payload) => {
      state.isLoading = false;
    },
    //
    [setupUpdateWriter.pending]:(state) => {
      state.isLoading = true;
    },
    [setupUpdateWriter.fulfilled]: (state, { payload }) => {
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
      state.imgLoading = false;
      state.image = payload.imgUrl ;
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



    
  },
});
// removeWriterImage
export const { removeAlert, dispalyAlert,  } =
  writerRequestSlice.actions;

export default writerRequestSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  alertText: "",
  alertType: "",
  showAlert: false,
  currentWriterInfo: [],
  image: "",
};

import {
  getCurrentWriter,
  writerImage,
  updateCurrentWriter,
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
    return updateCurrentWriter(data, thunkAPI);
  }
);

export const getWriterImage = createAsyncThunk(
  "writer/getWriterImage",
  async (event, thunkAPI) => {
    return writerImage(event, thunkAPI);
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
    removeWriterImage: (state) => {
      state.image = "";
    },
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
    [getWriterImage.fulfilled]: (state, { payload }) => {
      state.image = payload.data.secure_url;
    },
    [getWriterImage.rejected]: (state, payload) => {
    },
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
  },
});

export const { removeAlert, dispalyAlert, removeWriterImage } =
  writerRequestSlice.actions;

export default writerRequestSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Writer_Files_URL } from "../../utils";
import {
  setupGetTopWritters,
  setupGetSingleWriter,
  setupGetCurrentWriter,
  setupUpdateWriter,
  getWriterImage,
  removeWriterImageApi,
} from "./writerRequestThunk";

let initialState = {
  isLoading: false,
  alertText: "",
  alertType: "",
  showAlert: false,
  currentWriterInfo: [],
  singleWriter: {},
  image: "",
  imgLoading: false,
  loadMore: false,
};

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
      if (payload.currentWriter.photo) {
        imgUrl = Writer_Files_URL + payload.currentWriter.photo;
      }
      state.currentWriterInfo = payload.currentWriter;
      state.image = imgUrl;
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
      state.isLoading = false;
    },
    [setupGetTopWritters.rejected]: (state, payload) => {
      state.isLoading = false;
    },
    //
    [setupUpdateWriter.pending]: (state) => {
      state.isLoading = true;
    },
    [setupUpdateWriter.fulfilled]: (state, { payload }) => {
      state.showAlert = true;
      state.isLoading=false;
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
      let imgUrl = Writer_Files_URL + payload.imgUrl;
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
      state.image = "";
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
      state.singleWriter = payload.writer;
    },
    [setupGetSingleWriter.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});
// removeWriterImage
export const { removeAlert, dispalyAlert } = writerRequestSlice.actions;

export default writerRequestSlice.reducer;

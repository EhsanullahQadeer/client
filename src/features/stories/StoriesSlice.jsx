import { createSlice } from "@reduxjs/toolkit";
import { getStoriesApi, viewStoryApi } from "./StoriesThunk";

let initialState = {
  stories: [],
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: {
    [getStoriesApi.pending]: (state) => {},
    [getStoriesApi.fulfilled]: (state, { payload }) => {
      state.stories = payload;
    },
    [getStoriesApi.rejected]: (state, { payload }) => {},
  },
});

export default storiesSlice.reducer;

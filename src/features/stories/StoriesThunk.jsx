import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosShowLoader } from "../../functions/Functions";
//
export const getStoriesApi = createAsyncThunk(
  "stories/getStoriesApi",
  async (data) => {
    let {userId,pageIndex}=data;
    return await axios.get(
      `stories/getStories/${userId}?pageIndex=${pageIndex}`,
      pageIndex > 1 ? '' : axiosShowLoader
    );
  }
);
//
export const viewStoryApi = createAsyncThunk(
  "stories/viewStoryApi",
  async (data) => {
    return await axios.post(
      `stories/viewStory/${data.userId || 404}/${data.storyId || 404}`
    );
  }
);

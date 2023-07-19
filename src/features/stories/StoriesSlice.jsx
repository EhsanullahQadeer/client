import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStories,viewStory } from "./StoriesThunk";

//
export const getStoriesApi = createAsyncThunk(
  "stories/getStoriesApi",
  async (pageIndex) => {
    return await getStories(pageIndex);
  }
);
//
export const viewStoryApi = createAsyncThunk(
  "stories/viewStoryApi",
  async (data) => {
    return await viewStory(data);
  }
);

let initialState = {
  stories:[]
  };

const storiesSlice = createSlice({
    name: "stories",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getStoriesApi.pending]:(state)=>{
         
        },
        [getStoriesApi.fulfilled]:(state,{payload})=>{
          state.stories=payload;
        },
        [getStoriesApi.rejected]:(state,{payload})=>{

        },
    }
    })

    export default storiesSlice.reducer;
    

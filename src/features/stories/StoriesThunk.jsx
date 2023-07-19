import axios from "axios";
import { BACK_END_URL } from "../../utils";

//get stories
export const getStories=async (pageIndex,thunkAPI)=>{
    try {
      let response= await axios.get(`${BACK_END_URL}/stories/getStories?pageIndex=${pageIndex}`)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
  //View story 
  export const viewStory=async (data,thunkAPI)=>{
    try {
      let response= await axios.post(`${BACK_END_URL}/stories/viewStory/${data.userId ||404}/${data.storyId ||404}`)
      return response.data;
    } catch (error) {
      console.log(error)
      deugger
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
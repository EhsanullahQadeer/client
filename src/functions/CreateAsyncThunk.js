import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export function createPostAsyncThunk(typePrefix, url,config) {
    return createAsyncThunk(typePrefix, async (data, thunkAPI) => {
      try {
        return await axios.post(url, data,config);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    });
  }
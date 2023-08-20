import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosShowLoader } from "../../functions/Functions";
import { createPostAsyncThunk } from "../../functions/CreateAsyncThunk";

export const checkActiveUserApi = createPostAsyncThunk(
  "user/checkActiveUserApi",
  `auth/checkActiveUser`,
  axiosShowLoader
);

//
export const setupUserRegisternApi = createPostAsyncThunk(
  "user/setupUserRegister",
  `auth/register`
);

export const setupUserLoginApi = createPostAsyncThunk(
  "user/setupUserLogin",
  `auth/login`
);
//......................................................................................
export const GoogleAuthApi = createAsyncThunk(
  "user/GoogleAuthApi",
  async (data, thunkAPI) => {
    return axios.post(`googleLogin`, {
      idToken: data.credential,
    });
  }
);
//......................................................................................
export const ForgetPasswordApi = createAsyncThunk(
  "user/ForgetPasswordApi",
  async (data, thunkAPI) => {
    return axios.post(`auth/forgetPassword`, {
      email: data,
    });
  }
);
//......................................................................................
export const ResetPasswordApi = createAsyncThunk(
  "user/ResetPasswordApi",
  async (data, thunkAPI) => {
    return axios.post(`auth/resetPassword`, {
      email: data.email,
      token: data.token,
      password: data.password,
    });
  }
);

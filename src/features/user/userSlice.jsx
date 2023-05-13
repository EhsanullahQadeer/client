import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  setupUserRole,
  setupUserLogin,
  setupUserRegister,
  userImage,
  setupForgetPassword,
  setupResetPassword,
  GoogleAuth,
} from "./userThunk";


export const setupUserRoleApi = createAsyncThunk(
  "user/setupUserRole",
  async(userId,thunkAPI)=>{
   return await setupUserRole(userId)
  }    
);

export const setupUserRegisternApi = createAsyncThunk(
   "user/setupUserRegister",
  async (data, thunkAPI) => {
    return await setupUserRegister(data, "register", thunkAPI);
  }
);
export const setupUserLoginApi = createAsyncThunk(
  "user/setupUserLogin",
  async (data, thunkAPI) => {
    return  await setupUserLogin(data, "login", thunkAPI);
  }
);
//
export const GoogleAuthApi = createAsyncThunk(
  "user/setupUserLogin",
  async (data, thunkAPI) => {
    return GoogleAuth(data, "googleLogin", thunkAPI);
  }
);


export const ForgetPasswordApi = createAsyncThunk(
  "user/ForgetPasswordApi",
  async (data, thunkAPI) => {
    return setupForgetPassword(data, "forgetPassword", thunkAPI);
  }
);

export const ResetPasswordApi = createAsyncThunk(
  "user/ResetPasswordApi",
  async (data, thunkAPI) => {
    return setupResetPassword(data, "resetPassword", thunkAPI);
  }
);

// This is needed if we are doing this in the backend
export const uploadUserImage = createAsyncThunk(
  "user/userImage",
  async (event, thunkAPI) => {
    return userImage(event, thunkAPI);
  }
);

function addUserToLocalStorage(user, token,userId) {
  localStorage.setItem("user", (user));
  localStorage.setItem("Token",(token));
  localStorage.setItem("userId",(userId));
}


let initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("Token") || "",
  userId:localStorage.getItem("userId") || "",
  userImage: "",
  role:"",
  writter:""
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeAlert: (state) => {
      state.isLoading = false;
      (state.alertText = ""), (state.alertType = ""), (state.showAlert = false);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = "";
    },
    deleteUserImage: (state) => {
      state.userImage = "";
    },
  },
  extraReducers: {
    //
    [setupUserRoleApi.pending]:(state)=>{
      state.isLoading = true;
    },
    [setupUserRoleApi.fulfilled]:(state, { payload })=>{
      state.role=payload.role;
      state.writter=payload.writer;
      state.isLoading = false;
    },
    [setupUserRoleApi.rejected]:(state, { payload }) => {
      state.isLoading = false;
    },

    //
    [setupUserLoginApi.pending]: (state) => {
      state.isLoading = true;
    },
    
    [setupUserLoginApi.fulfilled]: (state, { payload }) => {
      state.role = payload.role;
      state.writter=payload.writer;
      state.token = payload.token;
      state.userId=payload.userId;
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Login Success! Redirecting";
      addUserToLocalStorage(payload.role, payload.token,payload.userId);
    },
    [setupUserLoginApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload;
    },

     //this is causing issue
    // [GoogleAuthApi.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [GoogleAuthApi.fulfilled]: (state, { payload }) => {
    //   state.user = payload.user;
    //   state.token = payload.token;
    //   state.isLoading = false;
    //   state.showAlert = true;
    //   state.alertType = "success";
    //   state.alertText = "Auth Success!";
    //   addUserToLocalStorage(payload.user, payload.token);
    // },
    // [GoogleAuthApi.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.showAlert = true;
    //   state.alertType = "danger";
    //   state.alertText = payload;
    // },

    
    [setupUserRegisternApi.pending]: (state) => {
      state.isLoading = true;
    },
    [setupUserRegisternApi.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Register Success!";
      addUserToLocalStorage(payload.user, payload.token);
    },
    [setupUserRegisternApi.rejected]: (state, { payload }) => {
      debugger
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload;
    },

    
    [ForgetPasswordApi.pending]: (state) => {
      state.isLoading = true;
    },
    [ForgetPasswordApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Please Check Your Email For Reset Password";
    },
    [ForgetPasswordApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload;
    },

    

    
    [ResetPasswordApi.pending]: (state) => {
      state.isLoading = true;
    },
    [ResetPasswordApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Password Is Reset Successfully";
    },
    [ResetPasswordApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload;
    },

    
    [uploadUserImage.fulfilled]: (state, { payload }) => {
      state.userImage = payload.data.secure_url;
      state.isLoading = false;
    },
    [uploadUserImage.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadUserImage.rejected]: (state, props) => {
      console.log(props);
      state.isLoading = false;
    },
  },
});

export const { removeAlert, logoutUser, deleteUserImage, changeLight } =
  userSlice.actions;

export default userSlice.reducer;

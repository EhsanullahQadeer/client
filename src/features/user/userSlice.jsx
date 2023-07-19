import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkActiveUser,
  setupUserLogin,
  setupUserRegister,
  userImage,
  setupForgetPassword,
  setupResetPassword,
  GoogleAuth,
  
} from "./userThunk";


export const checkActiveUserApi = createAsyncThunk(
  "user/checkActiveUserApi",
  async(data,thunkAPI)=>{
   return await checkActiveUser(data)
  }    
);
//
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
  "user/GoogleAuthApi",
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
function removeUserFromLocalStorage(){
  localStorage.removeItem("user");
  localStorage.removeItem("Token"),
  localStorage.removeItem("userId");
  localStorage.removeItem("writerId");
}
function checkRoleAndSetToLocalStorage(payload){
  //it means user is writter
  if(payload.isApproved){
   localStorage.setItem("writerId",payload._id);
  }else{
   localStorage.removeItem("writerId");

  }
}


let initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("Token") || "",
  userId:localStorage.getItem("userId") || "",
  writerId:localStorage.getItem("writerId") || "",
  userImage: "",
  role:"",
  writter:"",
  activeUser:null
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => initialState,
    removeAlert: (state) => {
      state.isLoading = false;
      (state.alertText = ""), (state.alertType = ""), (state.showAlert = false);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = "";
      state.writerId="";
      state.userId=""
      state.activeUser=null;
      removeUserFromLocalStorage();
    },
    updateActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    deleteUserImage: (state) => {
      state.userImage = "";
    },
  },
  extraReducers: {
    //
    [checkActiveUserApi.fulfilled]:(state, { payload })=>{
      state.activeUser=payload;
      if(payload?.isApproved){
        state.writerId=payload._id;
      }else{
        state.writerId="";
      }
      checkRoleAndSetToLocalStorage(payload);
    },
    //
    [setupUserLoginApi.pending]: (state) => {
      state.isLoading = true;
    },
    
    [setupUserLoginApi.fulfilled]: (state, { payload }) => {
      state.writerId=""
      state.role = payload.role;
      state.writter=payload.writer;
      state.token = payload.token;
      state.userId=payload.userId;
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Login Success! Redirecting";
      removeUserFromLocalStorage();
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
      // state.user = payload.user;
      // state.token = payload.token;
      // state.isLoading = false;
      // state.showAlert = true;
      // state.alertType = "success";
      // state.alertText = "Register Success!";
      // addUserToLocalStorage(payload.user, payload.token);
      state.writerId=""
      state.role = payload.role;
      state.writter=payload.writer;
      state.token = payload.token;
      state.userId=payload.userId;
      state.isLoading = false;
      removeUserFromLocalStorage();
      addUserToLocalStorage(payload.role, payload.token,payload.userId);
    },
    [setupUserRegisternApi.rejected]: (state, { payload }) => {
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
      state.isLoading = false;
    },
  },
});

export const { removeAlert, logoutUser, deleteUserImage, changeLight,resetState,updateActiveUser} =
  userSlice.actions;

export default userSlice.reducer;

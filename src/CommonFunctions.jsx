import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RedirectToLoginAlert } from "./componenets/Alert/Alerts";
import { BACK_END_URL } from "./utils";
import { resetState } from "./features/user/userSlice";
// import {store} from "./store/Store";

function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
  localStorage.removeItem("Token"), localStorage.removeItem("userId");
  localStorage.removeItem("writerId");
}

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeUserFromLocalStorage();
      // store.dispatch(resetState());
      RedirectToLoginAlert();
    }
    return Promise.reject(error);
  }
);
export const apiCall = async (url, method, data = null,auth=false) => {
  let token = localStorage.getItem("Token");

  if(auth){
    if (!token) {
      // store.dispatch(resetState());
      RedirectToLoginAlert();
      return Promise.reject({ status: 401, msg: "User not authenticated" });
    }
  }

  try {
    const response = await axiosInstance.request({
      url: `${BACK_END_URL}/${url}`,
      method,
      data,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.msg);
  }
};

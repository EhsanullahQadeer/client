import axios from "axios";
import { BACK_END_URL } from "../../utils";


export const checkActiveUser = async (data,thunkAPI) => {
  let token = localStorage.getItem("Token");
  try {
    let response = await axios.post(`${BACK_END_URL}/auth/checkActiveUser`,data
    ,{
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
   return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const setupUserRegister = async (data, route, thunkAPI) => {
  try {
    let response = await axios.post(`${BACK_END_URL}/auth/${route}`, data);
   return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg,error.response);
  }
};

export const setupUserLogin = async (data, route, thunkAPI) => {
  try {
    let response = await axios.post(`${BACK_END_URL}/auth/${route}`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};



export const setupForgetPassword = async (data, route, thunkAPI) => {
  try {
    let props = await axios.post(`${BACK_END_URL}/auth/${route}`, {
      email: data,
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const setupResetPassword = async (data, route, thunkAPI) => {
  try {
    let props = await axios.post(`${BACK_END_URL}/auth/${route}`, {
      email: data.email,
      token: data.token,
      password: data.password,
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const GoogleAuth = async (data, route, thunkAPI) => {
  try {
    let props = await axios.post(`${BACK_END_URL}/${route}`, {
      idToken: data.credential,
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const userImage = async (event, thunkAPI) => {
  try {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "zkkzikta");
    let data = await axios.post(
      "https://api.cloudinary.com/v1_1/dvaodl5k8/image/upload",
      formData
    );
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
};

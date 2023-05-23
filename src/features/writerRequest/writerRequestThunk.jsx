import axios from "axios";
import { BACK_END_URL } from "../../utils";
import { setupGetCurrentWriter } from "./writerRequestSlice";

export const getCurrentWriter = async (_, thunkAPI) => {
  let token = localStorage.getItem("Token");
  try {
    let response = await axios.get(`${BACK_END_URL}/writer/currentWritter`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateCurrentWriter = async (data, thunkAPI) => {
  let token = localStorage.getItem("Token");
  let writerId = thunkAPI.getState().writerRequest.currentWriterInfo._id;
  try {
    let props = await axios.post(
      `${BACK_END_URL}/writer/updateWriter/${writerId}`,
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(setupGetCurrentWriter());
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const writerImage = async (event, thunkAPI) => {
  let token = localStorage.getItem("Token");
  let writerId = thunkAPI.getState().writerRequest.currentWriterInfo._id;
  try {
    const imageFile = event;
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "zkkzikta");
    let response = await axios.post(
      `${BACK_END_URL}/writer/uploadWritterProfileImage/${writerId}`,
      formData,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
};
//
export const removeWriterImage = async (imgUrl, thunkAPI) => {
  let token = localStorage.getItem("Token");
  let writerId = thunkAPI.getState().writerRequest.currentWriterInfo._id;
  try {
    let response = await axios.post(
      `${BACK_END_URL}/writer/removeWritterProfileImage/${writerId}`,
      imgUrl,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
    thunkAPI.rejectWithValue(error);
  }
};



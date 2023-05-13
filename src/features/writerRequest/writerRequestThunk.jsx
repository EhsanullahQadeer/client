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

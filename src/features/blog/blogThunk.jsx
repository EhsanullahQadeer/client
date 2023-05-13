import axios from "axios";
import { BACK_END_URL } from "../../utils";
export const createBlog = async (blog, thunkAPI) => {
  let token = localStorage.getItem("Token");
  try {
    let props = await axios.post(
      `${BACK_END_URL}/blog`,
      {
        title: blog.title,
        subTitle: blog.subTitle,
        description: blog.content,
        category: blog.category,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
//
export const getAllBlogs=async (pageIndex,thunkAPI)=>{
  //pagesize and index is used used in backend logic for loading data in chunk/parts
  let pageSize = 13;
  try {
    let response= await axios.get(`${BACK_END_URL}/blog/?pageIndex=${pageIndex}&pageSize=${pageSize}`)
    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}
//
export const getSingleCategoryBlogs=async (data,thunkAPI)=>{
  //pagesize and index is used used in backend logic for loading data in chunk/parts
  let pageSize = 13;
  try {
    let response= await axios.get(`${BACK_END_URL}/blog/getSingleCategoryBlogs?pageIndex=${data.pageIndex}&pageSize=${pageSize}&category=${data.category}`)
    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}
//
export const getSingleBlogs=async (blogId,thunkAPI)=>{
  try {
    let response= await axios.get(`${BACK_END_URL}/blog/singleBlog/${blogId}`)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}
//
export const getTrendingBlogs=async (_,thunkAPI)=>{
  try {
    let response= await axios.get(`${BACK_END_URL}/blog/trendingBlogs`)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}
//
export const getsingleWriterBlogs=async (writerData,thunkAPI)=>{
  try {
    let response= await axios.get(`${BACK_END_URL}/blog/singleWriterBlogs?writerId=${writerData.writerId}&&articlesType=${writerData.articlesType}&pageIndex=${writerData.pageIndex}&pageSize=${writerData.pageSize}`)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}


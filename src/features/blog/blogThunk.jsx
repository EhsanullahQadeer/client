import axios from "axios";
import { BACK_END_URL } from "../../utils";
import { apiCall } from "../../CommonFunctions";
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
export const getSingleBlogs=async (data,thunkAPI)=>{
  const {blogId,userId}=data;
  try {
    let response= await axios.get(`${BACK_END_URL}/blog/singleBlog/${blogId}/${userId}`)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}
//blog/LikeSingleBlog/
export const LikeSingleBlog =  async (blogId, thunkAPI) => {
  return await apiCall(`blog/LikeSingleBlog/${blogId}`, 'post' ,"",true);
}


export const getTrendingBlogs=async (_,thunkAPI)=>{
  try {
    let response= await axios.get(`${BACK_END_URL}/blog/trendingBlogs`)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}
//
export const getTopStories=async (data,thunkAPI)=>{
  try {
    let response= await axios.get(`${BACK_END_URL}/blog/topStories?pageIndex=${data?.pageIndex||1}&pageSize=${data?.pageSize||4}`)
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
//
export const uploadBlogImgs = async (formData, thunkAPI) => {
  let token = localStorage.getItem("Token");
  // let writerId = thunkAPI.getState().writerRequest.currentWriterInfo._id;
  try {
    let response = await axios.post(
      `${BACK_END_URL}/blog/uploadBlogImgs`,
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
export const getRecentViewedBlogs=async (data,thunkAPI)=>{
  try {
    let response= await axios.get(`${BACK_END_URL}/recent/getRecentlyViewedBlogs/${data?.userId}?pageIndex=${data?.pageIndex||1}&pageSize=${data?.pageSize||10}`)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}


export const removeBookmark =  async (data, thunkAPI) => {
  return await apiCall(`recent/removeBookmark/${data?.blogId}`, 'post',"",true);
}
//
export const addBookmark =  async (data, thunkAPI) => {
    return await apiCall(`recent/addBookmark/${data?.blogId}`, 'post',"",true);
  }

//getBookmark
export const getBookmark =  async (data, thunkAPI) => {
  return await apiCall(`recent/getBookmark/${data?.userId}?pageIndex=${data?.pageIndex||1}&pageSize=${data?.pageSize||10}`, 'get');
}


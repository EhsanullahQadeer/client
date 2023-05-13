import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../features/user/userSlice";
import contactSlice from "../features/contact/contactSlice"
import writerRequestSlice from "../features/writerRequest/writerRequestSlice"
import blogSlice from "../features/blog/blogSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    contact:contactSlice,
    writerRequest:writerRequestSlice,
    blog:blogSlice
  },
});

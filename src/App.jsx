import React, { useEffect } from "react";
import ScrollToTop from './componenets/ScrollToTop/ScrollToTop';
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setupUserRoleApi } from "./features/user/userSlice";
import {
  Home,
  WriterProfile,
  Home2,
  Category,
  WritersList,
  About,
  GetStarted,
  Login,
  Register,
  ForgetPassword,
  ResetPassword,
  Courses,
  FAQ,
  Request,
  WriterForm,
  WriteBlogForm,
  WriterDetailForm,
  WriterPublicProfile,
  SingleBlog,
} from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  let dispatch = useDispatch();
  let { showAlert, isLoading,fulfilled,alertType,userId,role,writter } = useSelector((state) => state.user);
  useEffect(
    ()=>{
      dispatch(setupUserRoleApi(userId))
    },[]
  )


  return (
    <div className="appMain">
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Write" element={<WriteBlogForm />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/WriterForm" element={<WriterForm />} />
          <Route path="/updateProfile/:writerId" element={<WriterDetailForm />} />
          <Route path="/blog/:blogId" element={<SingleBlog />} />
          <Route
            path="/WriterPublicProfile/:writerId"
            element={<WriterPublicProfile />}
          />

          <Route path="/creator" element={<Home2 />} />
          <Route path="/signIn" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/getStarted" element={<GetStarted />} />
          <Route path="/writersList" element={<WritersList />} />
          <Route path="/writer/:writerId" element={<WriterProfile />} />
          <Route path="/category/:categoryName" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

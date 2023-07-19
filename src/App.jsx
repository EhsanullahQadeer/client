import React, { useEffect } from "react";
import ScrollToTop from './componenets/ScrollToTop/ScrollToTop';
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { CheckUser } from "./componenets/logicFunctionalities/logics";
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
  return (
    <div id="App" className="appMain">
      <BrowserRouter>
      <ScrollToTop/>
      <CheckUser/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Write" element={<WriteBlogForm />} />
          <Route path="/contact-us" element={<Request/>} />
          <Route path="/WriterForm" element={<WriterForm />} />
          <Route path="/updateProfile/:writerId" element={<WriterDetailForm />} />
          <Route path="/blog/:blogId/:userId?" element={<SingleBlog />} />
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
          <Route path="/profile/:writerId" element={<WriterProfile />} />
          <Route path="/category/:categoryName" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

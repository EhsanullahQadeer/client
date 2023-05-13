import React from "react";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import LoginComponent from "../componenets/AuthComponents/Login";
import Footer from "../componenets/CommonComponents/Footer";

const Login = () => {
  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      <LoginComponent />
      <Footer />
    </div>
  );
};

export default Login;

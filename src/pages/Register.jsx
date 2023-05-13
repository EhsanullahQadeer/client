import React from "react";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import RegisterComponent from "../componenets/AuthComponents/Register";

const Register = () => {
  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      <RegisterComponent />
      <Footer />
    </div>
  );
};

export default Register;

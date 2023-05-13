import React from "react";
import NavbarLight from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import ResetComponent from "../componenets/AuthComponents/ResetPassword";

const ForgetPassword = () => {
  return (
    <div>
      <NavbarLight signIn={true} getStarted={true} />
      <ResetComponent />
      <Footer />
    </div>
  );
};

export default ForgetPassword;

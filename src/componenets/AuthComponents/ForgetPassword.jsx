import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert/UserAlert";
import {removeAlert } from "../../features/user/userSlice";
import { ForgetPasswordApi } from "../../features/user/userThunk";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  let [email, setEmail] = React.useState("");
  let dispatch = useDispatch();
  let { showAlert, isLoading } = useSelector((state) => state.store);

  function ForgetFun() {
    dispatch(ForgetPasswordApi(email));
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  }
  
  return (
    <div className="registerBigMian">
      <div className="registerMain">
        {isLoading && <CircularProgress />}
        {showAlert && <Alert />}
        <div>
          <h1 className="authHead">Reset Password</h1>
          <p className="authPara">
            Enter your email address and we'll send you an email with <br />{" "}
            instructions to reset your password.
          </p>
        </div>

        <div className="registerTextFields">
          <div className="TextFields">
            <p>Email address</p>
            <input
              className="textarea"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="loginBtnsWrapper">
            <button className="authBlueBtn" onClick={ForgetFun}>
              Reset Password
            </button>
          </div>
          <p className="alreadyAuth">
            Back to
            <Link to="/signIn">
              <span>Sign In</span>
            </Link>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { removeAlert } from "../../features/user/userSlice";
import { setupUserLoginApi } from "../../features/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert/UserAlert";
import GoogleLogin from "../GoogleAuth/GoogleLogin";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Alert_Login from "../Alert/LoginAlert";
const Login = () => {
  const [passwordType, setPasswordType] = useState(true);
  const [eyeType, setEyeType] = useState("fa-solid fa-eye-slash fa-lg");
  function tooglePassword() {
    passwordType ? setPasswordType(false) : setPasswordType(true)
    passwordType ? setEyeType("fa-solid fa-eye fa-lg") : setEyeType("fa-solid fa-eye-slash fa-lg")
  }



  const navigate = useNavigate();
  let dispatch = useDispatch();
  let { showAlert, isLoading, fulfilled, alertType } = useSelector((state) => state.user);
  let alert = React.useRef(null);
  let [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  }
  //get prepath from local stoarge if user is redirected from noauthenticated request
  async function LoginFun() {
    dispatch(setupUserLoginApi(data)).then((res) => {
      if (!res.error) {
        let redirectPath = localStorage.getItem("prePath");
        setTimeout(() => {
          if (redirectPath) {
            navigate(redirectPath);
            localStorage.removeItem("prePath")
          } else {
            navigate("/");
          }
          dispatch(removeAlert());
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch(removeAlert());
        }, 3000);
      }
    }
    )
    alert.current.scrollIntoView({ behavior: "smooth" });



  }
  function handleForm(e) {
    e.preventDefault();
  }

  return (
    <div className="registerBigMian">
      <form onSubmit={handleForm}>
        <div className="registerMain" ref={alert}>
          {isLoading && <CircularProgress />}
          {showAlert && (alertType == "danger" ? <Alert /> : <Alert_Login />)}
          <div>
            <h1 className="authHead text-center">Sign In</h1>
            <p className="authPara text-center">
              Enter your email address or username & password to sign in
            </p>
          </div>

          <div className="registerTextFields">
            <div className="TextFields">
              <input
                className="textarea"
                placeholder="Email or username"
                name="email"
                value={data.email}
                type="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="TextFields">
              <div className="passwordWrapper textarea">
                <input
                  className="passTextarea"
                  placeholder="Password"
                  type={passwordType ? "password" : "text"}
                  onChange={handleChange}
                  name="password"
                  required

                />
                <span style={{color: '#9F9999'}} onClick={tooglePassword} className={eyeType}></span>
              </div>
            </div>
            <Link to="/forgetPassword">
              <p className="forgerPassword">Forgot your password?</p>
            </Link>
            <div className="loginBtnsWrapper">
              <div className="authFlex">
                <div className="checkFlex">
                  <input type="checkbox" />
                  <p>Stay signed in</p>
                </div>
              </div>
              <div style={{flexDirection: 'column'}} className="text-center d-flex align-items-center">
                <button type="submit" className="authBlueBtn" onClick={LoginFun}>
                  Sign In
                </button>

                <div className="text-center">
                  <p className="or">Or</p>
                  {/* <button className="authRedBtn"> <GoogleLogin /></button> */}
                  <GoogleLogin />
                </div>
              </div>
              <p className="alreadyAuth">
                Don't have an account?
                <Link to="/signUp">
                  <span className="ml-2">Sign Up</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

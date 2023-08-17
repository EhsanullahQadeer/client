import React,{useState} from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import {removeAlert } from "../../features/user/userSlice";
import { setupUserLoginApi } from "../../features/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert/UserAlert";
import GoogleLogin from "../GoogleAuth/GoogleLogin";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from "react-router-dom";
import Alert_Login from "../Alert/LoginAlert";
const Login = () => {
  const [passwordType, setPasswordType] = useState(true);
  const [eyeType, setEyeType] = useState("fa-solid fa-eye-slash fa-lg");
  function tooglePassword(){
    passwordType?setPasswordType(false):setPasswordType(true)
   passwordType?setEyeType("fa-solid fa-eye fa-lg"):setEyeType("fa-solid fa-eye-slash fa-lg")
 }



  const navigate = useNavigate();
  let dispatch = useDispatch();
  let { showAlert, isLoading,fulfilled,alertType } = useSelector((state) => state.user);
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
      dispatch(setupUserLoginApi(data)).then((res)=>{
        if(!res.error){ 
          let redirectPath=localStorage.getItem("prePath");
          setTimeout(() => {
            if (redirectPath){
            navigate(redirectPath);
            localStorage.removeItem("prePath")
            }else{
              navigate("/");
            }
            dispatch(removeAlert());
          }, 1000);
        }else{
            setTimeout(() => {
              dispatch(removeAlert());
            }, 3000);
        }
      }
      )
      alert.current.scrollIntoView({ behavior: "smooth" });
      
     
    
  }
  function handleForm(e){
   e.preventDefault();
  }

  return (
    <div className="registerBigMian">
    <form  onSubmit={handleForm}>
      <div className="registerMain" ref={alert}>
        {isLoading && <CircularProgress />}
        {showAlert && (alertType=="danger"?<Alert/>:<Alert_Login/>)}
        <div>
          <h1 className="authHead">Sign In</h1>
          <p className="authPara">
            Enter your email address or username and password to <br />
            access account
          </p>
        </div>

        <div className="registerTextFields">
          <div className="TextFields">
            <p>Username or Email Address</p>
            <input
              className="textarea"
              name="email"
              value={data.email}
              type="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="TextFields">
            <p>Password</p>
            <div className="passwordWrapper textarea">
            <input
              className="passTextarea"
               type={passwordType?"password":"text"}
               onChange={handleChange}
              name="password"
              required
              
            />
             <span onClick={tooglePassword} className={eyeType}></span> 
            </div>
          </div>

          <div className="loginBtnsWrapper">
            <div className="authFlex">
              <div className="checkFlex">
                <input type="checkbox" />
                <p>Remember Me</p>
              </div>
              <Link to="/forgetPassword">
                <p className="forgerPassword">Forgot your password?</p>
              </Link>
            </div>
            <button type="submit" className="authBlueBtn" onClick={LoginFun}>
              Sign In
            </button>

            <div>
              <p className="or">Or</p>
              {/* <button className="authRedBtn"> <GoogleLogin /></button> */}
              <GoogleLogin />
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

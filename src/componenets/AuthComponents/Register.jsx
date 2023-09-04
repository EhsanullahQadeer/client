import React, { useState } from "react";
import "./Register.css";
import { AuthenticateAlert } from "../Alert/Alerts";
import { Link } from "react-router-dom";
import { removeAlert } from "../../features/user/userSlice";
import { setupUserRegisternApi } from "../../features/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert/UserAlert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  //For Eye button
  const [passwordType, setPasswordType] = useState(true);
  const [eyeType, setEyeType] = useState("fa-solid fa-eye-slash fa-lg");
  function tooglePassword() {
    passwordType ? setPasswordType(false) : setPasswordType(true);
    passwordType
      ? setEyeType("fa-solid fa-eye fa-lg")
      : setEyeType("fa-solid fa-eye-slash fa-lg");
  }

  let { showAlert, isLoading } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let alert = React.useRef(null);
  let [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    categories: "",
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

  async function RegisterFun() {
    dispatch(setupUserRegisternApi(data)).then((res) => {
      if (!res.error) {
        let title = "You are successfully signed up.";
        let desc = "Redirecting";
        AuthenticateAlert({ title, desc });
        setTimeout(() => {
          dispatch(removeAlert());
          navigate("/");
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch(removeAlert());
        }, 3000);
      }
      alert.current.scrollIntoView({ behavior: "smooth" });
    });
  }
  function handleForm(e) {
    e.preventDefault();
  }

  return (
    <div className="registerBigMian">
      <form onSubmit={handleForm}>
        <div className="registerMain" ref={alert}>
          {isLoading && <CircularProgress />}
          <div className="divCenter">{showAlert && <Alert />}</div>
          <div>
            <h1 className="authHead">Sign Up</h1>
            <p className="authPara">Enter your Details to Create Account.</p>
          </div>

          <div className="registerTextFields">
            <div className="TextFields">
              {/* <p>First name</p> */}
              <input
                className="textarea"
                placeholder='First name'
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="TextFields">
              {/* <p>Last Name</p> */}
              <input
                className="textarea"
                placeholder="Last name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="TextFields">
              {/* <p>Email</p> */}
              <input
                type="email"
                className="textarea"
                placeholder='Email'
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="TextFields">
              {/* <p>Phone Number</p> */}
              <input
                className="textarea"
                placeholder='Phone number'
                name="phoneNo"
                value={data.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="TextFields">
              <p>Categories</p>
              <select
                className="textarea categoryField"
                name="categories"
                value={data.categories}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="SelfImprovement">Self Improvement</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className="TextFields">
              {/* <p>Password</p> */}
              <div className="passwordWrapper textarea">
                <input
                  className="passTextarea"
                  placeholder="Password"
                  type={passwordType ? "password" : "text"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                <span onClick={tooglePassword} className={eyeType}></span>
              </div>
            </div>

            <button type="submit" className="authBlueBtn" onClick={RegisterFun}>
              Sign Up
            </button>

            <p className="alreadyAuth">
              You have an account?
              <Link style={{ textDecoration: "none" }} to="/signIn">
                <span className="ml-2">Sign In</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { removeAlert } from "../../features/user/userSlice";
import { ResetPasswordApi } from "../../features/user/userThunk";
import Alert from "../Alert/UserAlert";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  let dispatch = useDispatch();
  let { showAlert, isLoading } = useSelector((state) => state.store);
  const query = useQuery();
  let token = query.get("token");
  let email = query.get("email");

  let [password, setPassword] = React.useState("");

  function submit() {
    dispatch(
      ResetPasswordApi({ password: password, email: email, token: token })
    );
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
    console.log(password);
  }

  return (
    <div className="registerBigMian">
      <div className="registerMain">
        {isLoading && <CircularProgress />}
        {showAlert && <Alert />}
        <div>
          <h1 className="authHead">New Password</h1>
          <p className="authPara">
            Enter your new Password so we change your password accordingly
          </p>
        </div>

        <div className="registerTextFields">
          <div className="TextFields">
            <p>New Password</p>
            <input
              className="textarea"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="loginBtnsWrapper">
            <button className="authBlueBtn" onClick={submit}>
              Submit
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

export default ResetPassword;

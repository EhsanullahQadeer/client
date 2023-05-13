import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { GoogleAuthApi, removeAlert } from "../../features/user/userSlice";

export default function Landing() {
  const dispatch = useDispatch();
  //   const addUserToLocalStorage = (user, token) => {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("token", JSON.stringify(token));
  //   };
  //   let [googleLogin] = useGoogleLoginMutation();
  const responseGoogleSuccess = async (response) => {
    try {
      //   let { data, error } = await googleLogin({ response: response });
      //   if (data) {
      //     dispatch(
      //       seeAlert({
      //         alertType: "success",
      //         alertText: "Authentication Success! Redirecting",
      //       })
      //     );
      //   }
      //   if (error) {
      //     dispatch(seeAlert({ alertType: "danger", alertText: error.data.msg }));
      //   }

      dispatch(GoogleAuthApi(response));

      //   dispatch(loginUsingGoogle({ user: data.user }));
      //   addUserToLocalStorage(data.user, data.token);
    } catch (error) {
      console.log(error.response.data.msg);
    }

    setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
  };

  const responseGoogleError = (response) => {
    console.log(response);
  };

  return (
    <div className="App">
      <GoogleOAuthProvider clientId="705164632277-vhv4q8ki9tntsbiv8n0do8l9rdbd1knk.apps.googleusercontent.com">
        <GoogleLogin
          // buttonText="Login with google"
          // buttonText="Login"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleError}
          cookiePolicy={"single_host_origin"}
        />
      </GoogleOAuthProvider>
    </div>
  );
}


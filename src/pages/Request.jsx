// Using the Register.js CSS

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import {removeAlert,dispalyAlert}  from "../features/contact/contactSlice"
import Alert from "../componenets/Alert/ContactAlert"
import axios from "axios";

import {BACK_END_URL}  from "../utils"
const Register = () => {
  let { showAlert } = useSelector((state) => state.contact);
  let dispatch = useDispatch();
  let alert = React.useRef(null);
  let [info, setinfo] = React.useState({
    name: "",
    email: "",
    contact: "",
    message: "",
    reason:""
  });

  function handleChange(e) {
    setinfo((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  }


  const Send=async ()=>{
    alert.current.scrollIntoView({ behavior: "smooth" });
     try {
      await axios.post(`${BACK_END_URL}/contact`,{name:info.name,email:info.email,contact:info.contact,reason:info.reason,message:info.message})
      dispatch(dispalyAlert({showAlert:true,alertType:"success",alertText:"Your Messsage is recieved successfully"}))
     } catch (error) {
      dispatch(dispalyAlert({showAlert:true,alertType:"danger",alertText:error.response.data.msg}))
     }

     setTimeout(()=>{
       dispatch(removeAlert())
     },3000)

  }

  return (
    <div>
      <LightNavbar signIn={true} getStarted={true} />
      <div className="registerBigMian">
        <div className="registerMain" ref={alert}>
          {/* {isLoading && <CircularProgress />} */}
          {/* <Alert/> */}
          <div className="divCenter">{showAlert && <Alert />}</div>
          <div>
            <h1 className="authHead">Submit a request</h1>
            <p className="authPara">
              Enter your email address or username and password to <br /> access
              account..
            </p>
          </div>

          <div className="registerTextFields">
            <div className="TextFields">
              <p>Name</p>
              <input
                className="textarea"
                name="name"
                value={info.name}
                onChange={handleChange}
              />
            </div>
            <div className="TextFields">
              <p>Email</p>
              <input
                className="textarea"
                name="email"
                value={info.email}
                onChange={handleChange}
              />
            </div>
            <div className="TextFields">
              <p>Contact</p>
              <input
                className="textarea"
                name="contact"
                value={info.contact}
                onChange={handleChange}
              />
            </div>
            <div className="TextFields">
              <p>What can we help you with?</p>
              <select
                className="textarea categoryField"
                name="reason"
                value={info.reason}
                onChange={handleChange}
              >
                <option value="Choose Reason"></option>
                <option value="Reason No1">Reason No1</option>
                <option value="Reason No2">Reason No2</option>
                <option value="Reason No3">Reason No3</option>
              </select>
            </div>
            <div className="TextFields">
              <p>Message</p>
              <textarea
                className="messageInput"
                style={{ }}
                name="message"
                value={info.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="authBlueBtn" onClick={Send}>
              Send
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

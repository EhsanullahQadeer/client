// Using the Register.js CSS

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import Footer from "../componenets/CommonComponents/Footer";
import { removeAlert, dispalyAlert } from "../features/writerRequest/writerRequestSlice"
import axios from "axios";
import { BACK_END_URL } from "../utils"
import Alert from "../componenets/Alert/WriterRequestAlert"
import PopUp from "../componenets/CommonComponents/PopUp"

const writerRequest = () => {

  let { showAlert, isLoading } = useSelector((state) => state.writerRequest);
  let dispatch = useDispatch();
  let alert = React.useRef(null);
  let [open, setOpen] = React.useState(false);
  let [data, setData] = React.useState({
    age: "",
    city: "",
    province: "",
    country: "",
    qualifications: "",
    designation: "",
    purpose: "",
  });

  function handleChange(e) {
    setData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  }

  let Token = (localStorage.getItem("Token"));

  async function Send(e) {
    e.preventDefault();
    alert.current.scrollIntoView({ behavior: "smooth" });
    try {
      const response = await axios.post(`${BACK_END_URL}/writer`, { data }, {
        headers: {
          authorization: `Bearer ${Token}`,
        }
      }
      )
      setOpen(true);

    } catch (error) {
      dispatch(dispalyAlert({ showAlert: true, alertType: "danger", alertText: error.response.data.msg }))
    }
    setTimeout(() => {
      dispatch(removeAlert())
    }, 3000)

  }
  let desc = "Thank you! Your request has been submitted successfully. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form randomized words which don't look even slightly believable."
  let title = "REQUEST SUBMITTED";
  return (
    <div>
      <PopUp open={open} setOpen={setOpen} desc={desc} title={title} />
      <LightNavbar signIn={true} getStarted={true} />
      <div className="registerBigMian">
        <div className="registerMain" ref={alert}>
          {/* {isLoading && <CircularProgress />}  */}
          <div className="divCenter">{showAlert && <Alert />}</div>
          <div className="text-center">
            <h1 className="authHead">Writer Sign Up</h1>
            <p className="authPara">Enter your Details to Create Account.</p>
          </div>
          <form onSubmit={Send}>
            <div className="registerTextFields">
              {/* <div className="TextFields">
              <p>Name</p>
              <input
                className="textarea"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div> */}
              <div className="TextFields">
                <input
                  className="textarea"
                  name="age"
                  value={data.age}
                  placeholder="Age"
                  onChange={handleChange}
                  required
                />
              </div>
              {/*  */}
              <div className="TextFields">
                <select
                  required
                  className="textarea categoryField"
                  name="city"
                  value={data.city}
                  onChange={handleChange}

                >
                  <option value="">City</option>
                  <option value="Bahawalpur">Bahawalpur</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/*  */}
              <div className="TextFields">
                <select
                  className="textarea categoryField"
                  name="province"
                  value={data.province}
                  onChange={handleChange}
                  required
                >
                  <option value="">Province</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/*  */}
              <div className="TextFields">
                <select
                  className="textarea categoryField"
                  name="country"
                  value={data.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Country</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/*  */}

              <div className="TextFields">
                <input
                  className="textarea"
                  placeholder="Qualifications"
                  name="qualifications"
                  value={data.qualifications}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="TextFields">
              <p>Email</p>
              <input
                className="textarea"
                name="email"
                value={data.email}
                onChange={handleChange}
                type="email"
                required
              />
            </div> */}
              {/* <div className="TextFields">
              <p>Contact Number</p>
              <input
                className="textarea"
                name="contactNumber"
                value={data.contactNumber}
                onChange={handleChange}
                required
              />
            </div> */}
              <div className="TextFields">
                <input
                  className="textarea"
                  placeholder="Designation (if any)"
                  name="designation"
                  value={data.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="TextFields">
                <input
                  className="textarea"
                  placeholder="Why do I want to become an author on Howsquare?"
                  name="purpose"
                  value={data.purpose}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="authBlueBtn">
                  Sign Up
                </button>
              </div>
              <p className="alreadyAuth">
                Don't have an account?
                <Link to="/signIn">
                  <span className="ml-2">Sign In</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default writerRequest;

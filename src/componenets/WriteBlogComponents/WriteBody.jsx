import React, { useState, useRef } from "react";
import _ from "lodash.capitalize";
import "./index.css";
import Editor from "./Editor";
import {
  paraRequiredValidator,
  imgRequiredValidator,
} from "./editorValidation";
import { setupCreateBlog, removeAlert } from "../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert/blogAlert";
import CommonAlert from "../CommonComponents/CommonAlert";
import PopUp from "../CommonComponents/PopUp";

const WriteBody = () => {
  let { showAlert, alertText } = useSelector((state) => state.blog);
  let dispatch = useDispatch();
  let alert = React.useRef(null);
  const formRef = useRef(null);
  let [open, setOpen] = React.useState(false);

  let [content, setContent] = React.useState("");
  let [data, setData] = React.useState({
    title: "",
    subTitle: "",
    category: "",
  });

  function handleChange(e) {
    setData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  }
  const [imageAlert, setImageAlert] = useState(false);

  function publish(e) {
    e.preventDefault();
    const isFullfiledPara = paraRequiredValidator(content, setImageAlert);

    if (isFullfiledPara) {
      if (imgRequiredValidator(content)) {
        let info = { ...data, content };
        dispatch(setupCreateBlog(info)).then((res) => {
          if (!res.error) {
            // alert.current.scrollIntoView({ behavior: "smooth" })
            setTimeout(() => {
            setOpen(true);
              
            }, 500);
            setData({
              title: "",
              subTitle: "",
              category: "",
            });
            setContent("");
            formRef.current.reset();
          }
        });

       

        setTimeout(() => {
          dispatch(removeAlert());
        }, 3000);

        setImageAlert(true);

        setTimeout(() => {
          setImageAlert(false);
        }, 3000);

        alert.current.scrollIntoView({ behavior: "smooth" });
      } else {
        alert.current.scrollIntoView({ behavior: "smooth" });
        setImageAlert({
          showAlert: true,
          alertText: "You Must Have To Add Minimum One Image !",
        });
        setTimeout(() => {
          setImageAlert({ showAlert: false });
        }, 3000);
      }
    } else {
      alert.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setImageAlert({ showAlert: false });
      }, 3000);
    }
  }
let title="You blog has been submitted for approval."
 
  return (
    <div className="writeMain" ref={alert}>
      <PopUp open={open} setOpen={setOpen}title={title}/>
      {showAlert && <Alert />}
      {imageAlert.showAlert && (
        <CommonAlert alertType="danger" alertText={imageAlert?.alertText} />
      )}
      {/*  */}
      <form ref={formRef} onSubmit={publish}>
        <div className="registerTextFieldsPart1">
          <div className="TextFields">
            <p>Title</p>
            <input
              className="textarea"
              name="title"
              value={data.title}
              onChange={handleChange}
              minLength={20}
              maxLength={100}
              required
            />
          </div>
          <div className="TextFields">
            <p>Subtitle</p>
            <input
              className="textarea"
              name="subTitle"
              value={data.subTitle}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/*  */}
        <div style={{ marginTop: "40px" }}>
          <div className="TextFields">
            <p>Description</p>
            <Editor content={content} setContent={setContent} />
          </div>
        </div>

        <div className="registerTextFieldsPart1" style={{ marginTop: "40px" }}>
          <div className="TextFields">
            <p>Choose Category</p>
            <select
              className="textarea categoryField"
              name="category"
              value={data.category}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="Travel">Travel</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Fashion">Fashion</option>
              <option value="Data Science">Data Science</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Art">Art</option>
            </select>
          </div>

          <div className="d-flex justify-content-end  align-items-end">
            <button className="authBlueBtn PublishBtn">Publish</button>
          </div>
        </div>
      </form>
      {/*  */}
    </div>
  );
};

export default WriteBody;

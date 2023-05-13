import React from "react";
import _ from "lodash.capitalize";
import "./index.css";
import Editor from "./Editor";
import {setupCreateBlog,removeAlert}   from "../../features/blog/blogSlice"
import { useDispatch ,useSelector} from "react-redux";
import Alert from "../Alert/blogAlert"

const WriteBody = () => {
  let {showAlert}=useSelector((state)=>state.blog)
  let dispatch=useDispatch()
  let alert=React.useRef(null)
  let [content,setContent]=React.useState("")
  let [data,setData]=React.useState({
    title:"",
    subTitle:"",
    category:""
  })

  function handleChange(e){
    
     setData((pre)=>{
        return {
          ...pre,
          [e.target.name]:(e.target.value)
        }
     })
  }
  const myRefname= React.useRef(null);
  function handleRequired(){
    // setTimeout(
    //   ()=>{
    //     myRefname.current.click();
    //   },700
    // )
  }


  function publish(e){
      e.preventDefault();
      let info={...data,content}
      dispatch(setupCreateBlog(info))
      alert.current.scrollIntoView({behavior:"smooth"})
      setTimeout(()=>{
        dispatch(removeAlert())
      },3000)
  }

  
  return (
    <div className="writeMain" ref={alert}>
    
      {
        showAlert && <Alert/>
      }
      {/*  */}
      <form onSubmit={publish}>
      <div className="registerTextFieldsPart1">
        <div className="TextFields">
          <p>Title</p>
          <input className="textarea" name="title"  value={data.title} onChange={handleChange} required/>
        </div>
        <div className="TextFields">
          <p>Subtitle</p>
          <input className="textarea" name="subTitle" value={data.subTitle} onChange={handleChange} required/>
        </div>
      </div>

      {/*  */}
      <div style={{ marginTop: "40px" }}>
        <div className="TextFields">
          <p>Description</p>
          <Editor  content={content} setContent={setContent}/>
        </div>
      </div>

      <div className="registerTextFieldsPart1" style={{ marginTop: "40px" }}>
        <div className="TextFields">
          <p>Choose Category</p>
          <select className="textarea categoryField" name="category" value={data.category} onChange={handleChange} required>
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

        <div className="upload TextFields">
          <p>Upload Media</p>
          <div className="textarea">
          <button className="uploadBtn">Upload</button></div>
        </div>
      </div>
      <div className="publishBtnWrapper">
        <button onClick={handleRequired}  className="authBlueBtn PublishBtn">Publish</button>
        {/* This is hidden only used for display required message by using this technique */}
        <input ref={myRefname}  className="safari" type="submit" ></input>
      </div>
      </form>
      {/*  */}
    </div>
  );
};

export default WriteBody;

import React,{useRef, useState} from "react";
import { Alert as AlertLength } from "@mui/material";
import {
  setupUpdateWriter,
  removeAlert,
} from "../../features/writerRequest/writerRequestSlice";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../Alert/WriterRequestAlert";
import numberLength from "./numberLegth.js"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

// function Example() {
//   // `value` will be the parsed phone number in E.164 format.
//   // Example: "+12133734253".
//   const [value, setValue] = useState()
//   return (
    
//   )
// }



const WriterDetailForm = () => {
 

  const myRefname= useRef(null);
  function handleRequired(){
    setTimeout(
      ()=>{
        myRefname.current.click();
      },700
    )
  }
  let {
    currentWriterInfo: writer,
    image,
    showAlert,currentWriterInfo
  } = useSelector((state) => state.writerRequest);
  let dispatch = useDispatch();

  // const {age,agePrivacy} =currentWriterInfo;
  let [data, setData] = React.useState({
    name: writer?.name ,
    age:writer?.age,
    agePrivacy:writer?.agePrivacy,
    cityPrivacy:writer?.cityPrivacy,
    emailPrivacy:writer?.emailPrivacy,
    contactPrivacy:writer?.contactPrivacy,
    city: writer?.city,
    province: writer?.province,
    country: writer?.country,
    qualifications: writer?.qualifications,
    email: writer?.email,
    phoneNo: writer?.phoneNo,
    designation: writer?.designation,
    facebookId: writer?.facebookId,
    instagramId: writer?.instagramId,
    linkedinId: writer?.linkedinId,
    pinterestId: writer?.pinterestId,
    youtube: writer?.youtube,
    shortBio: writer?.shortBio,
    description: writer?.description
  });
  


  let [content, setContent] = React.useState("");


  

  function handleChange(e) {
    setData((pre) => {
      //This is for limits the character exceeding numbers
      if(e.target.name=="age"){
         return (numberLength(pre,e))
        }
        else{
          return{
            ...pre,
            [e.target.name]: e.target.value
          }
        
        }
      
    });
  }
  
  const [descAlert, setdDescAlert]=useState(false)
  const [shortBioAlert, setShortBioAlert]=useState(false)
  // this is to show alert if charcter exceed
  function handleLength(e){ 
    if (e.target.name=="shortBio"&& e.target.value.length>=400) {   
      setShortBioAlert(true)
      setTimeout(()=>{
        setShortBioAlert(false)
      },3000)
    }
      if (e.target.name=="description"&&e.target.value.length>=1000) {     
        setdDescAlert(true)
        setTimeout(()=>{
          setdDescAlert(false)
        },3000)
      }
  }


  let alert = React.useRef(null);

  function update(e) {
    e.preventDefault();
    // if(e.keyCode == 13){
    //   return false;
    // }
    // else{
    let info = { ...data, photo: image, };
    dispatch(setupUpdateWriter(info));
      setTimeout(() => {
      dispatch(removeAlert());
    }, 3000);
    alert.current.scrollIntoView({ behavior: "smooth" });
    // }
  }    
  
  return (
    <div className="writerDetailFormWrapper" ref={alert}>
      {showAlert && <Alert />}
      {/*  */}
      <form onSubmit={update}>
      <div className="writerProfileInput-flex-div">
      <div className="TextFields writerProfileInput-flex">
          <p>Name</p> 
          <input
            className="writerProfile-input writerDetailFormTextField DarkTextField"
            maxLength={30}
            name="name"
            placeholder="Lev Maximov"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>
        {/*  */}
        <div className="TextFields writerProfileInput-flex ">
          <div className="d-flex justify-content-between">

          <p>Age</p>

          <div className="d-flex">
       <div className="onlyMe-div"> 
       
       <input  type="radio" id="onlyMeAge" name="agePrivacy" value="private"  checked={data.agePrivacy=="private"&& true}  onChange={handleChange}/>
       <label  for="onlyMeAge">Only Me</label>
         </div>
       <div className="showPublic-div">
         <input type="radio" id="showAge" name="agePrivacy" value="public" checked={data.agePrivacy=="public"&& true}    onChange={handleChange}/>
       <label for="showAge">Show to Public</label>
         </div>
          </div>

          </div>
          <input
            className="writerProfile-input writerDetailFormTextField"
            // maxlength={3}
            onChange={handleChange}
            max={150}
            min={10}
            name="age"
            placeholder="36"
            type="number"
            value={data.age}
            required
          />
        </div>
        </div>
    
      {/*  */}

      <div className="writerProfileInput-flex-div">
        <div className="TextFields writerProfileInput-flex">
          <div className="d-flex justify-content-between">
          <p>City</p>
          <div className="d-flex">
       <div className="onlyMe-div">
       <input type="radio" id="onlyMeCity" name="cityPrivacy" checked={data.cityPrivacy=="private"&& true} value="private" onChange={handleChange}/> 
       <label for="onlyMeCity">Only Me</label>
         </div>
       <div className="showPublic-div">
         <input type="radio" id="showCity" name="cityPrivacy" checked={data.cityPrivacy=="public"&& true} value="public" onChange={handleChange}/>
       <label for="showCity">Show to Public</label>
         </div>
          </div>


         
          </div>
          <select
            className="writerProfile-input categoryField writerDetailFormTextField selectTag-padding"
            name="city"
            value={data.city}
            onChange={handleChange}
            required
          >
            <option value="Lahore">Lahore</option>
            <option value="SelfImprovement">Self Improvement</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        <div className="TextFields writerProfileInput-flex">
          <p>Province</p>
          <select
            className="writerProfile-input categoryField writerDetailFormTextField selectTag-padding"
            value={data.province}
            name="province"
            onChange={handleChange}
            required
          >
            <option value="Punjab">Punjab</option>
            <option value="SelfImprovement">Self Improvement</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
    </div>

      {/*  */}

      <div className="writerProfileInput-flex-div">
        <div className="TextFields writerProfileInput-flex">
          <p>Country</p>
          <select
            className="writerProfile-input categoryField writerDetailFormTextField selectTag-padding"
            value={data.country}
            name="country"
            onChange={handleChange}
            required
          >
            <option value="Pakistan">Pakistan</option>
            <option value="SelfImprovement">Self Improvement</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
        <div className="TextFields writerProfileInput-flex">
          <p>Qualifications</p>
          <input
            className="writerProfile-input writerDetailFormTextField"
            name="qualifications"
            placeholder="Qualifications"
            value={data.qualifications}
            onChange={handleChange}
            required
          />
        </div>
    </div>

      {/*  */}
      <div className="writerProfileInput-flex-div">
 
        <div className="TextFields writerProfileInput-flex">
          <div className="d-flex justify-content-between">
          <p>Email</p>
          <div className="d-flex">
       <div className="onlyMe-div">
       <input type="radio" id="onlyMeEmail" name="emailPrivacy" checked={data.emailPrivacy=="private"&& true}  value="private" onChange={handleChange}/> 
       <label for="onlyMeEmail">Only Me</label>
         </div>
       <div className="showPublic-div">
         <input type="radio" id="showEmail" name="emailPrivacy" checked={data.emailPrivacy=="public"&& true} value="public" onChange={handleChange}/>
       <label for="showEmail">Show to Public</label>
         </div>
          </div>
          </div>
          <input
            className="writerProfile-input writerDetailFormTextField DarkTextField"
            placeholder="abubakar.0081@yourdimain.com"
            value={data.email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="TextFields writerProfileInput-flex">
          <div className="d-flex justify-content-between">
          <p>Contact Number</p>
          <div className="d-flex">
       <div className="onlyMe-div">
       <input type="radio" id="onlyMeContact" name="contactPrivacy" value="private" checked={data.contactPrivacy=="private"&& true} onChange={handleChange}/> 
       <label for="onlyMeContact">Only Me</label>
         </div>
       <div className="showPublic-div">
         <input type="radio" id="showContact" name="contactPrivacy" value="public" checked={data.contactPrivacy=="public"&& true} onChange={handleChange}/>
       <label for="showContact">Show to Public</label>
         </div>
          </div>
          </div>
          {/* <PhoneInput
           className="writerProfile-input writerDetailFormTextField DarkTextField"
            name="contactNumber"
            placeholder="+38 55 555 555"
            value={data.contactNumber}
            onChange={handleChange}
            required
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}
      /> */}
          <input
            className="writerProfile-input writerDetailFormTextField DarkTextField"
            name="phoneNo"
            placeholder="+38 55 555 555"
            value={data.phoneNo}
            onChange={handleChange}
            required
          />
        </div>
    </div>

      {/*  */}
      <div className="writerProfileInput-flex-div">
        <div className="TextFields writerProfileInput-flex">
          <p>Designation (if any)</p>
          <input
            className="writerProfile-input writerDetailFormTextField"
            placeholder="Managing Director"
            value={data.designation}
            name="designation"
            onChange={handleChange}
          />
        </div>

        <div className="TextFields writerProfileInput-flex">
          <p>Facebook ID</p>
          <input
            className="writerProfile-input writerDetailFormTextField"
            placeholder="facebook.com/username"
            value={data.facebookId}
            name="facebookId"
            onChange={handleChange}
          />
        </div>
</div>

      {/*  */}
      <div className="writerProfileInput-flex-div">
   
        <div className="TextFields writerProfileInput-flex">
          <p>Instagram ID</p>
          <input
            className="writerProfile-input writerDetailFormTextField"
            placeholder="ID link goes here"
            value={data.instagramId}
            name="instagramId"
            onChange={handleChange}
          />
        </div>

        <div className="TextFields writerProfileInput-flex">
          <p>LinkedIn ID</p>
          <input
            className="writerProfile-input writerDetailFormTextField"
            placeholder="linkedIn.com/username"
            value={data.linkedinId}
            name="linkedinId"
            onChange={handleChange}
          />
        </div>
 </div>
      {/*  */}
      <div className="writerProfileInput-flex-div">
    
        <div className="TextFields writerProfileInput-flex">
          <p>Pinterest ID</p>
          <input
            className="writerProfile-input writerDetailFormTextField"
            placeholder="ID link goes here"
            value={data.pinterestId}
            name="pinterestId"
            onChange={handleChange}
          />
        </div>

        <div className="TextFields writerProfileInput-flex">
          <p>YouTube</p>
          <input
            className="writerProfile-input writerDetailFormTextField"
            placeholder="YouTube.com/username"
            value={data.youtube}
            name="youtube"
            onChange={handleChange}
          />
      </div>
      </div>
      {/*  */}
      <div className="TextFields " style={{ marginTop: "20px" }}>
        <p>Short Bio</p>
        {shortBioAlert&&<AlertLength variant="filled" severity="warning" className="descAlert">
          <span>You can write only upto 400 characters.</span><span className="spanAlert-reached">Text limits reached</span>
        </AlertLength>} 
        <textarea 
          className="writerProfile-shortBioInput"
          maxlength="400"
          name="shortBio"
          value={data.shortBio}
          onChange={(e)=>{handleChange(e) ;handleLength(e)}}
        ></textarea>
      </div>
      {/*  */}
      <div style={{ marginTop: "40px" }}>
        <div className="TextFields">
          <p>Description</p>
          {descAlert&&<AlertLength variant="filled" severity="warning" className="descAlert">
          
          <span>You can write only upto 1000 characters.</span><span className="spanAlert-reached">Text limits reached</span>
        </AlertLength>} 
          <textarea 
          className="writerProfile-shortBioInput writerProfile-description"
          maxlength="1000"
          name="description"
          value={data.description}
          onChange={(e)=>{handleChange(e) ;handleLength(e)}}
        ></textarea>
        </div>
      </div>
      {/*  */}
      <div
        className="writerInfoSave"
        style={{ marginTop: "30px", cursor: "pointer" }}
      >
        <button  onClick={handleRequired}  className="submit" >Save</button>
         <input ref={myRefname}  className="safari" type="submit"></input>
       
      </div>
      </form>
    </div>
  );
};

export default WriterDetailForm;

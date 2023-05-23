import React,{useEffect,useState} from "react";
import "./index.css";

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


import Img from "../../assets/upload.png";
import {
  getWriterImage,
  // removeWriterImage,
  removeWriterImageApi
} from "../../features/writerRequest/writerRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { Hidden } from "@mui/material";
const WritterDetailsHeader = () => {

  let { image,imgLoading} = useSelector((state) => state.writerRequest);
  let dispatch = useDispatch();  

  const [imgUrl,setImgUrl]=useState(image)





 /////////////////////////////////////
     const [selectedFile, setSelectedFile] = useState()
     const [preview, setPreview] = useState()


    //  useEffect(()=>{
      
    //   console.log(image)
    //   console.log(preview)
    // },[image])
    



     useEffect(() => {
         if (!selectedFile) {
             setPreview(undefined)
         }else{
          const objectUrl = URL.createObjectURL(selectedFile)
          setPreview(objectUrl)
          setImgUrl(undefined)
          // free memory when ever this component is unmounted
          // return () => URL.revokeObjectURL(objectUrl)
         }
     }, [selectedFile])
 

     //uploading image
  function handleImage(event) {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined)
      return
  }else{
    setSelectedFile(event.target.files[0])
  }
  }
  //removing image
  function removeWriterImage(){
    setSelectedFile(undefined)
    setImgUrl(undefined)
  } 

  const [changesAlert,setChangesAlert]=useState(false);
  //This is logic to restrict again and again save same image uploaded once if not chnaged  
   useEffect(()=>{
    setPreview(image)
   },[image])
  function saveWriterImage(){
    if (selectedFile){
      if(preview != image){dispatch(getWriterImage(selectedFile));
      }else{
        setChangesAlert(true)
          setTimeout(()=>{
            setChangesAlert(false)
          },3000)
      }
    }else if(image){
         if(!imgUrl){
           dispatch(removeWriterImageApi({imgUrl:image}))
         }else{
          setChangesAlert(true)
          setTimeout(()=>{
            setChangesAlert(false)
          },3000)
         }
    }
    else{
      setChangesAlert(true)
          setTimeout(()=>{
            setChangesAlert(false)
          },3000)
    }
  }
  return (
    <div className="uploadBigMain">
      <div className="uploadMain">
        <div className="uploadWriterImageMain">
          {/*  */}
          <div>
            <div className="uploadBox">
              {/* {!selectedFile&&imgUrl && <img src={imgUrl} className="writerImge" />} */}
              <img src={imgUrl?image:selectedFile?preview:Img} className="writerImge" />
              <input
                type="file"
                accept="image/*"
                name="file"
                style={{ position: "absolute", opacity: "0", }}
                onChange={handleImage}
              />
            {imgLoading&&<CircularProgress  style={{position:"absolute"}}/>}
            {/* {!imgUrl&&<img className="writterProfile-img" src={selectedFile?preview:Img} />} */}
            
            </div>
          </div>
          {/*  */}
          
          <div className="uploadWriterImageContent">
            <h1>Profile Photo</h1>
            {changesAlert ?<Alert  severity="error">
        You don't have any changes to save
      </Alert>:
            <p>
              Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
              side.
            </p>}
            <div className="uploadBtns">
              { <button className="blue " >
              <label className="pt-1"  style={{cursor:"pointer"}} htmlFor="attachImageWriter">Update</label>
              <input id="attachImageWriter" type="file"  accept="image/*" name="file" style={{visibility:"hidden"}}  onChange={handleImage}/>
                
                </button> }
                {/* onClick={dispatch(removeWriterImage())} */}
              <button style={{cursor:"pointer"}} className="red" onClick={removeWriterImage} >
                Remove
              </button>
              <button  className={`red ${imgLoading && " noClick"}`} onClick={saveWriterImage} >
                Save
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default WritterDetailsHeader;

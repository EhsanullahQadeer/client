import React from "react";
import "./index.css";
import Img from "../../assets/upload.png";
import {
  getWriterImage,
  removeWriterImage,
} from "../../features/writerRequest/writerRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { Hidden } from "@mui/material";
const WritterDetailsHeader = () => {
  let { image } = useSelector((state) => state.writerRequest);
  let dispatch = useDispatch();

  function handleImage(event) {
    dispatch(getWriterImage(event));
  }
  return (
    <div className="uploadBigMain">
      <div className="uploadMain">
        <div className="uploadWriterImageMain">
          {/*  */}
          <div>
            <div className="uploadBox">
              {image && <img src={image} className="writerImge" />}
              <input
                type="file"
                accept="image/*"
                name="file"
                style={{ position: "absolute", opacity: "0", }}
                onChange={handleImage}
              />
              <img src={Img} />
            </div>
          </div>
          {/*  */}
          <div className="uploadWriterImageContent">
            <h1>Profile Photo</h1>
            <p>
              Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
              side.
            </p>
            <div className="uploadBtns">
              { <button className="blue " >
              <label className="pt-1"  style={{cursor:"pointer"}} htmlFor="attachImageWriter">Update</label>
              <input id="attachImageWriter" type="file"  accept="image/*" name="file" style={{visibility:"hidden"}}  onChange={handleImage}/>
                
                </button> }
              <button style={{cursor:"pointer"}} className="red" onClick={dispatch(removeWriterImage())}>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WritterDetailsHeader;

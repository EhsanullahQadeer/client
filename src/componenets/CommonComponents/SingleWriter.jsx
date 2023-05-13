import React from "react";
import "./RightComponent.css";
const SingleWriter = ({ writer }) => {
  return (
    <div>
      <div className="singleWritterWrapper">
        <img className="singleWriter-img" src={writer?.img} />
        <div className="writtersContent">
          <div>
            <p className="writterName">{writer.name}</p>
            <p className="writterBio">{writer?.bio}</p>
            <p style={{marginBottom:"0"}} className="writterInfo mt-2">{writer?.info}</p>
          </div>
          <div className="writtersIcons">
            <div
              className="rightComponentWritersIcons active"
            >
              <a href=""><i className="fa-brands fa-facebook-f fa-sm "></i></a>
            </div>
            <div className="rightComponentWritersIcons">
            <a href=""><i className="fa-brands fa-twitter fa-sm"></i></a>
            </div>
            <div className="rightComponentWritersIcons">
            <a href=""> <i className="fa-brands fa-instagram fa-sm"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWriter;

import React from "react";
import "./RightComponent.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Writer_Files_URL } from "../../utils";
const SingleWriter = ({ writer }) => {
  let writerImg;
  if(writer?.photo){
    writerImg=Writer_Files_URL+writer?.photo;
  }
  return (
    <div>
      <div className="singleWritterWrapper">
        <Link
          className="link text-center"
          to={`/WriterPublicProfile/${writer?._id}`}
        >
          {writerImg ? (
            <img className="singleWriter-img" src={writerImg} />
          ) : (
            <FaUserCircle className="mx-auto" size={149} color={"#b1b1b1"} />
          )}
        </Link>
        <div className="writtersContent">
          <Link className="link" to={`/WriterPublicProfile/${writer?._id}`}>
            <div>
              <p className="writterName">{writer?.name}</p>
              <p className="writterBio">{writer?.designation}</p>
              <p style={{ marginBottom: "0" }} className="writterInfo mt-2">
                {writer?.shortBio}
              </p>
            </div>
          </Link>
          <div className="writtersIcons">
            {writer?.facebookId && (
              <a href={writer?.facebookId}>
                <div className="rightComponentWritersIcons bg-blue fa-brands fa-facebook-f fa-sm"></div>
              </a>
            )}
            {writer?.twitterId && (
              <a href={writer?.twitterId}>
                <div className="rightComponentWritersIcons fa-brands fa-twitter fa-sm"></div>
              </a>
            )}
            {writer?.instagramId && (
              <a href={writer?.instagramId}>
                <div className="rightComponentWritersIcons fa-brands fa-instagram fa-sm"></div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWriter;

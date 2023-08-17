// Using the single Writer in Common Componenents

import React from "react";
import "./index.css";
import { Writer_Files_URL } from "../../utils";
import { FaUserCircle } from "react-icons/fa";
const WriterIntro = ({ writer }) => {
  let writerImg;
  if(writer?.photo){
    writerImg=Writer_Files_URL+writer?.photo;
  }
  return (
    <div>
      <div>
        <div className="singleWritterWrapper">
          {writerImg ? (
            <div className="text-center">
            <img className="singleWriter-img" src={writerImg} />
            </div>
          ) : (
            <div className="text-center">
            <FaUserCircle size={149} color={"#b1b1b1"} />
            </div>
          )}
          <div className="writtersContent">
            <div>
              <p className="writterName">{writer?.name}</p>
              <p className="writterBio mb-2">{writer?.designation}</p>
            </div>
            <p className="writterInfo">{writer?.shortBio}</p>

            <div className="writerPublicProfileFlex">
              {/*  */}
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
              {/*  */}

              {/* <p>Pro Writer</p> */}
            </div>
          </div>
        </div>
      </div>

      {writer?.description && (
        <div className="writerPublicProfileContent">
          <h1>About {writer?.name}</h1>
          <p>{writer?.description}</p>
          {/* <h2>The best ideas can change who we are.</h2>
        <p>
          Dynamically underwhelm integrated outsourcing via timely models.
          Rapidiously reconceptualize visionary imperatives without 24/365
          catalysts for
        </p> */}
        </div>
      )}

      <div>
        <h1 className="PostBy">Posts By {writer?.name}</h1>
        {/* <div className="categoryLinks">
          <p className="categoryActiveLink">Latest</p>
          <p className="categoryLink">Top Stories</p>
        </div> */}
        <div className="categoryLine"></div>
      </div>
    </div>
  );
};

export default WriterIntro;

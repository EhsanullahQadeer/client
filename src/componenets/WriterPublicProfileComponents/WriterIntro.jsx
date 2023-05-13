// Using the single Writer in Common Componenents

import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { TbVectorBezierCircle } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import "./index.css";

const WriterIntro = ({ writer }) => {
  return (
    <div>
      <div>
        <div className="singleWritterWrapper">
          <img src={writer?.img} />
          <div className="writtersContent">
            <div>
              <p className="writterName">{writer.name}</p>
              <p className="writterBio">{writer?.bio}</p>
            </div>
            <p className="writterInfo">{writer?.info}</p>

            <div className="writerPublicProfileFlex">
              {/*  */}
              <div className="writtersIcons writtersIconsPublicProfile">
                <div
                  className="rightComponentWritersIcons active"
                  style={{ color: "white" }}
                >
                  <FaFacebookF />
                </div>
                <div className="rightComponentWritersIcons">
                  <TbVectorBezierCircle />
                </div>
                <div className="rightComponentWritersIcons">
                  <IoLogoInstagram />
                </div>
              </div>
              {/*  */}
              <p>Pro Writer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="writerPublicProfileContent">
        <h1>About Garrett Winters</h1>
        <p>
          Dynamically underwhelm integrated outsourcing via timely models.
          Rapidiously reconceptualize visionary imperatives without 24/365
          catalysts for change. Completely streamline functionalized models and
          out-of-the-box functionalities. Authoritatively target proactive
          vortals vis-a-vis exceptional results. Compellingly brand emerging
          sources and compelling materials. Globally iterate parallel content.
        </p>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
        <h2>The best ideas can change who we are.</h2>
        <p>
          Dynamically underwhelm integrated outsourcing via timely models.
          Rapidiously reconceptualize visionary imperatives without 24/365
          catalysts for
        </p>
      </div>

      <div>
        <h1 className="PostBy">posts py Garrett Winters</h1>
        <div className="categoryLinks">
          <p className="categoryActiveLink">Latest</p>
          <p className="categoryLink">Top Stories</p>
        </div>
        <div className="categoryLine"></div>
      </div>
    </div>
  );
};

export default WriterIntro;

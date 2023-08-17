import React, { useEffect, useState } from "react";
import "./RightComponent.css";
import { setupGetTopWritters } from "../../features/writerRequest/writerRequestThunk";
import { useDispatch } from "react-redux";
import { Writer_Files_URL } from "../../utils";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Writers = () => {
  const [topWriters, setTopWriters] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let writerData = { pageIndex: 1, pageSize: 3 };
    dispatch(setupGetTopWritters(writerData)).then(({ payload }) => {
      setTopWriters(payload[0].topWriter);
    });
  }, []);
  return (
    <div>
      {topWriters.map((item) => {
        let writer = item._id;
        let writerImg;
        if (writer?.photo) {
          writerImg = Writer_Files_URL + writer?.photo;
        }
        return (
          <div className="writterWrapper">
            <Link
              title="visit writer profile"
              to={`/WriterPublicProfile/${writer?._id}`}
            >
              {writerImg ? (
                <div>
                  <img className="topWriter-img" src={writerImg} alt="..." />
                </div>
              ) : (
                <FaUserCircle size={80} color={"#b1b1b1"} />
              )}
            </Link>

            <div className="writtersContent">
              <Link
                title="visit writer profile"
                to={`/WriterPublicProfile/${writer?._id}`}
              >
                <div>
                  <p className="writterName">{writer.name}</p>
                  <p className="writterBio">{writer?.shortBio}</p>
                </div>
              </Link>
              <div className="writtersIcons">
                {writer?.facebookId && (
                  <div className="rightComponentWritersIcons">
                    <a target="_blank" href={writer?.facebookId}>
                      <span className="fa-brands fa-facebook-f fa-sm"></span>
                    </a>
                  </div>
                )}
                {writer?.twitterId && (
                  <div className="rightComponentWritersIcons ">
                    <a target="_blank" href={writer?.twitterId}>
                      <span className="fa-brands fa-twitter fa-sm"></span>
                    </a>
                  </div>
                )}
                {writer?.instagramId && (
                  <div className="rightComponentWritersIcons">
                    <a target="_blank" href={writer?.instagramId}>
                      <span className="fa-brands fa-instagram fa-sm"></span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Writers;

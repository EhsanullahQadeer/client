import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Story_Files_URL } from "../../utils";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./StoriesPopup.css";
export default function Stories({
  uniqueId,
  setOpen,
  setOpenStory,
  spons,
  add,
  title,
  imageUrl,
  videoUrl,
  btnName,
  btnUrl,
  description,
  views
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleMuteUnmute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoPlay = () => {
        setIsPlaying(true);
        setShowPlayButton(false);
      };
      const handleVideoPause = () => {
        setIsPlaying(false);
        setShowPlayButton(true);
      };

      video.addEventListener("play", handleVideoPlay);
      video.addEventListener("pause", handleVideoPause);

      return () => {
        video.removeEventListener("play", handleVideoPlay);
        video.removeEventListener("pause", handleVideoPause);
      };
    }
  }, []);
  return (
    <div className="d-flex  justify-content-center storyBodyMain">
      <div
        onMouseEnter={() => setShowPlayButton(true)}
        onMouseLeave={() => isPlaying && setShowPlayButton(false)}
        id="storyTumbnailMain"
        className="storyBody"
      >
        <div className="d-flex justify-content-between px-3 mt-3 storyBodyHead">
          {spons && (
            <Button
              className="pe-none"
              id="storybtn"
              style={{ outline: "1px solid #b6babd" }}
              variant="contained"
              size="small"
            >
              Sponsered
            </Button>
          )}
          {add && (
            <Button
              className="pe-none"
              id="storybtn"
              style={{ outline: "1px solid #b6babd" }}
              variant="contained"
              size="small"
            >
              How Square Add
            </Button>
          )}
          <ClearIcon
            onClick={() => {
              setOpen(false), setOpenStory(false);
            }}
            style={{ fontSize: 32, cursor: "pointer", zIndex: "2" }}
            className="my-auto b6babd  float-right"
          />
        </div>

        {imageUrl && (
          <img
            className="storyImg"
            src={`${Story_Files_URL}/images/${imageUrl}`}
            alt="Story"
          />
        )}
        {videoUrl && (
          <video
            ref={videoRef}
            id={`storyVideo-${uniqueId}`}
            className="storyThumbnailImage"
            src={`${Story_Files_URL}/videos/${videoUrl}`}
            controls={false}
          >
            Your browser does not support the video tag.
          </video>
        )}
        {videoUrl &&
          showPlayButton &&
          (isPlaying ? (
            <PauseIcon
              onClick={handlePlayPause}
              className="playbtnStoryOpen "
            />
          ) : (
            <PlayArrowIcon
              onClick={handlePlayPause}
              className="playbtnStoryOpen "
            />
          ))}

        {videoUrl && (
          <IconButton
            onClick={handleMuteUnmute}
            className="storyMuteButton"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeOffIcon className="storyMuteIcon" />
            ) : (
              <VolumeUpIcon className="storyMuteIcon" />
            )}
          </IconButton>
        )}

        {title && (
          <div className="storyBody-contentDiv">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        )}

        {btnName && (
          <a href={btnUrl}>
            <div className="px-3 mb-3 story-signUpBtn">
              <Button
                className="btn-block"
                style={{ borderRadius: "100px" }}
                variant="contained"
                size="medium"
              >
                {btnName}
              </Button>
            </div>
          </a>
        )}
      </div>
      <div className="ml-2 mt-3">
        <div className="mb-2">
          <IconButton className="b6babd pe-none" aria-label="delete">
            <RemoveRedEyeOutlinedIcon style={{ fontSize: 30 }} />
          </IconButton>
          <p className="text-center small b6babd pe-none ">{views}</p>
        </div>
        <div>
          <IconButton className="b6babd" aria-label="delete">
            <ShareOutlinedIcon style={{ fontSize: 30 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}


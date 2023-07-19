import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import ClearIcon from "@mui/icons-material/Clear";
import "react-responsive-modal/styles.css";
import { IconButton } from "@mui/material";
import Stories from "./Stories";
import AliceCarousel from "react-alice-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { viewStoryApi } from "../../features/stories/StoriesSlice";

let activeIndex = 0;
export default function StoriesPopup({
  sortedStories,
  openStory,
  setOpenStory,
  selectedStoryIndex,
  setPage,
  slideIndex,
  setSelectedStoryIndex,
}) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);


  const [disablePrev, setDisablePrev] = useState(0);
  const [open, setOpen] = useState(true);
  const closeIcon = <ClearIcon style={{ fontSize: 30 }} />;

  // <Stories setOpen={setOpen} src={"https://miro.medium.com/v2/resize:fit:720/format:webp/1*vXL3FFkiYmBAfLVbPRkXng.png"} setOpenStory={setOpenStory} />,
  // <Stories setOpen={setOpen} src={"https://miro.medium.com/v2/resize:fit:720/format:webp/1*q0mWbsl3u_DALOo4DbMtkw.png"} setOpenStory={setOpenStory} />,
  // <Stories setOpen={setOpen}  setOpenStory={setOpenStory} />,
  // <StoryAdd setOpen={setOpen}  setOpenStory={setOpenStory} />

  //
  function handlePre() {
    return (
      <IconButton disabled={disablePrev} className="curosel-btns pre">
        <ArrowBackIosIcon style={{ color: "#727272" }} />
      </IconButton>
    );
  }
  function handleNext() {
    return (
      <IconButton className="curosel-btns next">
        <ArrowForwardIosIcon style={{ color: "#727272" }} />
      </IconButton>
    );
  }
  /////////////////////////////////////////////////////////////////
  const [activeStory, setActiveStory] = useState(null);

  const [previousActiveStory, setPreviousActiveStory] = useState(null);
  useEffect(() => {
    openStory && setOpen(true);
    activeIndex = selectedStoryIndex;
    setActiveStory(selectedStoryIndex);
    setDisablePrev(selectedStoryIndex == 0);
  }, [openStory]);

  //

  useEffect(() => {
    const previousVideo = document.getElementById(
      `storyVideo-${previousActiveStory}`
    );
    if (previousVideo) {
      previousVideo.pause();
    }
  }, [activeStory, previousActiveStory]);

  const handleSlideChanged = (event) => {
    console.log(event)
    //adding view
    const storyId = sortedStories[event.slide]?._id;
    let data = { userId:userId, storyId: storyId };
    dispatch(viewStoryApi(data));
    //

    const previousIndex = activeIndex;
    activeIndex = event.slide;
    setActiveStory(event.slide);
    setPreviousActiveStory(previousIndex);
    setDisablePrev(event.item === 0);
  };

  useEffect(() => {
    setTimeout(() => {
      const selectedVideo = document.getElementById(
        `storyVideo-${selectedStoryIndex}`
      );
      if (selectedVideo) {
        selectedVideo.play();
      }
    }, 100);
  }, [selectedStoryIndex]);

  useEffect(() => {
    setActiveStory(null);
    const video = document.getElementById(`storyVideo-${activeIndex}`);
    video?.play();
  }, [activeStory]);
  //

  function togglePlayPause() {
    const video = document.getElementById(`storyVideo-${activeIndex}`);
    if (video?.paused) {
      video.play();
    } else {
      video?.pause();
    }
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <Modal
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
        closeIcon={closeIcon}
        open={open}
        onClose={() => {
          setOpen(false);
          setOpenStory(false);
        }}
        showCloseIcon={false}
        center
      >
        <AliceCarousel
          activeIndex={selectedStoryIndex}
          onSlideChanged={handleSlideChanged}
          infinite={false}
          disableDotsControls={true}
          keyboardNavigation={true}
          renderPrevButton={handlePre}
          renderNextButton={handleNext}
          mouseTracking={true}
        >
          {sortedStories.map((data, index) => {
            return (
              <Stories
                key={index}
                spons={data?.isSponsored}
                add={data?.isHowSquareAdd}
                title={data?.title}
                description={data?.description}
                btnName={data?.btnName}
                btnUrl={data?.btnUrl}
                views={data?.views}
                setOpen={setOpen}
                imageUrl={data?.imageUrl}
                videoUrl={data?.videoUrl}
                setOpenStory={setOpenStory}
                uniqueId={index}
                
              />
            );
          })}
        </AliceCarousel>
      </Modal>
    </>
  );
}

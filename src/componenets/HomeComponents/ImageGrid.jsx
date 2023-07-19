import React, { useEffect, useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import {
  getStoriesApi,
  viewStoryApi,
} from "../../features/stories/StoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import StoryThumbnails from "./StoryThumbnails";
import { sortStoriesData } from "../logicFunctionalities/logics";
import { isContinueDispatching } from "../logicFunctionalities/logics";

import StoriesPopup from "./StoriesPopup";
import "./ImageGrid.css";

let CheckArray = [];
let slideIndex = 0;
const ImageGrid = () => {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories);
  const { userId } = useSelector((state) => state.user);

  console.log(stories)
  //
  const [page, setPage] = useState(1);
  // const [slideIndex,setSlideIndex]=useState(0);

  const [openStory, setOpenStory] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  let [stoiresData, setStoriesData] = useState([]);
  let [sortedStories, setSortedStories] = useState([]);

  CheckArray = [
    ...(stories?.simpleStories || ""),
    ...(stories?.HowSquareAddStories || ""),
    ...(stories?.sponsoredStories || ""),
  ];
  useEffect(() => {
    if (page == 1) {
      dispatch(getStoriesApi(page));
    } else {
      if (isContinueDispatching(CheckArray)) {
        dispatch(getStoriesApi(page));
      }
    }
  }, [page]);
  useEffect(() => {
    if (page == 1) {
      setStoriesData(stories);
    } else {
      setStoriesData((prev) => {
        return {
          sponsoredStories: prev.sponsoredStories.concat(
            stories.sponsoredStories
          ),
          HowSquareAddStories: prev.HowSquareAddStories.concat(
            stories.HowSquareAddStories
          ),
          simpleStories: prev.simpleStories.concat(stories.simpleStories),
        };
      });
    }
  }, [stories]);
  useEffect(() => {
    setSortedStories(sortStoriesData(stoiresData));
  }, [stoiresData]);

  function handleSlideChange(e) {
    let startDispatch = sortedStories.length - 3 == e.item;
    slideIndex = e.item;
    if (startDispatch) {
      setPage((prevPage) => prevPage + 1);
    }
  }
  const responsive = {
    2000: {
      items: 5,
    },
    1200: {
      items: 5,
    },
    800: {
      items: 4,
    },
    0: {
      items: 2,
    },
  };
  function handleStory(index, storyId) {
    let data = { userId:userId, storyId: storyId };
    //api to add view
    dispatch(viewStoryApi(data));
    setOpenStory(true);
    setSelectedStoryIndex(index);
  }
  const items = sortedStories.map((data, index) => {
    return (
      <StoryThumbnails
        handleStory={() => handleStory(index, data?._id)}
        videoUrl={data?.videoUrl}
        imageUrl={data?.imageUrl}
        spons={data?.isSponsored}
        add={data?.isHowSquareAdd}
        title={data?.title}
      />
    );
  });

  return (
    <div className="home-page-curosel-div">
      {openStory && (
        <StoriesPopup
          sortedStories={sortedStories}
          openStory={openStory}
          setOpenStory={setOpenStory}
          selectedStoryIndex={selectedStoryIndex}
          setPage={setPage}
          setSelectedStoryIndex={setSelectedStoryIndex}
        />
      )}
      <div className="imageGridMain">
        <AliceCarousel
          activeIndex={slideIndex}
          mouseTracking
          items={items}
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          animationDuration={600}
          autoPlayInterval={1000}
          disableButtonsControls={true}
          disableDotsControls={false}
          keyboardNavigation={true}
          onSlideChanged={handleSlideChange}
        />
      </div>
    </div>
  );
};

export default ImageGrid;

import React, { useEffect, useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import {
  getStoriesApi,
  viewStoryApi,
} from "../../features/stories/StoriesThunk";
import { useDispatch, useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import StoryThumbnails from "./StoryThumbnails";
import { sortStoriesData } from "../logicFunctionalities/logics";
import { isContinueDispatching } from "../logicFunctionalities/logics";

import StoriesPopup from "./StoriesPopup";
import "./ImageGrid.css";

let slideIndex = 0;
let totalPage;
let items = [];
// let startIndex = 0;
const ImageGrid = () => {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories);
  const { userId } = useSelector((state) => state.user);
  //
  const [page, setPage] = useState(1);
  const [openStory, setOpenStory] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  let [stoiresData, setStoriesData] = useState([]);
  let [sortedStories, setSortedStories] = useState([]);

  useEffect(() => {
    dispatch(getStoriesApi({ userId: userId, pageIndex: page })).then(
      ({ payload }) => {
        setStoriesData((pre) => [...pre, ...payload.sortedStories]);
        //this logic is to handle request to load more stories in chunks if availble
        //payload?.count will only availble for first time when pageindex is 1
        if (payload?.count) {
          let totalCounts = payload?.count;
          let addCount = Math.ceil(
            Math.max(totalCounts.howSquareAdd, totalCounts.sponsored) / 2
          );
          let simpleCount = Math.ceil(totalCounts.simpleStories / 10);
          totalPage = Math.max(addCount, simpleCount);
        }
      }
    );
  }, [page]);
  useEffect(() => {
    if (stoiresData?.length > 0) {
      setSortedStories(sortStoriesData(stoiresData));
    }
  }, [stoiresData]);

  const [startIndex, setStartIndex] = useState(0);
  let totalIndex = Math.floor(sortedStories.length / 14);

  function handleSlideChange(e) {
    let startDispatch = items.length - 3 == e.item;
    slideIndex = e.item;
    if (startDispatch) {
      if (totalPage > page) {
        setPage((prevPage) => prevPage + 1);
      }
      //
    }
    let startChangeIndex = items.length == e.item;
    if (startChangeIndex) {
      if (totalIndex - 1 > startIndex) {
        setStartIndex((pre) => (pre += 1));
      } else if (totalIndex - 1 == startIndex && startIndex != 0) {
        setStartIndex(0);
      }
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
      items: 3,
    },
    0: {
      items: 1,
    },
  };
  function handleStory(index, storyId) {
    let data = { userId: userId, storyId: storyId };
    //api to add view
    dispatch(viewStoryApi(data));
    setOpenStory(true);
    setSelectedStoryIndex(index + startIndex * 14);
  }
  items = sortedStories
    .slice(startIndex * 14, 14 + startIndex * 14)
    .map((data, index) => {
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
          // activeIndex={slideIndex}
          mouseTracking
          items={items}
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          animationDuration={800}
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

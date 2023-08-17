import React from "react";
import { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { checkActiveUserApi } from "../../features/user/userThunk";
import { logoutUser } from "../../features/user/userSlice";
export function autoLoadMore() {
  // This Logic is auto reload when Reached to last post
  const [offset, setOffset] = React.useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [loadMoreHeight, setloadMoreHeight] = useState();
  const ref = useRef(null);
  useEffect(() => {
    setloadMoreHeight(ref?.current?.offsetTop);
  });

  //This is used for pagination || count loading used in backend logic
  const [page, setPage] = React.useState(1);
  function loadMore() {
    setPage(page + 1);
  }
  // This is also used with loading logic
  const [reached, setReached] = useState(false);
  if (reached == false) {
    if (offset + 700 >= loadMoreHeight) {
      setReached(true);
      loadMore();
    }
  }
  return {
    page: page,
    ref: ref,
    setReached: setReached,
    setPage: setPage,
  };
}

//
export function gettingTumbnailImg(description) {
  const html = parse(description);
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  // let description=tempElement.querySelector('p')?.innerHTML;
  const firstImg = tempElement.querySelector("img");
  const src = firstImg ? firstImg.getAttribute("src") : null;
  return src;
}
export function gettingBlogDescription(desc) {
  const html = parse(desc);
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  const paragraphElements = tempElement.querySelectorAll("p");
  let description = "";
  for (let i = 0; i < 5 && i < paragraphElements.length; i++) {
    const paragraph = paragraphElements[i];
    description += paragraph.textContent;
  }
  return description;
}
//sorting stories data
export function sortStoriesData(stories) {
  // Categorize stories based on types
  const sponsoredStories = stories.filter((story) => story.isSponsored);
  const howSquareAddStories = stories.filter((story) => story.isHowSquareAdd);
  const simpleStories = stories.filter(
    (story) => story.isSponsored == false && story.isHowSquareAdd == false
  );

  let sortedStories = [];
  let howSquareAddIndex = 0;
  let sponsoredIndex = 0;
  let simpleIndex = 0;
//this for mantainng order .....
  let numberOfIterations = Math.max(
    howSquareAddStories.length,
    sponsoredStories.length
  );
  if (numberOfIterations < 1) {
    numberOfIterations = Math.ceil(stories.length / 7);
  }

  for (let i = 0; i < numberOfIterations; i++) {
    for (let j = 0; j < 7; j++) {
      if (howSquareAddStories.length > 0) {
        if (j == 6) {
          sortedStories.push(howSquareAddStories[howSquareAddIndex]);
          if (howSquareAddIndex + 1 == howSquareAddStories.length) {
            howSquareAddIndex = 0;
          } else {
            howSquareAddIndex += 1;
          }
          continue;
        }
      }
      if (sponsoredStories.length > 0) {
        //j==6 beacuse if howSquareAddStories not availble then we will push sponsoredStories
        //if howSquareAddStories availble then at index 6 loop skip from above
        if (j == 3 || j == 6) {
          sortedStories.push(sponsoredStories[sponsoredIndex]);
          if (sponsoredIndex + 1 == sponsoredStories.length) {
            sponsoredIndex = 0;
          } else {
            sponsoredIndex += 1;
          }
          continue;
        }
      }
      if (simpleStories.length > 0) {
        sortedStories.push(simpleStories[simpleIndex]);
        if (simpleIndex + 1 == simpleStories.length) {
          simpleIndex = 0;
        } else {
          simpleIndex += 1;
        }
      }
    }
  }
  return sortedStories;
}

//when api response is empty to stop dispatch
export function isContinueDispatching(data) {
  if (data.length == 0) {
    return false;
  } else {
    return true;
  }
}

// checking user availble or not
export function CheckUser() {
  const dispatch = useDispatch();
  const { activeUser, userId, writerId } = useSelector((state) => state.user);
  const { image } = useSelector((state) => state.writerRequest);
  useEffect(() => {
    if (userId || writerId) {
      let data = {
        userId: userId,
        writerId: writerId,
      };
      dispatch(checkActiveUserApi(data)).then((res) => {
        if (res.error) {
          dispatch(logoutUser());
        }
      });
    }
  }, [userId, image]);
}

//sending request when reaches to specific portion

export function LoadApi(targetElementRef, callback) {
  // useEffect(() => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      callback();
    }
  }, options);

  if (targetElementRef.current) {
    observer.observe(targetElementRef.current);
  }

  // return () => {
  // if (targetElementRef.current) {
  //   observer.unobserve(targetElementRef.current);
  // }
  // };
  // }, []);

  // return targetElementRef;
}

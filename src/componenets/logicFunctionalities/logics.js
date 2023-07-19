import React from "react";
import { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { checkActiveUserApi } from "../../features/user/userSlice";
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
export function sortStoriesData(stoiresData) {
  let sortedStories = [];
  let sponsoredCount = 0;
  let howSquareCount = 0;
  let simpleCount = 0;

  let length =
    stoiresData?.simpleStories?.length +
    stoiresData?.sponsoredStories?.length +
    stoiresData?.HowSquareAddStories?.length;

  for (let index = 0; index < length; index++) {
    // .................................................................
    if (stoiresData.HowSquareAddStories.length > 0) {
      if (index % 6 === 0 && index != 0) {
        if (howSquareCount < stoiresData.HowSquareAddStories.length) {
          sortedStories.push(stoiresData.HowSquareAddStories[howSquareCount]);
          howSquareCount++;
        } else {
          howSquareCount = 0;
          sortedStories.push(stoiresData.HowSquareAddStories[howSquareCount]);
        }
      }
    }
    // .................................................................
    if (stoiresData.sponsoredStories.length > 0) {
      if (stoiresData.HowSquareAddStories.length > 0) {
        if (index % 3 === 0 && index != 0 && index % 6 != 0) {
          if (sponsoredCount < stoiresData.sponsoredStories.length) {
            sortedStories.push(stoiresData.sponsoredStories[sponsoredCount]);
            sponsoredCount++;
          } else {
            sponsoredCount = 0;
            sortedStories.push(stoiresData.sponsoredStories[sponsoredCount]);
          }
        }
      } else {
        if (index % 3 === 0 && index != 0) {
          if (sponsoredCount < stoiresData.sponsoredStories.length) {
            sortedStories.push(stoiresData.sponsoredStories[sponsoredCount]);
            sponsoredCount++;
          } else {
            sponsoredCount = 0;
            sortedStories.push(stoiresData.sponsoredStories[sponsoredCount]);
          }
        }
      }
    }
    // .................................................................
    if (stoiresData?.simpleStories?.length > 0) {
      if (
        stoiresData.sponsoredStories.length > 0 &&
        stoiresData.HowSquareAddStories.length > 0
      ) {
        if (
          index % 3 != 0 &&
          index % 6 != 0 &&
          simpleCount < stoiresData?.simpleStories?.length
        ) {
          sortedStories.push(stoiresData?.simpleStories[simpleCount]);
          simpleCount += 1;
        }
      } else if (stoiresData.sponsoredStories.length) {
        if (
          index % 3 != 0 &&
          simpleCount < stoiresData?.simpleStories?.length
        ) {
          sortedStories.push(stoiresData?.simpleStories[simpleCount]);
          simpleCount += 1;
        }
      } else if (stoiresData.HowSquareAddStories.length > 0) {
        if (
          index % 6 != 0 &&
          simpleCount < stoiresData?.simpleStories?.length
        ) {
          sortedStories.push(stoiresData?.simpleStories[simpleCount]);
          simpleCount += 1;
        }
      } else if (simpleCount < stoiresData?.simpleStories?.length) {
        sortedStories.push(stoiresData?.simpleStories[simpleCount]);
        simpleCount += 1;
      } else if (index % 3 != 0 && index % 6 != 0) {
        simpleCount = 0;
        sortedStories.push(stoiresData?.simpleStories[simpleCount]);
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

export function LoadApi(callback) {
  const targetElementRef = useRef(null);

  useEffect(() => {
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

    return () => {
      if (targetElementRef.current) {
        observer.unobserve(targetElementRef.current);
      }
    };
  }, []);

  return targetElementRef;
}

// console.log(length);
// .length + stoiresData?.sponsoredStories?.length + stoiresData?.HowSquareAddStories?.length;

// stoiresData?.simpleStories?.forEach((story, index) => {
//   commonIndex += 1;
//   sortedStories.push(story);

//   if (stoiresData.HowSquareAddStories.length > 0) {
//     if (commonIndex % 6 === 0) {
//       if (howSquareCount < stoiresData.HowSquareAddStories.length) {
//         commonIndex += 1;
//         sortedStories.push(stoiresData.HowSquareAddStories[howSquareCount]);
//         howSquareCount++;
//       } else {
//         howSquareCount = 0;
//         sortedStories.push(stoiresData.HowSquareAddStories[howSquareCount]);
//       }
//     }
//   }
//   if (stoiresData.sponsoredStories.length > 0) {
//     if (commonIndex % 3 === 0) {
//       if (sponsoredCount < stoiresData.sponsoredStories.length) {
//         commonIndex += 1;
//         sortedStories.push(stoiresData.sponsoredStories[sponsoredCount]);
//         sponsoredCount++;
//       } else {
//         sponsoredCount = 0;
//         sortedStories.push(stoiresData.sponsoredStories[sponsoredCount]);
//       }
//     }
//   }
// });

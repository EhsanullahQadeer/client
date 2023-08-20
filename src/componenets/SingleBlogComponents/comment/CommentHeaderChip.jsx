import React, { useEffect, useState } from "react";
import likeSound from "../../../assets/audios/like.mp3";
import clap from "../../../assets/clap.png";
import clapped from "../../../assets/clapped.png";
import BookMark from "../BookMark";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { LikeSingleBlogApi } from "../../../features/blog/blogThunk";
export default function CommentHeaderChip({
  totalComments,
  isBookmarked,
  setisBookMarked,
  liked,
  likes,
}) {
    const dispatch=useDispatch();
  let { blogId } = useParams();

  const [isLiked, setisLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    liked && setisLiked(true);
  }, [liked]);

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  function toggleLike() {
    dispatch(LikeSingleBlogApi(blogId)).then((res) => {
      if (!res.error) {
        let liked = res.payload.msg == "liked";
        if (liked) {
          const sound = new Audio(likeSound);
          sound.play();
          setLikeCount((pre) => pre + 1);
          setisLiked(true);
        } else {
          setLikeCount((pre) => pre - 1);
          setisLiked(false);
        }
      }
    });
  }
  return (
    <div className="commentsChipMain">
      <div className="commentBigFlex align-items-center">
        <div className="commentSmallFlex align-items-center">
          <div className="like-container">
            <img
              onClick={toggleLike}
              className={`cur-point like-icon ${
                isLiked ? "liked" : "not-liked"
              }`}
              style={{ height: "35px" }}
              src={isLiked ? clapped : clap}
              alt="like"
            />
          </div>
          <p className="mr-2">{likeCount}</p>
        </div>
        <div className="commentSmallFlex ">
          <div
            style={{ color: "#2d9899", fontSize: "25px" }}
            className="cur-point fa-regular fa-comment  d-flex align-items-center"
          ></div>
          <p>{totalComments}</p>
        </div>
      </div>
      <div className="commentBigFlex">
        <BookMark
          setisBookMarked={setisBookMarked}
          isBookmarked={isBookmarked}
          Bookmarkcolor={"rgb(45, 152, 153)"}
        />
      </div>
    </div>
  );
}

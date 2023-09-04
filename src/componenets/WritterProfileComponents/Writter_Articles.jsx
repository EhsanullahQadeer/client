import React, { useState } from "react";
import timeToRead from "../timeToRead/timeToRead";
import { Link } from "react-router-dom";
import { gettingTumbnailImg } from "../logicFunctionalities/logics";
import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { SmallAlert } from "../Alert/Alerts";
import { gettingBlogDescription } from "../logicFunctionalities/logics";
import { FaUserCircle } from "react-icons/fa";
import {
  RemoveBookMarkAlert,
  RemoveBookMarkSuccessAlert,
} from "../Alert/Alerts";
import { removeBookmarkApi } from "../../features/blog/blogThunk";
import { useDispatch } from "react-redux";
import { Writer_Files_URL } from "../../utils";
import { BookMarkShareModal } from "./BookMarkShareModal";

moment().format();
export default function Writter_Articles(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const handleBookmark = e => {
    setBlogUrl(`${location.origin}/Blog/${e?.blogId?._id}`);
    setOpen(true);
    setDesc(e?.blogId?.description);
    setTitle(e?.blogId?.title);
  }
  const userId = props?.userId;
  return props?.blogsData?.map((item, index) => {
    //
    let recentBlog = item?.blogId;
    let recentBlogWriter = item?.blogId?.writer;
    let viewedTime = item?.timestamp;
    const formattedTime = moment(viewedTime).fromNow();

    const bookmarkTime = new Date(viewedTime).toString().slice(0, 15);

    //
    let date = new Date(item?.createdAt || recentBlog?.createdAt)
      .toUTCString()
      .slice(4, 16);
    let time = timeToRead(item?.description || recentBlog?.description);
    const blogDescription = gettingBlogDescription(
      "" + (item?.description || recentBlog?.description)
    );
    const src = gettingTumbnailImg(
      "" + (item?.description || recentBlog?.description)
    );
    //
    let writerPhoto;
    if (item?.writer?.photo || recentBlogWriter?.photo) {
      writerPhoto =
        Writer_Files_URL + (item?.writer?.photo || recentBlogWriter?.photo);
    }

    // Bookmark logics
    let apiData = { blogId: recentBlog?._id, userId: userId };
    const dispatch = useDispatch();
    function removeBookmarkFun() {
      RemoveBookMarkAlert().then((result) => {
        if (result.isConfirmed) {
          dispatch(removeBookmarkApi(apiData)).then(() => {
            SmallAlert({
              icon: "success",
              title: "Removed from bookmark",
              danger: true,
            });
            const newArray = props?.blogsData?.filter((item, i) => i !== index);
            props.setBlogsData(newArray);
          });
        }
      });
    }
    return (
      <div className="writerBlogs">
        <div className="writerArticlesFlex">
          <div>
            <div className="blogsPart1">
              <div>
                <div className="singleBlog">
                  <Link
                    className="link"
                    to={`/blog/${item?._id || recentBlog?._id}/${userId}`}
                  >
                    <div className="singleBlog-img">
                      <img src={src} alt="Tubmnail Missing" />
                    </div>
                  </Link>
                  <div className="blogsContent">
                    <Link
                      className="link"
                      to={`/blog/${item?._id || recentBlog?._id}/${userId}`}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="travelChip">
                          <p>{item?.category || recentBlog?.category}</p>
                        </div>
                        {props?.recentViewedTime && (
                          <div>
                            <span className="viewedAgo-p">
                              Viewed&nbsp;&nbsp;{formattedTime}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="blogsHead">
                        <p>{item?.title || recentBlog?.title}</p>
                      </div>
                      <div className="trendingFlex writerProfileBlogDate-flex">
                        {writerPhoto ? (
                          <img className="circularImg" src={writerPhoto} />
                        ) : (
                          <FaUserCircle size={18} color={"#b1b1b1"} />
                        )}
                        <p className="whiteSpace">
                          {item?.writer?.name || recentBlogWriter?.name}
                        </p>
                        <span className="fa-xs">|</span>
                        <div className="trendingTime writerProfileBlogDate-flex">
                          <span className="fa-sharp fa-regular fa-calendar-days fa-sm"></span>
                          <p className="whiteSpace">{date}</p>
                          <span className="fa-xs">|</span>
                          <span className="fa-sharp fa-regular fa-clock fa-sm"></span>
                          <p className="whiteSpace">{time}</p>
                        </div>
                      </div>
                      {props?.description != "hide" && (
                        <p
                          className="writer-detail-blog-p"
                          dangerouslySetInnerHTML={{
                            __html: blogDescription,
                          }}
                        ></p>
                      )}
                    </Link>
                    {/* Only for bookmark section */}
                    {props?.bookmark && (
                      <div className="">
                        <div>
                          <p className="writer-detail-blog-p pe-none">
                            You bookmarked it on {bookmarkTime}
                          </p>
                        </div>
                        <div className=" ">
                          <div>
                            <Tooltip
                              title="Remove Bookmark"
                              placement="top-start"
                              arrow
                            >
                              <IconButton onClick={removeBookmarkFun}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              className="ml-1"
                              title="Share"
                              placement="top-start"
                              arrow
                            >
                              <IconButton onClick={()=> handleBookmark(item)}>
                                <ShareIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {item?.status && (
              <button className={`${item?.status?.toLowerCase()}Chip`}>
                {item?.status}
              </button>
            )}
          </div>
        </div>
        <BookMarkShareModal url={blogUrl} title={title} description={desc} setOpen={setOpen} open={open}/>
      </div>
    );
  });
}

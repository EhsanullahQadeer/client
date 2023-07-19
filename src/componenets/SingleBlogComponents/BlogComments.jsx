import React, { useState, useRef } from "react";
import "./index.css";
import like from "../../assets/like.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import clap from "../../assets/clap.png";
import clapped from "../../assets/clapped.png";
import comment from "../../assets/comment.png";
import commentIcon from "../../assets/commentBlog.png";
import { IconButton } from "@mui/material";
import Up from "../../assets/badgeUp.png";
import Down from "../../assets/badgeDown.png";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import feed from "../../assets/feedback.png";
import moment from "moment";
import { commentArr } from "./CommentsData";
import img1 from "../../assets/Ellipse 77.png";
import likeSound from "../../assets/audios/like.mp3";
import { useDispatch, useSelector } from "react-redux";
import { LikeSingleBlogApi } from "../../features/blog/blogSlice";
import Button from "@mui/material/Button";
import { Writer_Files_URL } from "../../utils";
import {
  createCommentApi,
  replyToCommentApi,
  createReplyToReplyApi,
  getAllCommentsApi,
  getCommentRepliesApi,
  getReplyToCommentReplyApi,
  updateCommentApi,
  updateCommentReplyApi,
  updateReplyToReplyApi,
  deleteCommentApi,
  deleteCommentReplyApi,
  deleteReplyToReplyApi,
} from "../../features/comments/commentsSlice";
import { LoadApi } from "../logicFunctionalities/logics";
import defImg from "../../assets/Profile-PNG-File.png";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Height, Title } from "@mui/icons-material";
import CommentOptions from "./commentMoreAction";
import ConfirmationAlertMui from "../Alert/Alerts";
import { SmallAlert } from "../Alert/Alerts";

const BlogComments = ({ likes,liked }) => {
  moment().format();
  let { blogId } = useParams();
  const dispatch = useDispatch();
  const { activeUser, userId } = useSelector((state) => state.user);
  const { processing, comments } = useSelector((state) => state.comments);
  const [inputValue, setInputValue] = useState("");

  const [totalPages, setTotalPages] = useState(10);
  const [totalComments, setTotalComments] = useState(0);
  const [pageIndex, setpageIndex] = useState(1);
  const [commentsData, setCommentsData] = useState([]);
  //
  const [isLiked, setisLiked] = useState(false);


  //Getting comments
  useEffect(() => {
    if (comments && comments.comments) {
      if (pageIndex == 1) {
        setCommentsData(comments.comments);
        setTotalComments(comments?.totalCount);
        setpageIndex(2);
      } else {
        setCommentsData((pre) => [...pre, ...comments.comments]);
        setpageIndex((prevPage) => prevPage + 1);
      }
      setTotalPages(comments?.totalPages);
    }
  }, [comments]);

  function getAllComments() {
    let dataSet = {pageIndex, blogId };
    dispatch(getAllCommentsApi(dataSet));
  }
  useEffect(() => {
    let dataSet = {pageIndex, blogId };
    dispatch(getAllCommentsApi(dataSet));
    liked&&setisLiked(true);
  }, [liked]);
  //for chunks
  // const targetElementRef = LoadApi(getAllComments());

  //get comment replies
  const [replyData, setReplyData] = useState([]);
  const [toggleShowReplyId,setToggleReplyId]=useState(0);

  //
  const [editCommentValue, setEditCommentValue] = useState("");
  const [replyValue, setReplyValue] = useState("");
  const [ifnoChangeEditValue, setIfnoChangeEditValue] = useState();
  const [editReplyValue,setEditReplyValue]=useState("");
  const [pushNewReply,setPushNewReply]=useState("")


  const handleInputChange = (event) => {
    let inputName = event.target.name;
    const { value } = event.target;

    if (value.length <= 2000) {
      if (inputName == "editComment") {
        setEditCommentValue(value);
      } else if (inputName == "reply") {
        setReplyValue(value);
      } else if(inputName=="commentReply"){
        setEditReplyValue(value)
      }
      else {
        setInputValue(value);
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ...................................Geting................................................................

  function getCommentReplies(commentId) {
    if(toggleShowReplyId!=commentId){
     setToggleReplyId(commentId)
     dispatch(getCommentRepliesApi(commentId)).then((res) => {
       if (!res.error) {
         setReplyData(res.payload);
       }
     });
     
   }else{
     setToggleReplyId(0)
   setReplyData([])

   }
   
 }
// ...................................Create................................................................

  //Create comment
  const submitComment = () => {
    let submit = inputValue.replace(/\s/g, "").length > 1;
    if (submit) {
      let data = { blogId: blogId, userId: userId, text: inputValue };

      dispatch(createCommentApi(data)).then((res) => {
        console.log(res)
        if (!res.error) {
        setCommentsData((pre) => [res.payload, ...pre]);
          setInputValue([]);
        }
      });
    } else {
    }
  };
  //create comment reply
  const [openReplyId, setopenReplyId] = useState(0);
  function submitReply(id) {
    dispatch(replyToCommentApi({ commentId: id, text: replyValue })).then(
      (res) => {
        if (!res.error) {
          setReplyData((pre) => [res.payload, ...pre]);
          setInputValue("");
          setReplyValue("");
          setopenReplyId(0);
          setPushNewReply((pre)=>(
            [...pre , id]
          ))
      setToggleReplyId(id)

        }
      }
    );
  }
  
  //handle comment Actions
  const handleEdit = (id, text) => {
    setEditCommentId(id);
    setEditCommentValue(text);
    setIfnoChangeEditValue(text);
  };


// ...................................Report................................................................

  const handleReport = () => {};
  
// ...................................Edit/Upadte................................................................
//handling edit comment input
const editCommentInputRef = useRef(null);
const [editCommentId, setEditCommentId] = useState(0);
useEffect(() => {
  if (editCommentId) {
    // Set focus on the input field when editCommentId changes
    editCommentInputRef.current.focus();
    editCommentInputRef.current.setSelectionRange(
      editCommentValue.length,
      editCommentValue.length
    );
  }
}, [editCommentId]);
  //handling editcommet Upadte
  const [editerror, setEditerror] = useState("");
  function updateEditedComment(commentId, index) {
    let submit = editCommentValue.replace(/\s/g, "").length > 1;
    if (submit) {
      if (!(ifnoChangeEditValue == editCommentValue)) {
        let data = { commentId: commentId, text: { text: editCommentValue } };
        dispatch(updateCommentApi(data)).then((res) => {
          let newArr = [...commentsData];
          newArr[index] = res.payload;
          setCommentsData(newArr);
          setEditCommentId(0);
          if (!res.error) {
            // setInputValue("");
          }
        });
      } else {
        setEditerror("You dont's have any changes to save.");
        setTimeout(() => {
          setEditerror("");
        }, 2000);
      }
    } else {
      setEditerror("You can not submit empty comment.");
      setTimeout(() => {
        setEditerror("");
      }, 2000);
    }
  }

    //handle reply edit
    const [editReplyId,setEditReplyId]=useState(0);

    function handleEditReply(id, text){
      setEditReplyId(id)
      setEditReplyValue(text);
      setIfnoChangeEditValue(text);
    }
  //handle edit comment Reply 
  function submitEditCommentReply(replyId,index){
    let submit = editReplyValue.replace(/\s/g, "").length > 1;
    if (submit) {
      if (!(ifnoChangeEditValue == editReplyValue)) {
        let data = { replyId: replyId, text: { text: editReplyValue } };

        dispatch(updateCommentReplyApi(data)).then((res) => {
          if (!res.error) {
            let newArr = [...replyData];
          newArr[index] = res.payload;
          setReplyData(newArr);
          setEditReplyId(0);
            setReplyValue("");
          }
        });
      } else {
        setEditerror("You dont's have any changes to save.");
        setTimeout(() => {
          setEditerror("");
        }, 2000);
      }
    } else {
      setEditerror("You can not submit empty Reply.");
      setTimeout(() => {
        setEditerror("");
      }, 2000);
    }
  }
// ...................................Delete................................................................
  // handle delete comment
  function handleDelete(commentId, index) {
    dispatch(deleteCommentApi(commentId)).then((res) => {
      if (!res.error) {
        SmallAlert({
          icon: "success",
          title: "Comment deleted successfully.",
          danger: true,
        });
        commentsData.filter(() => {});
        setCommentsData((prevData) => prevData.filter((_, i) => i !== index));
      }
    });
  }
  //handle delete reply
  function handleDeleteReply(replyId, index) {
    dispatch(deleteCommentReplyApi(replyId)).then((res) => {
      if (!res.error) {
        SmallAlert({
          icon: "success",
          title: "Reply deleted successfully.",
          danger: true,
        });
        setReplyData((prevData) => prevData.filter((_, i) => i !== index));
      }
    });
  }

  // ........................................................................................................
  
  //toggle like

  const [likeCount, setLikeCount] = useState(0);
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


  //Handling Readmore
  const [expandedComments, setExpandedComments] = useState([]);

  const toggleCommentExpansion = (commentId) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments((prevExpanded) => {
        return prevExpanded.filter((id) => id !== commentId);
      });
    } else {
      setExpandedComments((prevExpanded) => [...prevExpanded, commentId]);
    }
  };

  // handling reply readmore
  const [expandReply,setExpandReply]=useState()
  function togglExpandReply(id){
    if(expandReply==id){
      setExpandReply(0)
    }else{
      setExpandReply(id)
    }

  }

  let curentuserImg;
  if(activeUser?.photo){
    curentuserImg=Writer_Files_URL+activeUser?.photo ;
  }

  return (
    <div className="commentsMain ">
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
          <img className="mr-3" src={Up} />
          <img src={Down} />
        </div>
      </div>
      {/*  */}
      {/* <div className="commnetPreNextContent">
        <p>
          AI in drug development — <br /> towards fully autonomous <br /> drug
          discovery
        </p>
        <p>
          Robots Need to Be Afraid of <br /> Humans Not the Other Way <br />{" "}
          Around
        </p>
      </div> */}

      {/* <div className="commnetArrows">
        <a style={{ textDecoration: "none", color: "inherit" }} href="">
          <div className="singleArrows">
            <span className="mr-2">
              <BsArrowLeft />
            </span>
            <p className="mt-1">Previous Post</p>
          </div>
        </a>
        <a style={{ textDecoration: "none", color: "inherit" }} href="">
          <div className="singleArrows">
            <p className="mt-1">Next Post</p>
            <span className="ml-2">
              <BsArrowRight />
            </span>
          </div>
        </a>
      </div> */}

      {/*  */}
      <h1 className="commnetsResponse">Total Responses - {totalComments}</h1>

      {/*  */}
      <div className="commentCard">
        <div className="commentWriterFlex">
          <img
            className=" img-fluid rounded-circle"
            src={curentuserImg|| defImg}
          />
          <p className="commentWriterFlexName">
          {activeUser?.name?activeUser?.name:
            activeUser?.firstName (activeUser?.lastName)}
          </p>
        </div>
        <div className="mt-4">
          <TextField
            className="w-100"
            id="filled-multiline-flexible"
            placeholder="What are your thoughts?"
            multiline
            maxRows={10}
            variant="standard"
            maxLength="100"
            value={inputValue}
            helperText={
              inputValue.length >= 2000 &&
              "You can write only upto 2000 character"
            }
            error
            required
            onChange={handleInputChange}
          />
          <div className="pt-2 pb-4">
            <LoadingButton
              className="float-right"
              size="small"
              onClick={submitComment}
              loading={processing}
              loadingIndicator=" "
              variant="standard"
            >
              <h2 className="commentFurther m-0">
                {processing ? "Submitting..." : "Comment"}
              </h2>
            </LoadingButton>
          </div>
        </div>
      </div>


{/* ,..............................comments.............................................. */}
      <div className="commentLightCard-div">
        <div className="topCommentCard-div">
          {commentsData.map((data, i) => {
            let user = data?.userId;
            let userPhoto;
            if(user?.photo){
              userPhoto= Writer_Files_URL+user?.photo
            }
            const formattedTime = moment(data.createdAt).fromNow();
            const commentLines = Math.ceil(data.text.length / 80);
            const isCommentExpanded = commentLines <= 3;
            return (
              <div>
              <div key={i} className="commentTop_card">
                <div className="d-flex justify-content-between commentHeader">
                  <div className="d-flex ">
                    <img
                      className="comment-user-img mr-3 img-fluid rounded-circle"
                      src={userPhoto|| defImg}
                      alt="img"
                    />
                    <div>
                      <p className="commentName-p">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <span className="commentTime">{formattedTime}</span>
                    </div>
                  </div>
                  <CommentOptions
                    handleDelete={() => {
                      handleDelete(data._id, i);
                    }}
                    handleEdit={() => {
                      handleEdit(data._id, data.text);
                    }}
                    handleReport={handleReport}
                    user={user._id == userId}
                    isShowAction={!(editCommentId == data._id)}
                  />
                </div>

                {editCommentId == data._id ? (
                  <div className="pb-5">
                    <TextField
                      name="editComment"
                      className="w-100"
                      id="filled-multiline-flexible"
                      placeholder="What are your thoughts?"
                      multiline
                      maxRows={10}
                      variant="standard"
                      maxLength="100"
                      value={editCommentValue}
                      helperText={
                        editCommentValue.length >= 2000
                          ? "You can write only upto 2000 character"
                          : editerror && editerror
                      }
                      error
                      required
                      onChange={handleInputChange}
                      inputRef={editCommentInputRef}
                    />
                    <div className="float-right mt-2 mr-5">
                      <Button
                        onClick={() => {
                          setEditCommentId(0);
                        }}
                        style={{ backgroundColor: "#f24e1e", color: "#fff" }}
                        variant="contained"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          updateEditedComment(data._id, i);
                        }}
                        style={{ backgroundColor: "#0065fd", color: "#fff" }}
                        className="ml-3"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="commentDescription-p">
                      {expandedComments.includes(data._id)
                        ? data.text
                        : isCommentExpanded
                        ? data.text
                        : data.text.slice(0, 240) + "..."}
                    </p>
                    {!isCommentExpanded && (
                      <button
                        onClick={() => toggleCommentExpansion(data._id)}
                        className="commentReadMore mt-2"
                      >
                        {expandedComments == data._id
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                    {!(openReplyId == data._id) ? (
                      <div className="d-flex justify-content-between align-items-center mt-3">
                     
                        <div className={`${!data.replies &&!pushNewReply.includes(data._id)&&"invisible"}`}>
                          <img src={comment} alt="img" />
                          <button
                            onClick={() => {
                              getCommentReplies(data._id);
                            }}
                            className="ml-2"
                          >
                         { (!(toggleShowReplyId==data._id))?
                            "Show Replies ":"Hide Replies"}
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setopenReplyId(data._id);
                              setReplyValue("")

                            }}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <TextField
                          name="reply"
                          className="w-100"
                          id="filled-multiline-flexible"
                          placeholder="Add a reply..."
                          multiline
                          maxRows={10}
                          variant="standard"
                          maxLength="100"
                          value={replyValue}
                          helperText={
                            replyValue.length >= 2000 ?
                            "You can write only upto 2000 character":
                            editerror && editerror
                          }
                          error
                          required
                          onChange={handleInputChange}
                        />
                        <div className="pt-2 pb-4">
                          <Button
                            className={`float-right ml-2 ${
                              processing && "pe-none"
                            }`}
                            variant="text"
                            onClick={() => {
                              submitReply(data._id);
                            }}
                          >
                            {processing ? "Replying..." : "Reply"}
                          </Button>
                          <Button
                            style={{ color: "#f24e1e" }}
                            color="error"
                            className="float-right"
                            variant="text"
                            onClick={() => {
                              setopenReplyId(0);
                              setReplyValue("")
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                     

                    )}
                    
                  </>
                  
                )}
        </div>


                
             
        



{/*.................................... Coment Reply................................................ */}

   {(data._id ==replyData[0]?.commentId)&&

        <div className="commentCardReply_Div">
          {replyData.map((replyDataValue, replyIndex) => {
            let replyUser=replyDataValue.userId;
            let replyText=replyDataValue.text;
            const replyTime = moment(data.createdAt).fromNow();
            return (
              <div key={i} className="commentReply_card commentReplyMain">
                <div className="d-flex justify-content-between commentHeader">
                  <div className="d-flex">
                    <img className="replyUserImg" src={replyDataValue.photo||defImg} alt="img" />
                    <div>
                      <p className="commentName-p">{replyUser.firstName} {replyUser.lastName}</p>
                      <span className="commentTime">{replyTime}</span>
                    </div>
                  </div>


     


                  <CommentOptions
                    handleDelete={() => {
                      handleDeleteReply(replyDataValue._id, replyIndex);
                    }}
                    handleEdit={() => {
                      handleEditReply(replyDataValue._id, replyText);
                    }}
                    handleReport={handleReport}
                    user={replyUser._id == userId}
                    isShowAction={!(editCommentId == replyUser._id)}

                    commentsReply={true}
                  />

                </div>


                <>
                {!(editReplyId ==replyDataValue._id)?
                  <>
                    <p className="commentDescription-p">
                      {
                        (expandReply==replyDataValue._id)?replyText:

                        replyText.length>240?replyText.slice(0, 240) + "...":replyText
                        
                        
                        }
                    </p>
                    {replyText.length>240&& (
                      <button
                        onClick={() => togglExpandReply(replyDataValue._id)}
                        className="commentReadMore mt-2"
                      >
                        {expandReply==replyDataValue._id
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                    </>
                    :
                    
                    <div className="mt-4">
                        <TextField
                          name="commentReply"
                          className="w-100"
                          id="filled-multiline-flexible"
                          placeholder="Add a reply..."
                          multiline
                          maxRows={10}
                          variant="standard"
                          maxLength="100"
                          value={editReplyValue}
                          helperText={
                            editReplyValue.length >= 2000 ?
                            "You can write only upto 2000 character"
                            : editerror && editerror
                          }
                          error
                          required
                          onChange={handleInputChange}
                        />
                        <div className="pt-2 pb-4">
                          <Button
                            className={`float-right ml-2 ${
                              processing && "pe-none"
                            }`}
                            variant="text"
                            onClick={() => {
                              submitEditCommentReply(replyDataValue._id,replyIndex);
                            }}
                          >
                            {processing ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            style={{ color: "#f24e1e" }}
                            color="error"
                            className="float-right"
                            variant="text"
                            onClick={() => {
                              setEditReplyId(0);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                }
                  </>

                 { !(editReplyId ==replyDataValue._id) &&
                <div className=" d-flex justify-content-between  align-items-center">
                {replyData?.replies?
                  <div className="">
                    <img src={comment} alt="img" />
                    <button className="ml-2">{data.replies} Replies</button>
                  </div>:
                  <div></div>
                }
                  <div className="float-right w">
                  <button className="float-right">Reply</button>
                  </div>
                </div>
}


              </div>
            );
          })}
        </div>
      }

        </div>
            );
          })}




</div>
      </div>
      <div className="text-center mt-5">
      {pageIndex <= totalPages && (
        <button onClick={getAllComments} className="home-loadMore-btn" >Load More</button>
        
      )}
      </div>
    </div>
  );
};

export default BlogComments;

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
  useRef,
  createContext,
} from "react";
import { getCommentRepliesApi } from "../../../features/comments/commentThunk";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  updateCommentReplyApi,
  deleteCommentReplyApi,
  createReplyToReplyApi,
} from "../../../features/comments/commentThunk";
import { SmallAlert } from "../../Alert/Alerts";
import SmallComment from "./SmallComment";
import { CombinedContext } from "./Step1Repies";
import Step3Replies from "./Step3Replies";

let preOpenReplyId;
export const Step2Context = createContext();
const Step2Repies = (
  {
    commentId,
    data,
    replyData,
    setReplyData,
    tempReplyData,
    setTempReplyData,
    setEditCommentId,
    editCommentValue,
  },
  ref
) => {
  const grandchildRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getCommentReplies,
  }));
  const dispatch = useDispatch();

  moment().format();
  const [editerror, setEditerror] = useState("");

  const { replyText, setReplyText, setopenReplyId, trackChangesInput } =
    useContext(CombinedContext);
  //

  //Getting comment replies
  function getCommentReplies(commentId) {
    dispatch(getCommentRepliesApi(commentId)).then((res) => {
      if (!res.error) {
        setReplyData(res.payload);
      }
    });
  }

  //handle edit comment Reply
  function submitEditCommentReply(replyId, index, arrayName) {
    let submit = editCommentValue.replace(/\s/g, "").length > 0;
    if (submit) {
      if (!(trackChangesInput == editCommentValue)) {
        let data = { replyId: replyId, text: { text: editCommentValue } };

        dispatch(updateCommentReplyApi(data)).then((res) => {
          //Their are types we are using to map through replies ,, one is temp in this array the use replied now,
          //in reply data array we set data comes from backend of specific comments
          let newArr;
          if (!res.error) {
            if (arrayName == "tempReplyData") {
              newArr = [...tempReplyData];
              newArr[index] = res.payload;
              setTempReplyData(newArr);
            } else if (arrayName == "replyData") {
              newArr = [...replyData];
              newArr[index] = res.payload;
              setReplyData(newArr);
              //Now we need to check is this reply is availble in temp array to reflect edit changes ,we also have
              // change text of repliy in temp data
              let isReplyAvailbleIndex = tempReplyData.findIndex(
                (item) => item._id == replyId
              );
              //beacuse when it does not find any reply ,-1 will be in isReplyAvailbleIndex
              if (isReplyAvailbleIndex != -1) {
                // we set this value directly bcz no need to render autoo
                tempReplyData[isReplyAvailbleIndex] = res.payload;
              }
            }

            setEditCommentId(0);
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
  //handle delete reply
  function handleDeleteReply(replyId, index, arrayName) {
    dispatch(deleteCommentReplyApi(replyId)).then((res) => {
      if (!res.error) {
        SmallAlert({
          icon: "success",
          title: "Reply deleted successfully.",
          danger: true,
        });
        if (arrayName == "tempReplyData") {
          setTempReplyData((prevData) =>
            prevData.filter((_, i) => i !== index)
          );
        } else if (arrayName == "replyData") {
          setReplyData((prevData) => prevData.filter((_, i) => i !== index));
          //Now we need to check is this reply is availble in temp array to remove
          let isReplyAvailbleIndex = tempReplyData.findIndex(
            (item) => item._id == replyId
          );
          if (isReplyAvailbleIndex != -1) {
            // we remove reply directly bcz no need to render autoo
            tempReplyData.splice(isReplyAvailbleIndex, 1);
          }
        }
      }
    });
  }

  function handleReport() {}

  function submitReply(id) {
    let submit = replyText.replace(/\s/g, "").length > 0;
    if (submit) {
      dispatch(createReplyToReplyApi({ replyId: id, text: replyText })).then(
        (res) => {
          if (!res.error) {
            let data = res.payload;
            setReplyToReplyData((pre) => {
              //   let data = updateHierarchy(pre, res.payload);
              const updatedHierarchy = JSON.parse(JSON.stringify(pre));
              // Update the copied hierarchy with the new data using updateHierarchy
              grandchildRef.current.updateHierarchy(updatedHierarchy, data, {
                addReply: true,
              });
              if (updatedHierarchy.length > 0) {
                return updatedHierarchy;
              } else {
                return [...pre, data];
              }
            });
            setReplyText("");
            setopenReplyId(0);
          }
        }
      );
    }
  }
  const [replyToReplyData, setReplyToReplyData] = useState([]);
  const [currentReplyId, setCurrentReplyId] = useState([]);

  const removeChilds = (currentLevel, replyIdToDelete, isDeleteWholeReply) => {
    for (let item of currentLevel) {
      if (item._id === replyIdToDelete) {
        // Remove the childReplies property from the parent reply
        if (isDeleteWholeReply) {
          const index = currentLevel.findIndex(
            (item) => item._id == replyIdToDelete
          );
          currentLevel.splice(index, 1);
        } else {
          delete item.childReplies;
        }
        return true;
      }
      if (item.childReplies) {
        const found = removeChilds(
          item.childReplies,
          replyIdToDelete,
          isDeleteWholeReply
        );
        if (found) {
          return true;
        }
      }
    }
    return false;
  };
  //get replies of replies

  function handleShowReplies(id) {
    //make empty state
    // setReplyToReplyData([]);
    if (!currentReplyId.includes(id)) {
      grandchildRef.current.getRepliesToReply(id);
      // setCurrentReplyId(id);
      setCurrentReplyId((pre) => [id,...pre]);
    } else {
      setCurrentReplyId((pre) => pre.filter((ID) => ID != id));
      setReplyToReplyData((pre) => {
        const updatedHierarchy = JSON.parse(JSON.stringify(pre));
        const found = removeChilds(updatedHierarchy, id);
        if (!found) {
          // make empty bcz its top level
          return [];
        } else {
          return updatedHierarchy;
        }
      });
    }
  }
  // making all the state gloabal to use in child gloabal instead passing as props
  const contextValue = {
    replyToReplyData,
    setReplyToReplyData,
    currentReplyId,
    setCurrentReplyId,
    handleDeleteReply,
    handleReport,
    submitReply,
    submitEditCommentReply,
    editerror,
    setEditerror,
    handleShowReplies,
    removeChilds,
  };
  return (
    <Step2Context.Provider value={contextValue}>
      <>
        {/* This is for to display comment for specifc commets */}
        {(data._id != commentId
          ? tempReplyData.some((element) => element.commentId == data._id)
          : true) && (
          <div className="commentCardReply_Div">
            {(data._id != commentId
              ? tempReplyData.filter((item) => item.commentId == data._id)
              : replyData
            ).map((replyDataValue, replyIndex) => {
              let arrayName;
              if (data._id != commentId) {
                arrayName = "tempReplyData";
              } else {
                arrayName = "replyData";
              }

              return (
                <div key={replyIndex}>
                  <SmallComment
                    replyDataValue={replyDataValue}
                    replyIndex={replyIndex}
                    arrayName={arrayName}
                  />
                  <Step3Replies
                    parentData={replyDataValue}
                    ref={grandchildRef}
                  />
                </div>
              );
            })}
          </div>
        )}
      </>
    </Step2Context.Provider>
  );
};

export default forwardRef(Step2Repies);

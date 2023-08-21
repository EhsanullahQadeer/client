import React, { forwardRef, useImperativeHandle, useContext } from "react";
import {
  getReplyToCommentReplyApi,
  updateReplyToReplyApi,
  deleteReplyToReplyApi,
} from "../../../features/comments/commentThunk";
import { SmallAlert } from "../../Alert/Alerts";

import { useDispatch } from "react-redux";
import { Step2Context } from "./Step2Repies";
import { CombinedContext } from "./Step1Repies";
import SmallComment from "./SmallComment";
const Step3Replies = ({ parentData }, ref) => {
  useImperativeHandle(ref, () => ({
    getRepliesToReply,
    updateHierarchy,
  }));
  const { replyToReplyData, setReplyToReplyData, setEditerror, removeChilds } =
    useContext(Step2Context);
  const { editCommentValue, trackChangesInput, setEditCommentId } =
    useContext(CombinedContext);

  const dispatch = useDispatch();

  const updateHierarchy = (currentLevel, newData, type) => {
    for (const item of currentLevel) {
      let compearer;
      if (type?.addReply) {
        compearer = newData.replyId;
      } else {
        compearer = newData[0].replyId;
      }

      if (item._id == compearer) {
        // When we have to add reply in herarical array or data
        if (type?.addReply) {
          if (item?.childReplies) {
            let arrayOfReplies = item.childReplies;
            item.childReplies = [newData, ...arrayOfReplies];
          } else {
            item.childReplies = [newData];
          }
        } else {
          item.childReplies = newData;
        }

        return true; // Stop traversing if parent is found
      }
      if (item.childReplies) {
        const found = updateHierarchy(item.childReplies, newData, type);
        if (found) {
          return true; // Stop traversing if parent is found
        }
      }
    }
    return false; // Continue traversing if parent is not found
  };

  //Getting comment replies
  function getRepliesToReply(replyId) {
    dispatch(getReplyToCommentReplyApi(replyId)).then((res) => {
      if (!res.error) {
        let data = res.payload;
        setReplyToReplyData((pre) => {
          //   let data = updateHierarchy(pre, res.payload);
          const updatedHierarchy = JSON.parse(JSON.stringify(pre));
          // Update the copied hierarchy with the new data using updateHierarchy
          updateHierarchy(updatedHierarchy, data);
          if (updatedHierarchy.length > 0) {
            return updatedHierarchy;
          } else {
            return [...pre, ...data];
          }
        });
      }
    });
  }
  const setEditReplyData = (currentLevel, editedReply) => {
    for (const item of currentLevel) {
      if (item._id === editedReply._id) {
        item.text = editedReply.text;
        return true; // Stop traversing if parent is found
      }
      if (item.childReplies) {
        const found = setEditReplyData(item.childReplies, editedReply);
        if (found) {
          return true; // Stop traversing if parent is found
        }
      }
    }
    return false; // Continue traversing if parent is not found
  };

  //handle edit comment Reply
  function submitEditReplyToReply(replyId, index, arrayName) {
    let submit = editCommentValue.replace(/\s/g, "").length > 0;
    if (submit) {
      if (!(trackChangesInput == editCommentValue)) {
        let data = {
          replyToReplyId: replyId,
          text: { text: editCommentValue },
        };

        dispatch(updateReplyToReplyApi(data)).then((res) => {
          let newArr;
          if (!res.error) {
            let data = res.payload;
            setReplyToReplyData((pre) => {
              //   let data = updateHierarchy(pre, res.payload);
              const DataToUpdate = JSON.parse(JSON.stringify(pre));
              // Update the copied hierarchy with the new data using updateHierarchy
              setEditReplyData(DataToUpdate, data);
              return DataToUpdate;
            });

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
  function handleDeleteReplyToReply(replyId, index, arrayName) {
    dispatch(deleteReplyToReplyApi(replyId)).then((res) => {
      if (!res.error) {
        SmallAlert({
          icon: "success",
          title: "Reply deleted successfully.",
          danger: true,
        });
        setReplyToReplyData((pre) => {
          const updatedHierarchy = JSON.parse(JSON.stringify(pre));
          removeChilds(updatedHierarchy, replyId, true);
  
          return updatedHierarchy;
        });
      }
      
    });
  }

  // Recursive function to map reply data hierarchy
  const mapReplyDataHierarchy = (replyDataArray, parentOfChild) => {
    let name;
    if (parentOfChild) {
      let parentUser = parentOfChild.userId;
      name = parentUser.firstName + " " + parentUser.lastName;
    }
    return replyDataArray.map((replyDataValue, replyIndex) => {
      return (
        <div key={replyDataValue._id}>
          <SmallComment
            replyDataValue={replyDataValue}
            replyIndex={replyIndex}
            step3={true}
            parentUserName={name}
            submitEditReplyToReply={submitEditReplyToReply}
            handleDeleteReplyToReply={handleDeleteReplyToReply}
          />
          {replyDataValue.childReplies &&
            replyDataValue.childReplies.length > 0 && (
              <div className="child-replies">
                {/* This is beacuse we have to get parent username to use @.. in child to taget */}
                {mapReplyDataHierarchy(
                  replyDataValue.childReplies,
                  replyDataValue
                )}
              </div>
            )}
        </div>
      );
    });
  };

  // In your component's rendering code
  return (
    <div>
      {parentData._id == replyToReplyData[0]?.replyId &&
        mapReplyDataHierarchy(replyToReplyData, parentData)}
    </div>
  );
};
export default forwardRef(Step3Replies);

import React from 'react'

export default function CommentInputs() {
  return (
    <div>
    {/*...........................Comment Reply................................................  */}
    {data._id == replyData[0]?.commentId && (toggleShowReplyId==data._id)&&
                  replyData.map((data, i) => {
                    console.log
                    return (
                      <div
                        key={i}
                        className="pl-4 d-flex justify-content-between commentHeader mt-4 commentReplyMain"
                      >
                        <div className="d-flex ">
                          <img
                            style={{ width: "40px", height: "40px" }}
                            className="comment-user-img mr-3 img-fluid rounded-circle"
                            src={user?.photo || defImg}
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
                          commentsReply={true}
                        />
                      </div>
                    );
                  })}
      
    </div>
  )
}

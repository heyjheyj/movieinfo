import React from "react";
import { useEffect, useState } from "react";
import styles from "./replyComment.module.css";
import SingleComment from "./singleComment";

const ReplyComment = ({
  comments,
  postId,
  parentCommentId,
  refreshFunction
}) => {
  const [commentCounts, setCommentCounts] = useState();
  const [openReply, setOpenReply] = useState(false);

  //   console.log("comments:", comments);
  //   console.log(comments[7].responseTo);

  useEffect(
    () => {
      let commentReplyCount = 0;
      comments.map(comment => {
        if (comment.responseTo === parentCommentId) {
          commentReplyCount++;
          setCommentCounts(commentReplyCount);
        }
      });
    },
    [comments]
  );

  const renderReplyComment = parentCommentId => {
    return comments.map(
      (comment, index) =>
        comment.responseTo
          ? comment.responseTo === parentCommentId &&
            <div className={styles.replysection} key={Date.now()}>
              <SingleComment
                refreshFunction={refreshFunction}
                comment={comment}
                key={index}
                postId={postId}
              />
              <ReplyComment
                refreshFunction={refreshFunction}
                parentCommentId={comment._id}
                comments={comments}
                postId={postId}
              />
            </div>
          : ""
    );
  };

  const onHandleChange = () => {
    console.log("open Reply", openReply);
    setOpenReply(!openReply);
  };

  return (
    <div>
      {commentCounts > 0 &&
        <p className={styles.replycount} onClick={onHandleChange}>
          View {commentCounts} more comment(s)
        </p>}
      {openReply && renderReplyComment(parentCommentId)}
    </div>
  );
};

export default ReplyComment;

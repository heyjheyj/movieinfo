import React, { Fragment, useState } from "react";
import styles from "./comment.module.css";
import Axios from 'axios';

import { useSelector } from 'react-redux';

import SingleComment from './singleComment';
import ReplyComment from './replyComment';
import { useNavigate } from 'react-router-dom'

const Comment = ({ movie, comments, refreshFunction }) => {
  console.log(comments)

  const [ commentvalue, setCommentvalue ] = useState("")
  const user = useSelector(state => state.user.userData)
  console.log(user)

  let postId = movie.id

  const navigate = useNavigate()

  const onHandleClick = (e) => {
    setCommentvalue(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(!user) {
      navigate('/')
    }
    const variables = {
      writer: user._id,
      postId,
      content: commentvalue,
    }

    Axios.post('/api/comment/saveComment', variables).then((res) => {
      if (res.data.success) {
        refreshFunction(res.data.success);
        console.log(res.data)
      } else {
        alert('코멘트를 저장하지 못했습니다.')
      }
    })
    setCommentvalue("");
  }

  return (
    <>
      <p className={styles.commentsTitle}>Comments</p>
      <hr />

      {/*  Comment Lists */}
      {comments && comments.map((comment, index) => (
        (!comment.responseTo ?
        <Fragment key={index}>
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
        </Fragment> : "")))}

      {/* Root Comment Form */}
      <form className={styles.commentform} onSubmit={onSubmit}>
        <textarea
          className={styles.commentInput}
          onChange={onHandleClick}
          value={commentvalue}
          placeholder="영화에 대한 의견을 남겨주세요."
        />
        <br />
        <button className={styles.commentBtn} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Comment;

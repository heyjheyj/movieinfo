import React, { useState } from 'react';
import styles from './singleComment.module.css';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import Likedislike from '../LikeDislike/likedislike';
import { useNavigate } from 'react-router-dom';


const SingleComment = ({ postId, comment, refreshFunction }) => {
    const [ reply, setReply ] = useState(false);
    const [ value, setValue ] = useState("")
    const user = useSelector(state => state.user.userData)

    console.log(comment)

    const navigate = useNavigate()

    const onClickReplyOpen = () => {
        setReply(!reply);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(!user) {
          navigate('/')
        }
        const variables = {
          writer: user._id,
          postId: postId,
          content: value,
          responseTo: comment._id
        }
    
        Axios.post('/api/comment/saveComment', variables).then((res) => {
          if (res.data.success) {
            console.log(res.data)
            refreshFunction(res.data.comments)
            setReply(false);
          } else {
            alert('코멘트를 저장하지 못했습니다.')
          }
        })
        setValue("");
    }

    const onHandleChange = (e) => {
        setValue(e.currentTarget.value)
    }

    const onDeleteComment = () => {
      if(!user) {
        navigate('/')
      }
      const variables = {
        writer: user._id,
        postId: postId,
        responseTo: comment._id
      }

      Axios.post('/api/comment/deleteComment', variables).then(res => {
        if (res.data.success) {
          console.log(res.data.success)
        } else {
          console.log('코멘트를 지우지 못했습니다.')
        }
      })
    }

    const actions = [
        <Likedislike 
          comment 
          commentId={comment._id} 
          userId={localStorage.getItem('userId')} 
        />,
        <span 
          onClick={onClickReplyOpen} 
          key="commentReplyTo"
        >
          Reply to
        </span>
    ]

    return (<>
    <section className={styles.commentSection}>
      <span className={styles.writer}>{comment.writer.name}</span>
      <div className={styles.commentContent}>
        <div className={styles.commentDelete}>
          <span>{comment.content}</span>
          <button onClick={onDeleteComment}>Delete</button>
        </div>
        <div className={styles.likedislikeReply}>
          <Likedislike 
            comment 
            commentId={comment._id} 
            userId={localStorage.getItem('userId')} 
          />
        <span 
          className={styles.replyTo}
          onClick={onClickReplyOpen} 
          key="commentReplyTo"
        >
          Reply to
        </span>
        {reply && 
          <form 
            className={styles.commentform} 
            onSubmit={onSubmit} >
            <textarea
              className={styles.commentInput}
              onChange={onHandleChange}
              value={value}
              placeholder="영화에 대한 의견을 남겨주세요."
            />
            <br />
            <button className={styles.commentBtn} onClick={onSubmit} >
              Submit
            </button>
          </form>
        }
        </div>
      </div>
    </section>
    </>)
};

export default SingleComment;
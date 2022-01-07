import React, { useEffect, useState } from "react";
import {
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  DislikeOutlined
} from "@ant-design/icons";
import Axios from "axios";
import styles from "./likedislike.module.css";

const Likedislike = props => {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};

  if (props.movie) {
    variable = { movieId: props.movieId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then(response => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setLikes(response.data.likes.length);

        //if I already click this like button or not
        response.data.likes.map(like => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    Axios.post("/api/like/getDislikes", variable).then(response => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setDislikes(response.data.dislikes.length);

        //if I already click this like button or not
        response.data.dislikes.map(like => {
          if (like.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);

  const onLike = () => {
    console.log("like:", variable);
    if (LikeAction === null) {
      Axios.post("/api/like/uplike", variable).then(response => {
        console.log(response.data);
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("Liked");

          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("like를 추가하지 못했어요");
        }
      });
    } else {
      Axios.post("/api/like/unlike", variable).then(response => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Like를 빼지 못했어요");
        }
      });
    }
  };

  const onDisLike = () => {
    console.log("dislike:", variable);
    if (DislikeAction === null) {
      Axios.post("/api/like/upDisLike", variable).then(response => {
        console.log(response.data);
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("Disliked");

          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("dislike를 추가하지 못했어요");
        }
      });
    } else {
      Axios.post("/api/like/unDisLike", variable).then(response => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("Dislike를 빼지 못했어요");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like" className={styles.liked}>
        {LikeAction === "liked"
          ? <LikeFilled title="좋아요" onClick={onLike} />
          : <LikeOutlined title="좋아요" onClick={onLike} />}
        <span style={{ paddingLeft: "5px", cursor: "auto" }}>
          {Likes}
        </span>
      </span>
      <span key="comment-basic-dislike" className={styles.disliked}>
        {DislikeAction === "disliked"
          ? <DislikeFilled title="싫어요" onClick={onDisLike} />
          : <DislikeOutlined title="싫어요" onClick={onDisLike} />}
        <span style={{ paddingLeft: "5px", cursor: "auto" }}>
          {Dislikes}
        </span>
      </span>
    </React.Fragment>
  );
};

export default Likedislike;

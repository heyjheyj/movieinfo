import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";

const FavoriteBtn = props => {
  const { movieInfo, movieId, userfrom } = props;
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  let variables = {
    userfrom: userfrom,
    movieId: movieId,
    movieTitle: movieInfo.original_title,
    moviePost: movieInfo.backdrop_path,
    movieRunTime: movieInfo.runtime
  };

  const onClickFavorite = () => {
    if (favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then(res => {
        if (res.data.success) {
          setFavoriteNumber(favoriteNumber - 1);
          setFavorited(!favorited);
        } else {
          alert("favorite list에서 지우는 것을 실패했습니다.");
        }
      });
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then(res => {
        if (res.data.success) {
          setFavoriteNumber(favoriteNumber + 1);
          setFavorited(!favorited);
        } else {
          alert("favorite list에서 넣는 것을 실패했습니다.");
        }
      });
    }
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then(res => {
      setFavoriteNumber(res.data.favoriteNumber);
      if (res.data.success) {
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then(res => {
      setFavorited(res.data.favorited);
      if (res.data.success) {
      } else {
        alert("정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <button
      onClick={onClickFavorite}
      style={{
        width: "150px",
        height: "24px",
        backgroundColor: favorited ? "#219E2B" : "",
        color: favorited ? "white" : ""
      }}
    >
      {favorited ? " Not Favorite" : "Add to Favorite"} : {favoriteNumber}
    </button>
  );
};

export default FavoriteBtn;

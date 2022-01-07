import React from "react";
import { useEffect } from "react";
import styles from "./FavoritePage.module.css";
import Axios from "axios";
import { useState } from "react";
import { Popover } from "antd";
import { IMAGE_DATA_URL } from "../../../config";

const FavoritePage = props => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoriteMovie();
  }, []);

  const fetchFavoriteMovie = () => {
    Axios.post("/api/favorite/getFavoritedMovie", {
      userFrom: localStorage.getItem("userId")
    }).then(res => {
      if (res.data.success) {
        setFavorites(res.data.favorites);
      } else {
        alert("영화 정보를 가져오는데 실패했습니다.");
      }
    });
  };

  const onClickDelete = (movieId, userfrom) => {
    const variables = {
      movieId,
      userfrom
    };

    Axios.post("/api/favorite/removeFromFavorite", variables).then(res => {
      console.log(res.data.success);
      if (res.data.success) {
        fetchFavoriteMovie();
      } else {
        alert("리스트에서 지우는 것을 실패했습니다.");
      }
    });
  };

  const renderCards = favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost
          ? <img
              className={styles.movieImages}
              src={`${IMAGE_DATA_URL}w500${favorite.moviePost}`}
            />
          : " no image"}
      </div>
    );

    return (
      <tr key={index}>
        <td>
          {content}
        </td>
        <td>
          {favorite.movieTitle}
        </td>
        <td>
          {favorite.movieRunTime} mins
        </td>
        <td>
          <button
            style={{ width: "80px", height: "25px" }}
            onClick={() => onClickDelete(favorite.movieId, favorite.userfrom)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className={styles.favorite}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Image</th>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Movie from favorite</th>
          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>
      </table>
    </div>
  );
};

export default FavoritePage;

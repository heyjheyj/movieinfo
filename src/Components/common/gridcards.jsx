import React from "react";
import styles from "./gridcard.module.css";

const GridCards = props => {
  if (props.landingpage) {
    return (
      <div className={styles.card} title={`${props.movieName}`}>
        <a href={`/movie/${props.movieId}`}>
          <img
            className={styles.img}
            src={`${props.image}`}
            alt={`${props.movieName}`}
          />
        </a>
      </div>
    );
  } else {
    return (
      <div className={styles.card} title={`${props.actorName}`}>
        <img
          className={styles.img}
          src={`${props.image}`}
          alt={`${props.actorName}`}
        />
      </div>
    );
  }
};

export default GridCards;

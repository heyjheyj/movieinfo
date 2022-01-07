import React from "react";
import styles from "./MainImage.module.css";

const MainImage = ({ image, title, overview }) => {
  const imageUrl = image;
  // console.log(imageUrl);

  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "500px",
        backgroundSize: "cover",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative"
      }}
    >
      <section className={styles.mainimage}>
        <h2 className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>
          {overview}
        </p>
      </section>
    </div>
  );
};

export default MainImage;

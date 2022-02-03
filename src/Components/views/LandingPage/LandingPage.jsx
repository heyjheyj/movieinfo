import React, { useState, useEffect } from "react";
import styles from "./LandingPage.module.css";
import { API_KEY, API_URL, IMAGE_DATA_URL } from "../../../config";

import GridCards from "../../common/gridcards";
import MainImage from "./section/MainImage";
import { useCallback } from "react";
import { useRef } from "react";

const LandingPage = props => {
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const end = useRef();

  const [currentPage, setCurrentPage] = useState(1);

  const fetchApi = useCallback(
    async page => {
      console.log(currentPage);
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
      await fetch(endpoint).then(response => response.json()).then(res => {
        const list = res.results;
        console.log(list);
        console.log(list[0]);
        setMovies([...movies, ...list]);
        setMainMovie(list[0]);
        setLoading(true);
      });
    },
    [currentPage]
  );

  useEffect(
    () => {
      fetchApi(currentPage);
    },
    [currentPage]
  );

  useEffect(
    () => {
      if (loading) {
        const observer = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) {
              loadMore();
            }
          },
          { threshold: 1 }
        );
        observer.observe(end.current);
      }
    },
    [loading]
  );

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <section className={styles.landingpage}>
      {mainMovie &&
        <MainImage
          image={`${IMAGE_DATA_URL}original${mainMovie.backdrop_path}`}
          title={mainMovie.original_title}
          overview={mainMovie.overview}
        />}
      <div className={styles.container}>
        <h2>Movies by latest</h2>
        <br />
        <section className={styles.cardSection}>
          {movies &&
            movies.map((movie, index) =>
              <GridCards
                key={index}
                landingpage
                image={
                  movie.poster_path
                    ? `${IMAGE_DATA_URL}w500${movie.poster_path}`
                    : null
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            )}
        </section>
      </div>
      <div className={styles.loading} ref={end} />
    </section>
  );
};

export default LandingPage;

import React, { useState, useEffect } from "react";
import styles from "./LandingPage.module.css";
import { API_KEY, API_URL, IMAGE_DATA_URL } from "../../../config";

import useIntersect from "./section/Loading";

import GridCards from "../../common/gridcards";
import MainImage from "./section/MainImage";
import { useCallback } from "react";

const LandingPage = props => {
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  const fetchApi = useCallback(
    async () => {
      console.log(currentPage);
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
      await fetch(endpoint).then(response => response.json()).then(res => {
        const list = res.results;
        console.log(list);
        console.log(list[0]);
        setMovies([...movies, ...list]);
        setMainMovie(list[0]);
      });
    },
    [currentPage]
  );

  useEffect(() => {
    fetchApi();
    setCurrentPage(prev => prev + 1);
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchApi();
    setCurrentPage(prev => prev + 1);
    observer.observe(entry.target);
  }, {});

  // const { currentPage, isLoading } = state;
  // if (!currentPage) return null;

  // const loadMore = () => {
  //   const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage +
  //     1}`;
  //   fetchApi(endpoint);
  // };

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
      <div className={styles.loading} ref={setRef} />
    </section>
  );
};

export default LandingPage;

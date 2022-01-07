import React, { useEffect, useState, Fragment } from "react";
import styles from "./DetailPage.module.css";
import { API_KEY, API_URL, IMAGE_DATA_URL } from "../../../config";

import { useParams } from 'react-router-dom';

import FavoriteBtn from './favoriteBtn';

import MainImage from "../LandingPage/section/MainImage";
import MovieInfo from "./movieInfo/MovieInfo";
import GridCards from "../../common/gridcards";

import Comment from '../../common/Comment/comment'
import Likedislike from '../../common/LikeDislike/likedislike'

const DetailPage = props => {
  let params = useParams()

  const [movieInfo, setMovieInfo] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);
  const [showActors, setShowActors] = useState(false);

  const [comments, setComments] = useState([]);

  console.log(params.movieId)
  let movieId = params.movieId;

  const loadCrewData = async () => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    await fetch(endpointCrew).then(res => res.json()).then(response => {
      const result = response.cast;
      setMovieCrew(result);
    });
  };

  const loadInfoData = async () => {
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    await fetch(endpointInfo).then(res => res.json()).then(response => {
      const result = response;
      setMovieInfo(result);
    });
  };

  const getAllComments = async () => {
    let url = '/api/comment/getComments';
    let data = { movieId: movieId}

    await fetch(url, { 
      method: 'POST',
      body: JSON.stringify(data),
      headers : {
        'Content-Type' : 'application/json'
      } }).then(res => res.json()).then(response => {
          console.log(response)
          const result = response.comments;
          setComments(result);
    })
  }

  const refreshFunction = (newComment) => {
    // setComments(...comments, newComment);
    setComments(comments.concat(newComment))
  }

  const actorToggle = () => {
    setShowActors(!showActors);
  };

  useEffect(() => {
    loadCrewData();
    loadInfoData();
    getAllComments()
  }, []);

  return (<>
      <MainImage 
        image={`${IMAGE_DATA_URL}original${movieInfo.backdrop_path}`}
        title={movieInfo.original_title}
        overview={movieInfo.overview}
    />

<section className={styles.contents}>
    <div className={styles.button}>
      <div className={styles.likedislike}>
        <Likedislike movie movieId={movieId} userId={localStorage.getItem('userId')}/>
      </div>
      <FavoriteBtn movieInfo={movieInfo} movieId={movieId} userfrom={localStorage.getItem('userId')}/>
    </div>
        <MovieInfo movie={movieInfo} />
        <div className={styles.comment}>
          <Comment refreshFunction={refreshFunction} comments={comments} movie={movieInfo} />
        </div>
    </section>

    <br />

    <section className={styles.actors}>
        <button className={styles.showActorsBtn} onClick={actorToggle}>Toggle Actor view</button>
    </section>

    <section className={styles.cardSection}>
    {showActors && 
          movieCrew &&
            movieCrew.map((actor, index) =>
                <GridCards
                  key={index}
                  image={
                    actor.profile_path
                      ? `${IMAGE_DATA_URL}w500${actor.profile_path}`
                      : null
                  }
                  actorName={actor.name}
                />
            )}
    </section>
    </>)
};

export default DetailPage;


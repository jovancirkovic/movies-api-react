import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/action/index";
import { useParams } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Loader from "./Loader";
import styles from "./Single.module.css";
import { FcCalendar } from "react-icons/fc";
import { AiFillStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { BsHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";

const SingleMovie = () => {
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addToFav = (item) => {
    dispatch(addItem(item));
  };

  const { id } = useParams();

  const singleMovie = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US`
      );

      const responseCast = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US`
      );

      const responseVideo = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US`
      );

      if (!response.ok || !responseCast.ok || !responseVideo.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const dataCast = await responseCast.json();
      const dataVideo = await responseVideo.json();
      setMovie(data);
      setCast(dataCast.cast);
      setVideo(dataVideo.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleMovie();
  }, []);

  return (
    <>
      <ScrollToTop />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={styles.background}
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              opacity: "0.4",
              marginTop: "-70px",
              backgroundAttachment: "fixed",
            }}
          ></div>

          <motion.div
            className={styles.container}
            initial={{ x: "-100vh" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            exit={{ x: "100vw", transition: { ease: "easeInOut" } }}
          >
            <div className={styles.image}>
              <img
                src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                alt=""
              />
            </div>
            <div className={styles.info}>
              <h1>
                {movie.title}
                <button
                  className={styles.button}
                  onClick={() => addToFav(movie)}
                >
                  <BsHeartFill
                    style={{
                      color: "red",
                      fontSize: "1rem",
                    }}
                  />
                  Add to Favorites
                </button>
              </h1>

              <p>
                Release Date: <br />
                <FcCalendar style={{ fontSize: "1.4rem" }} />
                <strong>{movie.release_date}</strong>
              </p>
              <p>
                Genre: <br />
                <MdOutlinePrivacyTip style={{ fontSize: "1.4rem" }} />
                <strong>
                  {movie.genres &&
                    movie.genres.map((g) => (
                      <span key={g.name}>{g.name} </span>
                    ))}
                </strong>
              </p>
              <p>
                Runtime: <br /> <BiTimeFive style={{ fontSize: "1.4rem" }} />
                <strong>{movie.runtime}</strong> min
              </p>
              <p>
                IMDB Rating: <br />
                <AiFillStar style={{ color: "yellow", fontSize: "1.4rem" }} />
                <strong>{movie.vote_average}/10</strong>
              </p>
              <p>
                Homepage: <br /> <CgWebsite style={{ fontSize: "1.4rem" }} />
                <a href={movie.homepage} target="_blank" rel="noreferrer">
                  Official Homepage
                </a>
              </p>
              <p>{movie.overview}</p>
              <div>
                Cast: <br />
                <div className={styles.cast}>
                  {cast.slice(0, 5).map((c) => {
                    return (
                      <div key={c.profile_path} className={styles.profile}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/original/" +
                            c.profile_path
                          }
                          alt=""
                          width="70px"
                        />
                        <p style={{ fontSize: "0.9rem" }}>{c.original_name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <p>Official Trailer:</p>
                {video.slice(0, 1).map((v) => {
                  return (
                    <iframe
                      key={v.id}
                      width="400"
                      height="260"
                      src={`https://www.youtube.com/embed/${v.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default SingleMovie;

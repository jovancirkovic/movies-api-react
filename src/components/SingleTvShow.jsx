import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/action/index";
import { motion } from "framer-motion";
import Loader from "./Loader";
import styles from "./Single.module.css";
import { FcCalendar } from "react-icons/fc";
import { AiFillStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { BsHeartFill } from "react-icons/bs";

const SingleTvShow = () => {
  const [tvShow, setTvShow] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const addToFav = (item) => {
    dispatch(addItem(item));
  };

  const singleTvShow = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US`
      );

      const responseCast = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US`
      );

      const responseVideo = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US`
      );

      if (!response.ok || !responseCast.ok || !responseVideo.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const dataCast = await responseCast.json();
      const dataVideo = await responseVideo.json();
      setTvShow(data);
      setCast(dataCast.cast);
      setVideo(dataVideo.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleTvShow();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={styles.background}
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${tvShow.backdrop_path}')`,
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
                src={
                  "https://image.tmdb.org/t/p/original/" + tvShow.poster_path
                }
                alt=""
              />
            </div>
            <div className={styles.info}>
              <h1>
                {tvShow.name}
                <button
                  className={styles.button}
                  onClick={() => addToFav(tvShow)}
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
                <strong>{tvShow.first_air_date}</strong>
              </p>
              <p>
                Genre: <br />
                <MdOutlinePrivacyTip style={{ fontSize: "1.4rem" }} />
                <strong>
                  {tvShow.genres &&
                    tvShow.genres.map((g) => (
                      <span key={g.name}>{g.name} </span>
                    ))}
                </strong>
              </p>
              <p>
                Episode Run Time: <br />
                <BiTimeFive style={{ fontSize: "1.4rem" }} />
                <strong>
                  {tvShow.episode_run_time && tvShow.episode_run_time[0]}
                </strong>
                min
              </p>
              <p>
                IMDB Rating: <br />
                <AiFillStar style={{ color: "yellow", fontSize: "1.4rem" }} />
                <strong>{tvShow.vote_average}/10</strong>
              </p>
              <p>
                Homepage: <br /> <CgWebsite style={{ fontSize: "1.4rem" }} />
                <a href={tvShow.homepage} target="_blank" rel="noreferrer">
                  Official Homepage
                </a>
              </p>
              <p>{tvShow.overview}</p>
              <div>
                Cast: <br />
                <div className={styles.cast}>
                  {cast.slice(0, 5).map((c) => {
                    return (
                      <div key={c.profile_path} className={styles.profile}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/w500/" + c.profile_path
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

export default SingleTvShow;

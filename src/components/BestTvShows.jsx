import React, { useState, useEffect } from "react";
import styles from "./BestMovies.module.css";
import { genres } from "../utils.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BestTvShows = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US&page=1"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setTvShows(data.results);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className={styles.container} style={{ marginTop: "6rem" }}>
        <h1>Best TV Shows</h1>
        <div className={styles.row}>
          {tvShows.slice(0, 9).map((show) => {
            return (
              <Link to={`/tvshow/${show.id}`} key={show.id}>
                <motion.div
                  className={styles.item}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  <div className={styles.image}>
                    <img
                      height="200px"
                      src={"https://image.tmdb.org/t/p/w200" + show.poster_path}
                      alt=""
                    />
                  </div>
                  <div className={styles.info}>
                    <h3>{show.name}</h3>
                    <p>
                      <span>Genre: </span>
                      {genres(
                        show.genre_ids
                          .slice(0, 2)
                          .toString()
                          .replace(",", " / ")
                      )}
                    </p>
                    <p>
                      <span>IMDB Rating:</span> {show.vote_average}
                    </p>
                    <p>
                      <span>Release Date:</span> {show.first_air_date}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BestTvShows;

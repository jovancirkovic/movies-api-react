import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import styles from "./BestMovies.module.css";
import { genres } from "../utils.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BestMovies = () => {
  const [bestMovies, setBestMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US&page=1"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setBestMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1>Best Movies</h1>
        <div className={styles.row}>
          {bestMovies.slice(0, 9).map((movie) => {
            return (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <motion.div
                  className={styles.item}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className={styles.image}>
                      <img
                        height="200px"
                        src={
                          "https://image.tmdb.org/t/p/w200" + movie.poster_path
                        }
                        alt=""
                      />
                    </div>
                  )}
                  <div className={styles.info}>
                    <h3>{movie.title}</h3>
                    <p>
                      <span>Genre: </span>
                      {genres(
                        movie.genre_ids
                          .slice(0, 2)
                          .toString()
                          .replace(",", " / ")
                      )}
                    </p>
                    <p>
                      <span>IMDB Rating:</span> {movie.vote_average}
                    </p>
                    <p>
                      <span>Release Date:</span> {movie.release_date}
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

export default BestMovies;

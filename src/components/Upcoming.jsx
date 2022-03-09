import React, { useState, useEffect } from "react";
import styles from "./BestMovies.module.css";
import { genres } from "../utils.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US&page=1"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setUpcoming(data.results);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div
        className={styles.container}
        style={{ marginTop: "6rem", marginBottom: "6rem" }}
      >
        <h1>Upcoming</h1>
        <div className={styles.row}>
          {upcoming.slice(0, 9).map((item) => {
            return (
              <Link to={`/movie/${item.id}`} key={item.id}>
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
                      src={"https://image.tmdb.org/t/p/w200" + item.poster_path}
                      alt=""
                    />
                  </div>
                  <div className={styles.info}>
                    <h3>{item.title}</h3>
                    <p>
                      <span>Genre: </span>
                      {genres(
                        item.genre_ids
                          .slice(0, 2)
                          .toString()
                          .replace(",", " / ")
                      )}
                    </p>
                    <p>
                      <span>IMDB Rating:</span> {item.vote_average}
                    </p>
                    <p>
                      <span>Release Date:</span> {item.release_date}
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

export default Upcoming;

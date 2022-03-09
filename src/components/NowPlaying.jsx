import React, { useEffect, useState } from "react";
import styles from "./NowPlaying.module.css";
import { motion } from "framer-motion";
import { GiBottomRight3DArrow } from "react-icons/gi";

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=696fe18ccb2ce253e9966337a26839c6&language=en-US"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setNowPlaying(data.results);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff", marginTop: "5.5rem" }}>
        Now Playing
      </h1>
      <motion.div className={styles.carousel} whileTap={{ cursor: "grabbing" }}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -6200 }}
          className={styles.inner}
        >
          {nowPlaying.map((item) => {
            return (
              <motion.div className={styles.item} key={item.poster_path}>
                <img
                  height="400px"
                  src={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
                  alt=""
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      <div className={styles.arrows}>
        <GiBottomRight3DArrow
          style={{ transform: "rotate(135deg)", marginRight: "1rem" }}
        />
        <GiBottomRight3DArrow style={{ transform: "rotate(-45deg)" }} />
      </div>
    </>
  );
};

export default NowPlaying;

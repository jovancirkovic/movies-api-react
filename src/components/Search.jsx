import React from "react";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import { motion } from "framer-motion";
import { genres } from "../utils.js";

const Search = (props) => {
  return (
    <div className={styles.container}>
      {props.search
        .filter((x) => x.media_type !== "person")
        .map((x) => {
          return (
            <Link
              to={`${x.media_type === "movie" ? "/movie/" : "/tvshow/"}${x.id}`}
              key={x.id}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={styles.item}
              >
                <div className={styles.image}>
                  <img
                    width="150px"
                    src={"https://image.tmdb.org/t/p/original/" + x.poster_path}
                    alt=""
                  />
                </div>
                <div className={styles.info}>
                  <h4>{x.title || x.name}</h4>
                  <strong>
                    <p>
                      {x.media_type.replace("m", "M").replace("tv", "TV Show")}
                    </p>
                  </strong>
                  <p>
                    Genre: <br />
                    {x.genre_ids &&
                      genres(
                        x.genre_ids.slice(0, 2).toString().replace(",", " / ")
                      )}
                  </p>
                  <p>
                    IMDB Rating: <br /> {x.vote_average}
                  </p>
                  <p>
                    Release Date: <br /> {x.release_date || x.first_air_date}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
    </div>
  );
};

export default Search;

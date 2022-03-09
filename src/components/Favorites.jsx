import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { delItem } from "../redux/action/index";
import styles from "./Favorites.module.css";
import { motion } from "framer-motion";

const Favorites = () => {
  const favorites = useSelector((state) => state.handleFav);
  const dispatch = useDispatch();

  const delFromFav = (item) => {
    dispatch(delItem(item));
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      exit={{ x: "-100vw", transition: { ease: "easeInOut" } }}
    >
      {favorites.map((fav) => {
        return (
          <div key={fav.poster_path} className={styles.favCont}>
            <div className={styles.favImg}>
              <img
                src={"https://image.tmdb.org/t/p/original/" + fav.poster_path}
                alt=""
                height="200px"
              />
            </div>
            <div className={styles.favInfo}>
              <h4>{fav.title || fav.name}</h4>
              <p>
                Release Date: <br /> {fav.release_date || fav.first_air_date}
              </p>
              <p>
                Rating: <br /> {fav.vote_average}
              </p>
              <button onClick={() => delFromFav(fav)} className={styles.button}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Favorites;

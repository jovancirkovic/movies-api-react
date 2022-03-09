import React from "react";
import { motion } from "framer-motion";
import styles from "./Loader.module.css";
import logo from "../images/popcorn.png";

const loaderVariants = {
  animation: {
    x: [-2, 2],
    y: [0, -3],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
      },
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      className={styles.loader}
      variants={loaderVariants}
      animate="animation"
    >
      <img src={logo} alt="logo" />
      <p>Connecting...</p>
      <p>Please Wait!</p>
    </motion.div>
  );
};

export default Loader;

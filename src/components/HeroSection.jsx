import React from "react";
import hero from "../images/hero.jpg";
import styles from "./HeroSection.module.css";
import { Parallax } from "react-parallax";

const HeroSection = () => {
  return (
    <>
      <Parallax
        bgImage={hero}
        strength={500}
        style={{ top: "-200px", zIndex: -10 }}
        bgImageStyle={{ maxWidth: "1920px", objectFit: "contain" }}
        className={styles.image}
      >
        <div style={{ height: "600px" }}>
          <div className={styles.content}>
            <h3>
              Best Movies <br /> and TV Shows
            </h3>
          </div>
        </div>
      </Parallax>
    </>
  );
};

export default HeroSection;

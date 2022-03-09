import React, { useState, useRef, useEffect } from "react";
import logo from "../images/popcorn.png";
import styles from "./Navigation.module.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsHeartFill } from "react-icons/bs";

const Navigation = (props) => {
  const state = useSelector((state) => state.handleFav);
  const [search, setSearch] = useState([]);

  const searchRef = useRef(null);

  const navigate = useNavigate();

  const searchHandler = async (search = "") => {
    if (search.length === 0) return;

    if (search.trim().length === 0 || search.trim().length <= 3) {
      return;
    }

    try {
      const response = await fetch(
        `
        https://api.themoviedb.org/3/search/multi?api_key=696fe18ccb2ce253e9966337a26839c6&query=${search}&language=en-US&page=1&include_adult=false`
      );

      if (!response.ok) {
        throw new Error("Someting went wrong!");
      }

      const data = await response.json();
      setSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  setTimeout(() => {
    searchHandler();
  }, 3000);

  useEffect(() => {
    props.onSearchHandler(search);
  }, [search]);

  const submitHandler = (e) => {
    e.preventDefault();

    navigate(`/search/${searchRef.current?.value}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <nav>
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
        >
          <Link to="/" className={styles.logo}>
            <motion.img
              src={logo}
              alt="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </Link>
          <div className={styles.search}>
            <motion.input
              ref={searchRef}
              onChange={(e) => {
                searchHandler(e.target.value);
              }}
              type="text"
              placeholder="Search"
              whileHover={{
                scale: 1.06,
                transition: { type: "spring", stiffness: 130 },
              }}
            />
          </div>
          <div>
            <Link to="/favorites" className={styles.favorites}>
              <motion.div
                initial={{ x: -30 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
              >
                <BsHeartFill
                  style={{
                    color: "red",
                    fontSize: "2.5rem",
                    paddingRight: "0.2rem",
                  }}
                />
              </motion.div>
              <div>({state.length})</div>
            </Link>
          </div>
        </motion.div>
      </nav>
    </form>
  );
};

export default Navigation;

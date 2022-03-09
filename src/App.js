import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import BestMovies from "./components/BestMovies";
import BestTvShows from "./components/BestTvShows";
import SingleMovie from "./components/SingleMovie";
import SingleTvShow from "./components/SingleTvShow";
import Favorites from "./components/Favorites";
import NowPlaying from "./components/NowPlaying";
import Search from "./components/Search";
import Upcoming from "./components/Upcoming";
import { AnimatePresence } from "framer-motion";

function App() {
  const [search, setSearch] = useState([]);
  const location = useLocation();

  const onSearchHandler = (data) => {
    setSearch(data);
  };

  return (
    <>
      <Navigation onSearchHandler={onSearchHandler} />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <NowPlaying />
                <BestMovies />
                <BestTvShows />
                <Upcoming />
              </>
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/tvshow/:id" element={<SingleTvShow />} />
          <Route path="/search/:search" element={<Search search={search} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;

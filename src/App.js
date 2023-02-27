import api from "./api/axiosConfig";
import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Review from "./components/Review/Review";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("http://localhost:8080/api/v1/movies");
      // console.log(response.data);

      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(
        `http://localhost:8080/api/v1/movies/${movieId}`
      );
      const singleMovie = response.data;
      console.log(singleMovie);
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
    } catch (error) {}
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies} />}></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
            <Route
              path="/Reviews/:movieId"
              element={
                <Review
                  getMovieData={getMovieData}
                  movie={movie}
                  reviews={reviews}
                  setReviews={setReviews}
                />
              }
            >
              {" "}
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function MovieReview() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${searchText}&api-key=IbvnMH4jtCP78bv3FS9uRvclQnqnZsA3`
      );
      setMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getReviews();
  };

  return (
    <>
      <br />
      <div className="container App">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                style={{ width: "90vw", height: "50%" }}
                className="form-control"
                placeholder="Search for the review of any movie here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search for the review of any movie here"
                aria-describedby="button-addon2"
              />
              <br />
              <div>
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
        {movies.map((movie) => {
          return (
            <div>
              <hr />
              <h1>Title: {movie.display_title} </h1>
              <p>{movie.byline} Review: {movie.summary_short}</p>
              <img
                src={
                  movie.multimedia
                    ? movie.multimedia.src
                    : "https://th.bing.com/th/id/R.d8a74c2ecb243be072d5da8ad9ea607a?rik=yV8SEcLrdmMABg&pid=ImgRaw&r=0&sres=1&sresct=1"
                }
                alt="images" height={'200px'} width={'300px'}
              />
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MovieReview;

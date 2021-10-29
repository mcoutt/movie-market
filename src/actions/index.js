const moviesLoaded = (newMovies) => {
  return {
    type: "MOVIES_LOADED",
    payload: newMovies,
  };
};

const setMovieDetails = (movie) => {
  return {
    type: "SET_MOVIE_DETAILS",
    payload: movie,
  };
};

const getMovieDetails = (movie) => {
  return {
    type: "GET_MOVIE_DETAILS",
    payload: movie,
  };
};

const delMovieDetails = (movie) => {
  return {
    type: "DEL_MOVIE_DETAILS",
    payload: movie,
  };
};

export { moviesLoaded, setMovieDetails, getMovieDetails, delMovieDetails };

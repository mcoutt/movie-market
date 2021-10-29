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

const setHeaderMovie = (edit) => {
  return {
    type: "SET_HEADER_MOVIE",
    payload: edit,
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

export {
  moviesLoaded,
  setMovieDetails,
  getMovieDetails,
  delMovieDetails,
  setHeaderMovie,
};

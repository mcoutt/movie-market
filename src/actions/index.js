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

const createMovie = (movie) => {
  return {
    type: "CREATE_MOVIE",
    payload: movie,
  };
};

const editMovie = (movie) => {
  return {
    type: "EDIT_MOVIE",
    payload: movie,
  };
};

const deleteMovie = (movieId) => {
  return {
    type: "DEL_MOVIE",
    payload: movieId,
  };
};

export {
  moviesLoaded,
  setMovieDetails,
  getMovieDetails,
  createMovie,
  editMovie,
  deleteMovie,
  setHeaderMovie,
};

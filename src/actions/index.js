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

const setHeaderMovie = (itemHeader) => {
  return {
    type: "SET_HEADER_MOVIE",
    payload: itemHeader,
  };
};

const getMovieDetails = (movie) => {
  return {
    type: "GET_MOVIE_DETAILS",
    payload: movie,
  };
};

const createMovie = (newMovie) => {
  return {
    type: "CREATE_MOVIE",
    payload: newMovie,
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

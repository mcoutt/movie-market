const moviesLoaded = async (movies) => {
  return {
    type: "GET_MOVIES",
    payload: movies,
  };
};

const setMovieDetails = (movie) => {
  return {
    type: "SET_MOVIE_DETAILS",
    payload: movie,
  };
};

const setHeaderMovie = (headerMovie) => {
  return {
    type: "SET_HEADER_MOVIE",
    payload: headerMovie,
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

const searchMovie = (searchQuery) => {
  return {
    type: "SEARCH_MOVIE",
    payload: searchQuery,
  };
};

const filterMovie = (filterQuery) => {
  return {
    type: "FILTER_MOVIE",
    payload: filterQuery,
  };
};

const sortMovie = (sortQuery) => {
  return {
    type: "SORT_MOVIE",
    payload: sortQuery,
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
  searchMovie,
  filterMovie,
  sortMovie,
};

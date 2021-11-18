const initialState = {
  movies: [],
  header: "",
  movie: {},
  newMovie: {},
  updatedMovie: {},
  delMovie: {},
  searchQuery: undefined,
  filterQuery: undefined,
  sortQuery: "",
};

export const movies = (state = initialState, action) => {
  switch (action.type) {
    case "MOVIES_LOADED":
      return {
        ...state,
        movies: action.payload,
      };
    case "SET_MOVIE_DETAILS":
      return {
        ...state,
        movie: action.payload,
      };
    case "SET_HEADER_MOVIE":
      return {
        ...state,
        header: action.payload,
      };
    case "GET_MOVIE_DETAILS":
      return {
        ...state,
        movie: action.payload,
      };
    case "CREATE_MOVIE":
      return {
        ...state,
        newMovie: action.payload,
      };
    case "EDIT_MOVIE":
      return {
        ...state,
        updatedMovie: action.payload,
      };
    case "DEL_MOVIE":
      return {
        ...state,
        delMovie: action.payload,
      };
    case "SEARCH_MOVIE":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "FILTER_MOVIE":
      return {
        ...state,
        filterQuery: action.payload,
      };
    case "SORT_MOVIE":
      return {
        ...state,
        sortQuery: action.payload,
      };
    default:
      return state;
  }
};

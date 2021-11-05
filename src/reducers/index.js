const initialState = {
  movies: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVIES_LOADED":
      return {
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
      };
    case "CREATE_MOVIE":
      return {
        ...state,
        newMovie: action.payload,
      };
    case "EDIT_MOVIE":
      return {
        ...state,
        movie: action.payload,
      };
    case "DEL_MOVIE":
      return {
        ...state,
        delMovie: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

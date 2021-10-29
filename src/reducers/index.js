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
    case "GET_MOVIE_DETAILS":
      return {
        ...state,
      };
    case "DEL_MOVIE_DETAILS":
      return {
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

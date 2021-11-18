import { createStore } from "redux";

import { movies } from "./reducers";

const store = createStore(
  movies,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

// import { createStore } from "redux";

import { moviesStore } from "./reducers";

// const store = createStore(
//   movies,
//   typeof window !== "undefined"
//     ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     : null
// );
//
// export default store;

import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
// import count from "./count/reducer";
// import tick from "./tick/reducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  moviesStore,
});

const reducer = (state, action) => {
  console.log("=========== reducer ==========");
  console.log(state);
  console.log("=========== action ==========");
  console.log(typeof action);
  console.log(action.type);
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    console.log("=========== state ==========");
    console.log(state);
    // if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
};

export const wrapper = createWrapper(initStore);

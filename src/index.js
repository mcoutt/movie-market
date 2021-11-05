import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundry from "./components/error-boundaries";
import store from "./store";
import MoviestoreService from "./services";
import { MoviestoreServiceProvider } from "./components/moviestore-service-context";

const moviestoreService = new MoviestoreService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <MoviestoreServiceProvider value={moviestoreService}>
        <App />
      </MoviestoreServiceProvider>
    </ErrorBoundry>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

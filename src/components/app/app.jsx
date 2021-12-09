import React from "react";
import { HomePage, Page404 } from "../pages";
import MovieItemDetails from "../movie-item-details/movie-item-details";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// import classes from "./app.module.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/film/:id" component={MovieItemDetails} />
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/search" />;
          }}
        />
        <Route path="/search/:searchQuery" component={HomePage} />
        <Route path="/search" component={HomePage} />
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;

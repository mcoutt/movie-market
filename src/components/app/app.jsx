import React from "react";
import { HomePage, Page404 } from "../pages";
import MovieItemDetails from "../movie-item-details/movie-item-details";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import "./app.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/film/:id" element={<MovieItemDetails />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;

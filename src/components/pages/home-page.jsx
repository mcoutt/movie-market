import React, { Fragment } from "react";
import HeaderItem from "../header";
import MovieList from "../movie-list/movie-list";
import GenreFilter from "../genreFilter/genre-filter";
import { FooterItem } from "../footer";

import "./pages.scss";

export const HomePage = () => {
  return (
    <Fragment>
      <header>
        <HeaderItem />
      </header>
      <main>
        <GenreFilter />
        <MovieList />
      </main>
      <footer>
        <FooterItem />
      </footer>
    </Fragment>
  );
};

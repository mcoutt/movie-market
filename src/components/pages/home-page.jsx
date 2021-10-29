import React from "react";
import HeaderItem from "../header";
import MovieList from "../movie-list/movie-list";
import { FooterItem } from "../footer";

import "./home-page.scss";

export const HomePage = () => {
  return (
    <main>
      <HeaderItem />
      <MovieList />
      <FooterItem />
    </main>
  );
};

import React from "react";
import { ItemAdd } from "../item-add";
import MovieItem from "../movie-item";
import "./header.scss";

export function HeaderItem(movieItem) {
  console.log("--------------");
  let result;
  if (!movieItem) {
    result = (
      <header className="logo logo-image">
        <ItemAdd />
        <form>
          <label>
            <input type="text" name="search" className="search"></input>
          </label>
          <button type="submit" className="search-button">
            SEARCH
          </button>
        </form>
      </header>
    );
  } else {
    result = <MovieItem item={movieItem} />;
  }
  return result;
}

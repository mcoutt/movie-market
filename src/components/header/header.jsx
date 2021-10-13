import React from "react";
import { ItemAdd } from "../item-add";
import "./header.scss";

export function HeaderItem() {
  return (
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
}

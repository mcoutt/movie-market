import React from "react";
import "./search-item.scss";

export const SearchItem = () => {
  return (
    <div>
      <form>
        <input
          type="text"
          className="searchInput"
          placeholder="What do you want to watch?"
          aria-label="Recipient's username with two button addons"
        />
        <input className="searchButton" type="button" value="SEARCH" />
      </form>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { moviesLoaded, searchMovie } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";

import "./search-item.scss";

const SearchItem = (props) => {
  const { moviestoreService, searchQuery, searchMovie } = props;

  const [searchRequest, setSearchRequest] = useState("");

  const handleInput = (e) => {
    setSearchRequest(e.target.value);
  };

  const handleSubmit = () => {
    console.log(`----- handle submit: ${searchRequest}`);
    searchMovie(searchRequest);
  };

  useEffect(async () => {
    const data = await moviestoreService.getMovies({ searchQuery });
    props.moviesLoaded(data);
  }, [searchQuery]);

  console.log(`searchRequest: ${searchRequest}`);

  return (
    <div className="search-form">
      <h2 className="search-form-title">Find your movie</h2>
      <input
        type="text"
        className="searchInput"
        placeholder="What do you want to watch?"
        aria-label="Recipient's username with two button addons"
        onChange={handleInput}
      />
      <button className="searchButton" onClick={handleSubmit} type="submit">
        SEARCH
      </button>
    </div>
  );
};

const mapStateToProps = ({ searchQuery, searchMovie }) => {
  return {
    searchQuery,
    searchMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      moviesLoaded,
      searchMovie,
    },
    dispatch
  );
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(SearchItem);

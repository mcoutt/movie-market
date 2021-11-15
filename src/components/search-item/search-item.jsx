import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { moviesLoaded, searchMovie } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import "./search-item.scss";

const SearchItem = (props) => {
  const { moviestoreService, searchQuery, searchMovie } = props;

  const [searchRequest, setSearchRequest] = useState("");

  const handleInput = (e) => {
    setSearchRequest(e.target.value);
  };

  const handleSubmit = () => {
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
        <Link
          to={{
            pathname: "",
            search: `?searchQuery=${searchRequest}`,
          }}
        >
          SEARCH
        </Link>
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

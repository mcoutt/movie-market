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

  useEffect(async () => {
    if (searchQuery) {
      const data = await moviestoreService.getMovies({ searchQuery });
      props.moviesLoaded(data);
    }
  }, [searchQuery]);

  const handleInput = (e) => {
    setSearchRequest(e.target.value);
  };

  const handleSubmit = () => {
    console.log(`----- handle submit: ${searchRequest}`);
    searchMovie(searchRequest);
  };
  console.log(`searchRequest: ${searchRequest}`);

  return (
    <div className="search-form">
      <h2 className="search-form-title">Find your movie</h2>
      <form>
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
      </form>
    </div>
  );
};

const mapStateToProps = (props) => {
  return props;
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

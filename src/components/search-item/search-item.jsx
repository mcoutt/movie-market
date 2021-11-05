import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { moviesLoaded } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";

import "./search-item.scss";

const SearchItem = (props) => {
  const { moviestoreService } = props;

  const [search, setSearch] = useState("");
  const [searchRequest, setSearchRequest] = useState("");

  useEffect(async () => {
    const data = await moviestoreService.getMovies({ search });
    await props.moviesLoaded(data);
  }, [search, searchRequest]);

  const handleInput = async (e) => {
    await setSearch(e.target.value);
  };

  const handleSubmit = async (props) => {
    props.preventDefault();
    await setSearchRequest(search);
  };

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

const mapStateToProps = ({ movies }) => {
  return {
    movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      moviesLoaded,
    },
    dispatch
  );
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(SearchItem);

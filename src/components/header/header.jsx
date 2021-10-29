import React, { useState } from "react";
import Logo from "../logo";
import MovieItem from "../movie-item";
import { SearchItem } from "../search-item";
import { bindActionCreators } from "redux";
import { getMovieDetails } from "../../actions";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";

// import "./header.scss";

const HeaderItem = ({ movie }) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchLogo = (search) => {
    setShowSearch(search);
  };
  return (
    <div>
      <Logo showSearch={showSearch} handleSearchLogo={handleSearchLogo} />
      {movie ? (
        <div>
          <MovieItem item={movie} />
        </div>
      ) : (
        <SearchItem />
      )}
    </div>
  );
};

const mapStateToProps = ({ movie }) => {
  return {
    movie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMovieDetails }, dispatch);
};

export default withMoviestoreService()(
  connect(mapStateToProps, mapDispatchToProps)(HeaderItem)
);

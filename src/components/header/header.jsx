import React, { useState } from "react";
import Logo from "../logo";
import SearchItem from "../search-item";
import { bindActionCreators } from "redux";
import { getMovieDetails } from "../../actions";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import MovieItemDetails from "../movie-item-details/movie-item-details";

// import "./header.scss";

const HeaderItem = ({ movie, header }) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchLogo = (search) => {
    setShowSearch(search);
  };
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <Logo showSearch={showSearch} handleSearchLogo={handleSearchLogo} />
          {header ? (
            <div>
              <MovieItemDetails item={movie} />
            </div>
          ) : (
            <SearchItem />
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ movie, header }) => {
  return {
    movie,
    header,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMovieDetails }, dispatch);
};

export default withMoviestoreService()(
  connect(mapStateToProps, mapDispatchToProps)(HeaderItem)
);

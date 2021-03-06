import React, { useEffect, useState } from "react";
import Popup from "../popup-movie";

import "./logo.scss";
import { bindActionCreators } from "redux";
import { setHeaderMovie, setMovieDetails } from "../../actions";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";

const Logo = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const { movie, showSearch } = props;

  useEffect(() => {}, [showPopup]);
  const handleOpen = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    console.log("######## close");
    setShowPopup(false);
  };

  const handleSearch = () => {
    props.setHeaderMovie(false);
  };

  let renderButton;
  if (movie && !showSearch) {
    renderButton = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="36px"
        viewBox="0 0 24 24"
        width="36px"
        fill="#F65261"
        onClick={handleSearch}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    );
  } else {
    renderButton = (
      <button type="button" className="header-button" onClick={handleOpen}>
        + ADD MOVIE
      </button>
    );
  }

  return (
    <div>
      <div>
        <span className="firstLogo">netflix</span>
        <span className="secondLogo">roulette</span>
        {renderButton}
      </div>
      {showPopup ? (
        <Popup item="" action="add" closePopup={handleClose} />
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ movie, movies }) => {
  return {
    movie,
    movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setMovieDetails, setHeaderMovie }, dispatch);
};

export default withMoviestoreService()(
  connect(mapStateToProps, mapDispatchToProps)(Logo)
);

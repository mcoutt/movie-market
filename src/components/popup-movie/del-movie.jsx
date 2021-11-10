import React, { useEffect, useState } from "react";
import "./popup-movie.scss";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteMovie, setMovieDetails } from "../../actions";
import CloseButton from "./close-button";

const DelPopup = (props) => {
  const { action, closePopup, item, newMovie, moviestoreService } = props;

  useEffect(async () => {}, [action]);

  const handleSubmit = async (event) => {
    props.deleteMovie(item.id);
    event.preventDefault();
    await moviestoreService.deleteMovie(item.id);
    closePopup();
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <CloseButton closePopup={closePopup} />
        <form>
          <div className="deleteItem">
            <div>
              <label className="headerTitle">DELETE MOVIE</label>
            </div>
            <div>
              <label className="titles">
                <p>Are you sure you want to delete this movie?</p>
              </label>
            </div>
            <div>
              <button
                className="submitButton deleteTitle"
                onClick={handleSubmit}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ movies, movie, newMovie, delMovie }) => {
  return {
    movies,
    movie,
    delMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteMovie, setMovieDetails }, dispatch);
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(DelPopup);

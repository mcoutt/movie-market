import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import Popup from "../popup-movie";

import "./movie-item.scss";
import "../popup-movie/popup-movie.scss";
import { bindActionCreators } from "redux";
import { setMovieDetails, setHeaderMovie, deleteMovie } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";

const MovieItem = (props) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDelPopup, setShowDelPopup] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);

  const { item } = props;

  useEffect(async () => {
    if (isEdit) {
      const { moviestoreService } = props;
      const data = await moviestoreService.getMovie(item.id);

      props.setMovieDetails(data);
    }
  }, [isEdit]);

  const handleEditOpen = () => {
    setIsEdit(true);
    setShowEditPopup(true);
    props.setMovieDetails(item);
  };

  const handleEditClose = () => {
    setShowEditPopup(false);
  };

  const handleDelOpen = (e) => {
    setShowDelPopup(true);
    props.setMovieDetails(item);
  };

  const handleDelClose = () => {
    setShowDelPopup(false);
  };

  const handleShowDetail = () => {
    props.setHeaderMovie(true);
    props.setMovieDetails(item);
  };

  // const kebab = document.querySelector('.kebab'),
  //   middle = document.querySelector('.middle'),
  //   cross = document.querySelector('.cross'),
  //   dropdown = document.querySelector('.dropdown');
  //
  // kebab.addEventListener('click', function () {
  //   middle.classList.toggle('active');
  //   cross.classList.toggle('active');
  //   dropdown.classList.toggle('active');
  // });

  return (
    <div className="item-box">
      <img src={item.poster_path} onClick={handleShowDetail} alt={item.title} />
      <div className="card-box">
        {item.title}
        Release date: {item.release_date}
      </div>
      <div>{item.genres.join(", ")}</div>
      <button type="button" className="btn" onClick={handleEditOpen}>
        EDIT MOVIE
      </button>
      <button type="button" className="btn" onClick={handleDelOpen}>
        DEL MOVIE
      </button>
      {showEditPopup ? (
        <Popup item={props.movie} action="edit" closePopup={handleEditClose} />
      ) : undefined}
      {showDelPopup ? (
        <Popup item={props.movie} action="del" closePopup={handleDelClose} />
      ) : undefined}
    </div>
  );
};

MovieItem.propTypes = {
  item: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    poster_path: propTypes.string,
    release_date: propTypes.string,
    genres: propTypes.array,
  }),
};

const mapStateToProps = ({ movies, movie }) => {
  return {
    movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setMovieDetails,
      setHeaderMovie,
      deleteMovie,
    },
    dispatch
  );
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieItem);

import React, { useEffect } from "react";
import propTypes from "prop-types";

import "./movie-item.scss";
import "../popup-movie/popup-movie.scss";
import { bindActionCreators } from "redux";
import { setMovieDetails, setHeaderMovie, deleteMovie } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MovieItem = (props) => {
  const { item, openEditPopup, openDeletePopup } = props;

  useEffect(() => {});

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
      <img
        className="poster"
        src={item.poster_path}
        onClick={handleShowDetail}
        alt={item.title}
      />
      <div className="card-box">
        <div>
          <Link to={`/film/${item.id}`}>{item.title}</Link>
        </div>
        <div>Release date: {item.release_date}</div>
      </div>
      <div>{item.genres.join(", ")}</div>
      <button type="button" className="btn" onClick={() => openEditPopup(item)}>
        EDIT MOVIE
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => openDeletePopup(item)}
      >
        DEL MOVIE
      </button>
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

const mapStateToProps = ({ movies }) => {
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

import React, { Fragment, useEffect, useState } from "react";
import propTypes from "prop-types";
import { Popup } from "../popup-movie";

// import "./movie-item.scss";
import "../popup-movie/popup-movie.scss";
import { bindActionCreators } from "redux";
import { setMovieDetails } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import HeaderItem from "../header";

const imageUrl = (img) => `https://image.tmdb.org/t/p/w500${img}`;

const MovieItem = (props) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDelPopup, setShowDelPopup] = useState(false);
  const [middleActive, setMiddleActive] = useState(false);
  const [crossActive, setCrossActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [itemDetails, setItemDetails] = useState({});

  const { item } = props;

  const getMovie = async () => {
    const { moviestoreService } = props;
    const data = await moviestoreService.getMovie(item.id);

    setItemDetails(true);
    props.setMovieDetails(data);
  };

  useEffect(() => {}, []);

  const handleEditOpen = async () => {
    await getMovie();
    await setShowEditPopup(true);
  };

  const handleEditClose = () => {
    setShowEditPopup(false);
  };

  const handleDelOpen = () => {
    setShowDelPopup(true);
  };

  const handleDelClose = () => {
    setShowDelPopup(false);
  };

  const handleShowDetail = async () => {
    await getMovie();
  };

  // const kebab = document.querySelector('.kebab'),
  //   middle = document.querySelector('.middle'),
  //   cross = document.querySelector('.cross'),
  //   dropdown = document.querySelector('.dropdown');

  // kebab.addEventListener('click', function () {
  //   middle.classList.toggle('active');
  //   cross.classList.toggle('active');
  //   dropdown.classList.toggle('active');
  // });

  const toggleMiddleActive = () => {
    return middleActive ? setMiddleActive(false) : setMiddleActive(true);
  };

  const toggleCrossActive = () => {
    return crossActive ? setCrossActive(false) : setCrossActive(true);
  };

  const toggleDropdownActive = () => {
    return dropdownActive ? setDropdownActive(false) : setDropdownActive(true);
  };

  let showItem;
  if (item.budget) {
    showItem = (
      <div className="row">
        <div className="col-3">
          <img
            src={imageUrl(item.poster_path)}
            onClick={handleShowDetail}
            className="film"
            alt={item.title}
          />
        </div>
        <div className="col-8">
          <h5 onClick={handleEditOpen}>{item.title}</h5>
          <span onClick={() => <HeaderItem movieItem={item} />}>
            {item.overview}
          </span>
          <p>Vote average: {item.vote_average}</p>
          <p>Vote count: {item.vote_count}</p>
          <p>Release date: {item.release_date}</p>
          <p>Budget: {item.budget}</p>
          <p>Revenue: {item.revenue}</p>
          <p>Runtime: {item.runtime}</p>
          <p>Genres: {item.genres.map((item) => item.name)}</p>
        </div>
      </div>
    );
  } else {
    showItem = (
      <Fragment>
        <div className="row">
          <div className="col">
            <img
              src={imageUrl(item.poster_path)}
              onClick={handleShowDetail}
              className="film"
              alt={item.title}
            />
            <h5 onClick={handleEditOpen}>{item.title}</h5>
            <span onClick={handleEditOpen}>{item.overview}</span>
            <p>Vote average: {item.vote_average}</p>
            <p>Vote count: {item.vote_count}</p>
            <p>Release date: {item.release_date}</p>
          </div>
        </div>
        <button type="button" className="del" onClick={handleDelOpen}>
          DEL MOVIE
        </button>
        {showEditPopup ? (
          <Popup
            item={props.movie}
            action="edit"
            closePopup={handleEditClose}
          />
        ) : null}
        {showDelPopup ? (
          <Popup item={props.movie} action="del" closePopup={handleDelClose} />
        ) : null}
      </Fragment>
    );
  }
  return showItem;
};

MovieItem.propTypes = {
  item: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    overview: propTypes.string,
    poster_path: propTypes.string,
    vote_average: propTypes.number,
    vote_count: propTypes.number,
    release_date: propTypes.string,
    budget: propTypes.number,
    revenue: propTypes.number,
    runtime: propTypes.number,
    genres: propTypes.array,
  }),
};

const mapStateToProps = ({ movies, movie }) => {
  return {
    movies,
    movie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setMovieDetails,
    },
    dispatch
  );
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieItem);

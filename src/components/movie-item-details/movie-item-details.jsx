import React from "react";
import propTypes from "prop-types";
import "../popup-movie/popup-movie.scss";
import { bindActionCreators } from "redux";
import { setMovieDetails, setHeaderMovie } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";

import "./movie-item-details.scss";

const MovieItemDetails = (props) => {
  const item = props.movie;

  const getMovie = async () => {
    const { moviestoreService } = props;
    const data = await moviestoreService.getMovie(item.id);

    props.setMovieDetails(data);
  };

  const handleShowDetail = async () => {
    await getMovie();
    props.setHeaderMovie(true);
  };

  return (
    <div className="card">
      <img
        src={item.poster_path}
        onClick={handleShowDetail}
        className="card-img-top img"
        alt={item.title}
      />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.overview}</p>
        <p className="card-text">{item.genres.join(", ")}</p>
        <p className="card-text">Release date: {item.release_date}</p>
        <p className="card-text">Vote average: {item.vote_average}</p>
        <p className="card-text">Vote count: {item.vote_count}</p>
      </div>
    </div>
  );
};

MovieItemDetails.propTypes = {
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
      setHeaderMovie,
    },
    dispatch
  );
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieItemDetails);

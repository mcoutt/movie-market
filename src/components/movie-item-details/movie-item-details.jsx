import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
// import classes from "../popup-movie/popup-movie.module.scss";
import { bindActionCreators } from "redux";
import { setMovieDetails, setHeaderMovie } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import classes from "./movie-item-details.module.scss";

const MovieItemDetails = (props) => {
  const { moviestoreService } = props;
  const item = props.movie;

  const getMovie = async () => {
    const data = await moviestoreService.getMovie(item.id);

    props.setMovieDetails(data);
  };

  const handleShowDetail = async () => {
    await getMovie();
    props.setHeaderMovie(true);
  };

  return (
    <div className={classes.card}>
      {Object.keys(item).length > 0 && (
        <div>
          <img
            src={item.poster_path}
            // className="card-img-top img"
            className={classes.img}
            onClick={handleShowDetail}
            alt={item.title}
          />
          <div className={classes.cardBody}>
            <h5 className={classes.cardTitle}>
              <Link to={`/film/${item.id}`}>{item.title}</Link>
            </h5>
            <p className={classes.cardText}>{item.id}</p>
            <p className={classes.cardText}>{item.overview}</p>
            <p className={classes.cardText}>{item.genres.join(", ")}</p>
            <p className={classes.cardText}>
              Release date: {item.release_date}
            </p>
            <p className={classes.cardText}>
              Vote average: {item.vote_average}
            </p>
            <p className={classes.cardText}>Vote count: {item.vote_count}</p>
            <p className={classes.cardText}>Runtime: {item.runtime}</p>
            <p className={classes.cardText}>Revenue: {item.revenue}</p>
            <p className={classes.cardText}>Budget: {item.budget}</p>
            <p className={classes.cardText}>Tagline: {item.tagline}</p>
          </div>
        </div>
      )}
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
    tagline: propTypes.string,
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

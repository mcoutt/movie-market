import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import "../popup-movie/popup-movie.scss";
import { bindActionCreators } from "redux";
import { setMovieDetails, setHeaderMovie } from "../../actions";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";

import "./movie-item-details.scss";
import { useParams } from "react-router-dom";
import { Spinner } from "../spinner";

const MovieItemDetails = (props) => {
  const { moviestoreService } = props;
  let { id } = useParams();

  const getMovie = async () => {
    const data = await moviestoreService.getMovie(parseInt(id));
    console.log(`------ data: ${data}`);
    props.setMovieDetails(data);
    setItem(props.movie);
  };

  const [item, setItem] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const _item = props.movie;
  setItem(_item);
  setLoaded(false);
  useEffect(async () => {
    console.log(`use effect: ${loaded}`);
    if (loaded) {
      console.log(`use effect: ${loaded}`);
      await getMovie();
      setLoaded(true);
    }
  }, []);

  const handleShowDetail = async () => {
    await getMovie();
    props.setHeaderMovie(true);
  };

  return (
    <>
      {!loaded ? (
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
      ) : (
        <Spinner />
      )}
    </>
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

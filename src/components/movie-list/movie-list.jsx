import React, { useEffect } from "react";
import MovieItem from "../movie-item";
import { connect } from "react-redux";
import { withMoviestoreService } from "../hoc";
import { moviesLoaded } from "../../actions";
import { bindActionCreators } from "redux";

import "./movie-list.scss";

const MovieList = (props) => {
  useEffect(async () => {
    const { moviestoreService } = props;
    const data = await moviestoreService.getMovies();

    props.moviesLoaded(data);
  }, []);

  return (
    <div className="movie-list">
      {props.movies.length > 0
        ? props.movies.map((item) => <MovieItem item={item} key={item.id} />)
        : null}
    </div>
  );
};

const mapStateToProps = ({ movies }) => {
  return {
    movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      moviesLoaded,
    },
    dispatch
  );
};

export default withMoviestoreService()(
  connect(mapStateToProps, mapDispatchToProps)(MovieList)
);

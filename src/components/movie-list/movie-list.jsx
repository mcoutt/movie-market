import React, { useEffect, useState } from "react";
import MovieItem from "../movie-item";
import { connect } from "react-redux";
import { withMoviestoreService } from "../hoc";
import { moviesLoaded } from "../../actions";
import { bindActionCreators } from "redux";

import classes from "./movie-list.module.scss";
import { EditPopup, DelPopup } from "../popup-movie";

const MovieList = (props) => {
  const { moviestoreService } = props;
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(async () => {
    const data = await moviestoreService.getMovies();
    props.moviesLoaded(data);
  }, [movieToDelete, props.newMovie, props.updatedMovie]);

  const handleEditOpen = (movie) => {
    setMovieToEdit(movie);
  };

  const handleEditClose = () => {
    setMovieToEdit(null);
  };

  const handleDelOpen = (movie) => {
    setMovieToDelete(movie);
  };

  const handleDelClose = () => {
    setMovieToDelete(null);
  };

  return (
    <>
      <div className={classes.movieList}>
        {props.movies.length > 0 ? (
          props.movies.map((item) => (
            <MovieItem
              item={item}
              key={item.id}
              openEditPopup={handleEditOpen}
              openDeletePopup={handleDelOpen}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
      {movieToEdit ? (
        <EditPopup item={movieToEdit} closePopup={handleEditClose} />
      ) : undefined}
      {movieToDelete ? (
        <DelPopup item={movieToDelete} closePopup={handleDelClose} />
      ) : undefined}
    </>
  );
};

const mapStateToProps = ({ movies, newMovie, updatedMovie }) => {
  return {
    movies,
    newMovie,
    updatedMovie,
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

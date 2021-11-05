import React, { useEffect, useState } from "react";
import MovieItem from "../movie-item";
import { connect } from "react-redux";
import { withMoviestoreService } from "../hoc";
import { createMovie, moviesLoaded } from "../../actions";
import { bindActionCreators } from "redux";

import "./movie-list.scss";
import Popup from "../popup-movie";

const MovieList = (props) => {
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(async () => {
    const { moviestoreService } = props;
    const data = await moviestoreService.getMovies();

    props.moviesLoaded(data);
  }, [movieToDelete, props.newMovie]);

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
      <div className="movie-list">
        {props.movies.length > 0
          ? props.movies.map((item) => (
              <MovieItem
                item={item}
                key={item.id}
                openEditPopup={handleEditOpen}
                openDeletePopup={handleDelOpen}
              />
            ))
          : null}
      </div>
      {movieToEdit ? (
        <Popup item={movieToEdit} action="edit" closePopup={handleEditClose} />
      ) : undefined}
      {movieToDelete ? (
        <Popup item={movieToDelete} action="del" closePopup={handleDelClose} />
      ) : undefined}
    </>
  );
};

const mapStateToProps = ({ movies, newMovie }) => {
  return {
    movies,
    newMovie,
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

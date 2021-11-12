import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { moviesLoaded, filterMovie, sortMovie } from "../../actions";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import "./genre-filter.scss";

const GenreFilter = (props) => {
  const { moviestoreService, filterQuery, filterMovie, sortQuery, sortMovie } =
    props;

  const sortingMovie = (e) => {
    sortMovie(e.target.value);
  };
  useEffect(async () => {
    const data = await moviestoreService.getMovies({ filterQuery, sortQuery });
    props.moviesLoaded(data);
  }, [filterQuery, sortQuery]);

  const handleGenreFilter = (e) => {
    if (e.target.innerText === "All") {
      filterMovie("");
    } else {
      filterMovie(e.target.innerText.toLowerCase());
    }
  };

  const genres = ["All", "Documentary", "Comedy", "Horror", "Crime"];

  return (
    <div className="genre-wrapper">
      <div className="genres">
        {genres.map((i) => (
          <p className="genre" key={i} onClick={handleGenreFilter}>
            {i}
          </p>
        ))}
      </div>
      <p>
        SORT BY
        <select className="sort" onChange={sortingMovie} value={sortQuery}>
          <option value="default">Select..</option>
          <option value="release_date">Release date</option>
          <option value="vote_average">Rating</option>
          <option value="genres">Genres</option>
        </select>
      </p>
    </div>
  );
};

const mapStateToProps = ({ movies, filterQuery, sortQuery }) => {
  return {
    movies,
    filterQuery,
    sortQuery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ moviesLoaded, filterMovie, sortMovie }, dispatch);
};

export default withMoviestoreService()(
  connect(mapStateToProps, mapDispatchToProps)(GenreFilter)
);

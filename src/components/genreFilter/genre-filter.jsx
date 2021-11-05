import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { moviesLoaded } from "../../actions";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import "./genre-filter.scss";

const GenreFilter = (props) => {
  const { moviestoreService } = props;

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("release_date");

  const sortMovie = (newSortItem) => {
    setSort(newSortItem);
  };
  useEffect(async () => {
    const data = await moviestoreService.getMovies({ filter, sort });
    props.moviesLoaded(data);
  }, [filter, sort]);

  const handleAll = () => {
    setFilter("");
  };
  const handleDocumentary = () => {
    setFilter("documentary");
  };
  const handleComedy = async () => {
    await setFilter("comedy");
  };
  const handleHorror = async () => {
    await setFilter("horror");
  };
  const handleCrime = () => {
    setFilter("crime");
  };

  return (
    <div className="genre-wrapper">
      <div className="genres">
        <p className="genre" onClick={handleAll}>
          All
        </p>
        <p className="genre" onClick={handleDocumentary}>
          Documentary
        </p>
        <p className="genre" onClick={handleComedy}>
          Comedy
        </p>
        <p className="genre" onClick={handleHorror}>
          Horror
        </p>
        <p className="genre" onClick={handleCrime}>
          Crime
        </p>
      </div>
      <p>
        SORT BY
        <select
          className="sort"
          onChange={(event) => sortMovie(event.target.value)}
          value={sort}
        >
          <option value="release_date">release date</option>
          <option value="vote_average">rating</option>
          <option value="genres">genres</option>
        </select>
      </p>
    </div>
  );
};

const mapStateToProps = ({ movies }) => {
  return {
    movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ moviesLoaded }, dispatch);
};

export default withMoviestoreService()(
  connect(mapStateToProps, mapDispatchToProps)(GenreFilter)
);

import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { moviesLoaded } from "../../actions";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";

const GenreFilter = (props) => {
  const { moviestoreService } = props;

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

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
    <div>
      <p onClick={handleAll}>All</p>
      <p onClick={handleDocumentary}>Documentary</p>
      <p onClick={handleComedy}>Comedy</p>
      <p onClick={handleHorror}>Horror</p>
      <p onClick={handleCrime}>Crime</p>
      <p>
        SORT BY
        <select
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

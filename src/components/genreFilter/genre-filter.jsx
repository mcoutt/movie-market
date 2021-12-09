import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { moviesLoaded, filterMovie, sortMovie } from "../../actions";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import classes from "./genre-filter.module.scss";
import { Link, NavLink, useLocation, withRouter } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const GenreFilter = (props) => {
  const query = useQuery();
  console.log(`Filter, sort query: ${query}`);
  const { moviestoreService, filterQuery, filterMovie, sortQuery, sortMovie } =
    props;

  const sortingMovie = (i) => {
    sortMovie(i);
    // props.history.push(`movies?sortBy=${event.target.value}`);
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
  const sort = {
    Select: "default",
    "Release date": "release_date",
    Rating: "vote_average",
  };

  return (
    <div className={classes.genreWrapper}>
      <div className={classes.genres}>
        {genres.map((i) => (
          <p className={classes.genre} key={i} onClick={handleGenreFilter}>
            <NavLink
              to={{
                pathname: "",
                search: `?genre=${i.toLowerCase()}`,
              }}
            >
              {i}
            </NavLink>
          </p>
        ))}
      </div>
      <p>
        SORT BY
        <ul>
          {Object.keys(sort).map((i) => (
            <li key={i} value={sort[i]} onClick={() => sortingMovie(sort[i])}>
              <NavLink
                key={i}
                to={{
                  pathname: "",
                  search: `?sortBy=${i.toString()}`,
                }}
              >
                {i}
              </NavLink>
            </li>
          ))}
        </ul>
        {/*<select className="sort" onChange={sortingMovie} value={sortQuery}>*/}
        {/*  {Object.keys(sort).map((i) => (*/}
        {/*    <option key={i} value={sort[i]}>*/}
        {/*<NavLink*/}
        {/*  key={i}*/}
        {/*  to={{*/}
        {/*    pathname: "",*/}
        {/*    search: `?sortBy=${i.toString()}`,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {i}*/}
        {/*</NavLink>*/}
        {/*{i}*/}
        {/*</option>*/}
        {/*))}*/}
        {/*</select>*/}
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

const _genreFilter = withRouter(GenreFilter);

export default withMoviestoreService()(
  connect(mapStateToProps, mapDispatchToProps)(_genreFilter)
);

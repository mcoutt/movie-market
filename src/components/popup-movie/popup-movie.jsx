import React, { useEffect, useState } from "react";
import { components, default as ReactSelect } from "react-select";
import "./popup-movie.scss";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createMovie,
  editMovie,
  deleteMovie,
  setMovieDetails,
} from "../../actions";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const Popup = (props) => {
  const { action, closePopup, item, newMovie, moviestoreService } = props;

  const movie = {
    title: "",
    overview: "",
    poster_path: "",
    release_date: "",
    revenue: 0,
    runtime: 0,
    genres: [],
    action: "",
  };

  let body;
  let bodyItem;
  let addItem = undefined;
  let editItem = undefined;
  let delItem = undefined;
  let genreOptions = [];

  if (action === "add") {
    addItem = true;
  } else if (action === "edit") {
    editItem = true;
  } else if (action === "del") {
    delItem = true;
  }

  if (editItem) {
    genreOptions = item.genres.map((genre) => {
      return {
        value: genre.toLowerCase(),
        label: genre,
      };
    });
  }

  const [title, setTitle] = useState(item.title);
  const [releaseDate, setReleaseDate] = useState(item.release_date);
  const [url, setUrl] = useState(item.poster_path);
  const [rating, setRating] = useState(item.revenue);
  const [runtime, setRuntime] = useState(item.runtime);
  const [overview, setOverview] = useState(item.overview);
  const [genres, setGenres] = useState(genreOptions);
  const [createItem, setCreateItem] = useState(undefined);
  const [editMovieItem, setEditMovieItem] = useState(undefined);

  useEffect(async () => {
    if (action === "edit") {
      const data = await moviestoreService.getMovie(item.id);
      console.log(data);

      props.setMovieDetails(data);
    }
  }, [action, createItem, editMovieItem]);

  const handleTitle = (event) => {
    console.log(`change ---- ${event.target.value}`);
    setTitle(event.target.value);
  };

  const handleReleaseDate = (event) => {
    setReleaseDate(event.target.value);
  };

  const handleUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleRuntime = (event) => {
    setRuntime(event.target.value);
  };

  const handleRating = (event) => {
    setRating(event.target.value);
  };

  const handleGenreChange = (selected) => {
    setGenres(selected.target.value);
  };

  const handleOverview = (event) => {
    setOverview(event.target.value);
  };

  const handleReset = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (action === "add") {
      const newMovie = {
        title,
        overview,
        poster_path: url,
        release_date: releaseDate,
        revenue: typeof rating === "string" ? parseInt(rating) : rating,
        runtime: typeof runtime === "string" ? parseInt(runtime) : runtime,
        genres: genres.split(" "),
      };
      // setCreateItem({ ...movieItem, movie });
      await moviestoreService.createMovie(newMovie);
      // await setCreateItem(newMovie);
      props.createMovie(newMovie);
    } else if (action === "edit") {
      let updatedMovie = {
        id: item.id,
        title,
        overview,
        poster_path: url,
        release_date: releaseDate,
        revenue: typeof rating === "string" ? parseInt(rating) : rating,
        runtime: typeof runtime === "string" ? parseInt(runtime) : runtime,
        genres: genres.map((i) => i.label),
      };
      await moviestoreService.editMovie({ id: item.id, movie: updatedMovie });
      props.editMovie(updatedMovie);
    }
    closePopup();
  };
  const handleDelSubmit = async (event) => {
    event.preventDefault();
    await moviestoreService.deleteMovie(item.id);
    props.deleteMovie(item.id);
    closePopup();
  };

  const header =
    action === "add"
      ? "ADD"
      : action === "edit"
      ? "EDIT"
      : action === "del"
      ? "DELETE"
      : null;

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#eb4f5d" : "#d8d8d8",
      // padding: 10,
      backgroundColor: "#424242",
      width: 765,
      marginLeft: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 765,
      marginLeft: 20,
      backgroundColor: "#424242",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  if (["add", "edit"].includes(action)) {
    bodyItem = {
      title: {
        placeholder: addItem ? "Title there" : undefined,
        value: editItem ? title : undefined,
      },
      releaseDate: {
        placeholder: addItem ? "Release date there" : undefined,
        value: editItem ? releaseDate : undefined,
      },
      url: {
        placeholder: addItem ? "Movie URL here" : undefined,
        value: editItem ? url : undefined,
      },
      genre: {
        value: genreOptions,
        change: handleGenreChange,
        placeholder: "Add genres by space",
      },
      overview: {
        placeholder: addItem ? "Overview there" : undefined,
        value: editItem ? overview : undefined,
      },
      vote_average: {
        placeholder: addItem ? "Vote rating there" : undefined,
        value: editItem ? item.vote_average : undefined,
      },
      vote_count: {
        placeholder: addItem ? "Vote count there" : undefined,
        value: editItem ? item.vote_count : undefined,
      },
      budget: {
        placeholder: addItem ? "Budget there" : undefined,
        value: editItem ? item.budget : undefined,
      },
      revenue: {
        placeholder: addItem ? "Revenue there" : undefined,
        value: editItem ? rating : undefined,
      },
      runtime: {
        placeholder: addItem ? "Runtime there" : undefined,
        value: editItem ? runtime : undefined,
      },

      reset: false,
      styles: addItem ? "input-data-area placeholder" : "input-data-area",
    };

    body = (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="headerTitle">
            <label>{header} MOVIE</label>
          </div>
          <div>
            <label>
              <p className="titles">TITLE</p>
              <input
                type="text"
                name="title"
                className={bodyItem.styles}
                onChange={handleTitle}
                value={bodyItem.title.value}
                placeholder={bodyItem.title.placeholder}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="titles">RELEASE DATE</p>
              <input
                className={bodyItem.styles}
                type="date"
                onChange={handleReleaseDate}
                value={bodyItem.releaseDate.value}
                placeholder={bodyItem.releaseDate.placeholder}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="titles">MOVIE URL</p>
              <input
                type="url"
                name="movie_url"
                placeholder={bodyItem.url.placeholder}
                className={bodyItem.styles}
                onChange={handleUrl}
                value={bodyItem.url.value}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="titles">RATING</p>
              <input
                type="text"
                name="rating"
                className={bodyItem.styles}
                placeholder={bodyItem.revenue.placeholder}
                onChange={handleRating}
                value={bodyItem.revenue.value}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="titles">GENRE</p>
              {addItem ? (
                <input
                  type="text"
                  name="runtime"
                  className={bodyItem.styles}
                  placeholder={bodyItem.genre.placeholder}
                  onChange={handleGenreChange}
                />
              ) : (
                <span
                  className="input-select"
                  data-toggle="popover"
                  data-trigger="focus"
                  data-content="Please selecet account(s)"
                >
                  <ReactSelect
                    options={genreOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                    onChange={handleGenreChange}
                    allowSelectAll={true}
                    value={genres}
                    styles={customStyles}
                  />
                </span>
              )}
            </label>
          </div>
          <div>
            <label>
              <p className="titles">OVERVIEW</p>
              <input
                type="text"
                name="overview"
                className={bodyItem.styles}
                onChange={handleOverview}
                value={bodyItem.overview.value}
                placeholder={bodyItem.overview.placeholder}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="titles">RUNTIME</p>
              <input
                type="text"
                name="runtime"
                className={bodyItem.styles}
                onChange={handleRuntime}
                value={bodyItem.runtime.value}
                placeholder={bodyItem.overview.placeholder}
              />
            </label>
          </div>
          <div className="outer">
            <div className="inner">
              <input
                type="submit"
                className="resetButton"
                onClick={handleReset}
                value="RESET"
              />

              <input
                type="submit"
                className="submitButton"
                onClick={handleSubmit}
                value="SUBMIT"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
  if (delItem) {
    body = (
      <form>
        <div className="deleteItem">
          <div>
            <label className="headerTitle">{header} MOVIE</label>
          </div>
          <div>
            <label className="titles">
              <p>Are you sure you want to delete this movie?</p>
            </label>
          </div>
          <div>
            <button
              className="submitButton deleteTitle"
              onClick={handleDelSubmit}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="popup">
      <div className="popup_inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
          onClick={closePopup}
          className="closeButton"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
        </svg>
        {body}
      </div>
    </div>
  );
};

const mapStateToProps = ({ movies, movie, newMovie, delMovie }) => {
  return {
    movies,
    movie,
    newMovie,
    delMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { createMovie, editMovie, deleteMovie, setMovieDetails },
    dispatch
  );
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Popup);

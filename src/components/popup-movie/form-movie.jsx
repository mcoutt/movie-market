import React, { useEffect, useState } from "react";
import { components, default as ReactSelect } from "react-select";
import classes from "./popup-movie.module.scss";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createMovie,
  deleteMovie,
  editMovie,
  setMovieDetails,
} from "../../actions";
import CloseButton from "./close-button";

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

  const [createItem, setCreateItem] = useState(undefined);
  const [editMovieItem, setEditMovieItem] = useState(undefined);

  useEffect(async () => {
    if (action === "edit") {
      const data = await moviestoreService.getMovie(item.id);
      console.log(data);

      props.setMovieDetails(data);
    }
  }, [action, createItem, editMovieItem]);

  const handleSubmit = async (values, touched) => {
    if (action === "add") {
      const newMovie = {
        title: values.title,
        overview: values.overview,
        poster_path: values.poster_path,
        release_date: values.release_date,
        revenue:
          typeof values.revenue === "string"
            ? parseInt(values.revenue)
            : values.revenue,
        runtime:
          typeof values.runtime === "string"
            ? parseInt(values.runtime)
            : values.runtime,
        genres: values.genres.split(" "),
      };
      // setCreateItem({ ...movieItem, movie });
      await moviestoreService.createMovie(newMovie);
      props.createMovie(newMovie);
    } else if (action === "edit") {
      let updatedMovie = {
        id: item.id,
        title: values.title,
        overview: values.overview,
        poster_path: values.poster_path,
        release_date: values.release_date,
        revenue:
          typeof values.revenue === "string"
            ? parseInt(values.revenue)
            : values.revenue,
        runtime:
          typeof values.runtime === "string"
            ? parseInt(values.runtime)
            : values.runtime,
        genres: values.genres.map((i) => i.label),
      };
      console.log(`------- ${JSON.stringify(action)}`);
      console.log(`------  edit Movie - ${JSON.stringify(updatedMovie)}`);

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

  const initialValues = {
    title: "",
    release_date: "",
    poster_path: "",
    genres: [],
    overview: "",
    vote_average: 0,
    vote_count: 0,
    budget: 0,
    revenue: 0,
    runtime: 0,
  };
  const initialEditValues = (values) => ({
    title: values.title,
    release_date: values.release_date,
    poster_path: values.poster_path,
    genres: values.genres,
    overview: values.overview,
    vote_average: 0,
    vote_count: 0,
    budget: 0,
    revenue: values.revenue,
    runtime: values.runtime,
  });

  const handleReset = (actions) => {
    console.log(`---- reset? ${actions}`);
    // actions.resetForm(initialValues);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    release_date: Yup.string().required("Release date is required"),
    poster_path: Yup.string().required("Url to the poster image is required"),
    genres: Yup.string().required("List of genres is required"),
    overview: Yup.string().required(
      "Short description of the movie is required"
    ),
    runtime: Yup.string().required("Movie duration time is required"),
  });

  if (["add", "edit"].includes(action)) {
    const bodyItem = (values) => ({
      title: {
        placeholder: addItem ? "Title there" : undefined,
        value: editItem ? values.title : undefined,
      },
      release_date: {
        placeholder: addItem ? "Release date there" : undefined,
        value: editItem ? values.release_date : undefined,
      },
      poster_path: {
        placeholder: addItem ? "Movie URL here" : undefined,
        value: editItem ? values.poster_path : undefined,
      },
      genre: {
        value: genreOptions,
        placeholder: "Add genres by space",
      },
      overview: {
        placeholder: addItem ? "Overview there" : undefined,
        value: editItem ? values.overview : undefined,
      },
      vote_average: {
        placeholder: addItem ? "Vote rating there" : undefined,
        value: editItem ? values.vote_average : undefined,
      },
      vote_count: {
        placeholder: addItem ? "Vote count there" : undefined,
        value: editItem ? values.vote_count : undefined,
      },
      budget: {
        placeholder: addItem ? "Budget there" : undefined,
        value: editItem ? values.budget : undefined,
      },
      revenue: {
        placeholder: addItem ? "Revenue there" : undefined,
        value: editItem ? values.revenue : undefined,
      },
      runtime: {
        placeholder: addItem ? "Runtime there" : undefined,
        value: editItem ? values.runtime : undefined,
      },

      reset: false,
      styles: addItem ? "input-data-area placeholder" : "input-data-area",
    });
    body = (
      <Formik
        initialValues={
          addItem ? initialValues : editItem ? initialEditValues : initialValues
        }
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        onReset={handleReset}
        // validateOnChange={handleChange}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          // handleSubmit,
          isSubmitting,
        }) => (
          <Form>
            <div className="headerTitle">
              <label>{header} MOVIE</label>
            </div>
            <div>
              <p className="titles">TITLE</p>
              <Field
                type="title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={bodyItem(values, touched).title.placeholder}
                className={bodyItem(values, touched).styles}
                value={bodyItem(values, touched).title.value}
              />
            </div>
            <div>
              <p className="titles">RELEASE DATE</p>
              <Field
                className={bodyItem(values).styles}
                type="date"
                name="release_date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={bodyItem(values).release_date.value}
                placeholder={bodyItem(values).release_date.placeholder}
              />
            </div>
            <div>
              <p className="titles">MOVIE URL</p>
              <Field
                type="poster_path"
                name="poster_path"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={bodyItem(values).poster_path.placeholder}
                className={bodyItem(values).styles}
                value={bodyItem(values).poster_path.value}
              />
            </div>
            <div>
              <p className="titles">RATING</p>
              <Field
                type="text"
                name="rating"
                onChange={handleChange}
                onBlur={handleBlur}
                className={bodyItem(values).styles}
                placeholder={bodyItem(values).revenue.placeholder}
                value={bodyItem(values).revenue.value}
              />
            </div>
            <div>
              <label>
                <p className="titles">GENRE</p>
                {addItem ? (
                  <Field
                    type="text"
                    name="genre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={bodyItem(values).styles}
                    placeholder={bodyItem(values).genre.placeholder}
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
                      allowSelectAll={true}
                      value={bodyItem(values).genres.value}
                      styles={customStyles}
                    />
                  </span>
                )}
              </label>
            </div>
            <div>
              <p className="titles">OVERVIEW</p>
              <Field
                type="text"
                name="overview"
                onChange={handleChange}
                onBlur={handleBlur}
                className={bodyItem(values).styles}
                value={bodyItem(values).overview.value}
                placeholder={bodyItem(values).overview.placeholder}
              />
            </div>
            <div>
              <p className="titles">RUNTIME</p>
              <Field
                type="text"
                name="runtime"
                onChange={handleChange}
                onBlur={handleBlur}
                className={bodyItem(values).styles}
                value={bodyItem(values).runtime.value}
                placeholder={bodyItem(values).overview.placeholder}
              />
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
          </Form>
        )}
      </Formik>
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
        <CloseButton closePopup={closePopup} />
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

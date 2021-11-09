import React from "react";
import "./popup-movie.scss";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createMovie, setMovieDetails } from "../../actions";
import CloseButton from "./close-button";

const AddPopup = (props) => {
  const { closePopup, moviestoreService } = props;

  const handleSubmit = async (values) => {
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
      genres: values.genres ? values.genres.split(" ") : values.genres,
    };
    // setCreateItem({ ...movieItem, movie });
    await moviestoreService.createMovie(newMovie);
    props.createMovie(newMovie);
    closePopup();
  };

  const initialValues = {
    title: "",
    release_date: "",
    poster_path: "",
    genres: [],
    overview: "",
    revenue: 0,
    runtime: 0,
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

  return (
    <div className="popup">
      <div className="popup_inner">
        <CloseButton closePopup={closePopup} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          // validateOnChange={handleChange}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <div className="headerTitle">
                <label>ADD MOVIE</label>
              </div>
              <div>
                <p className="titles">TITLE</p>
                <Field
                  type="title"
                  name="title"
                  placeholder="Title there"
                  className="input-data-area placeholder"
                />
              </div>
              <div>
                <p className="titles">RELEASE DATE</p>
                <Field
                  className="input-data-area placeholder"
                  type="date"
                  name="release_date"
                  placeholder="Release date there"
                />
              </div>
              <div>
                <p className="titles">MOVIE URL</p>
                <Field
                  type="poster_path"
                  name="poster_path"
                  placeholder="Movie URL here"
                  className="input-data-area placeholder"
                />
              </div>
              <div>
                <p className="titles">RATING</p>
                <Field
                  type="text"
                  name="revenue"
                  className="input-data-area placeholder"
                  placeholder="Revenue there"
                />
              </div>
              <div>
                <label>
                  <p className="titles">GENRES</p>
                  <Field
                    type="text"
                    name="genres"
                    className="input-data-area placeholder"
                    placeholder="Add genres by space"
                  />
                </label>
              </div>
              <div>
                <p className="titles">OVERVIEW</p>
                <Field
                  type="text"
                  name="overview"
                  className="input-data-area placeholder"
                  placeholder="Overview there"
                />
              </div>
              <div>
                <p className="titles">RUNTIME</p>
                <Field
                  type="text"
                  name="runtime"
                  className="input-data-area placeholder"
                  placeholder="Runtime there"
                />
              </div>
              <div className="outer">
                <div className="inner">
                  <input type="reset" className="resetButton" value="RESET" />
                  <input
                    type="submit"
                    className="submitButton"
                    value="SUBMIT"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = ({ movies, movie, newMovie }) => {
  return {
    movies,
    movie,
    newMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createMovie, setMovieDetails }, dispatch);
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AddPopup);

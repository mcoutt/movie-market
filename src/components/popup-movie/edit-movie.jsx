import React, { useEffect, useState } from "react";
import { components, default as ReactSelect } from "react-select";
import "./popup-movie.scss";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editMovie, setMovieDetails } from "../../actions";
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

const EditPopup = (props) => {
  const { action, closePopup, item, movie, moviestoreService } = props;
  const [updatedMovie, setUpdatedMovie] = useState({});
  const genreOptions = item.genres.map((genre) => {
    return {
      value: genre.toLowerCase(),
      label: genre,
    };
  });

  const handleSubmit = async ({ setSubmitting }) => {
    console.log(`------  handle Movie - ${JSON.stringify(updatedMovie)}`);
    setSubmitting(true);
    await moviestoreService.editMovie({ id: item.id, movie: updatedMovie });
    props.editMovie(updatedMovie);
    closePopup();
  };

  const validate = async (values) => {
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
      genres: values.genres, //? values.genres.split(" ") : values.genres,
    };
    console.log(`------  validate - ${JSON.stringify(updatedMovie)}`);
    setUpdatedMovie(updatedMovie);
    // await moviestoreService.editMovie({ id: item.id, movie: updatedMovie });
    // props.editMovie(updatedMovie);
    // closePopup();
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#eb4f5d" : "#d8d8d8",
      backgroundColor: "#424242",
      width: 765,
      marginLeft: 20,
    }),
    control: () => ({
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
    title: item.title,
    release_date: item.release_date,
    poster_path: item.poster_path,
    genres: genreOptions,
    overview: item.overview,
    vote_average: 0,
    vote_count: 0,
    budget: 0,
    revenue: item.revenue,
    runtime: item.runtime,
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
          validate={validate}
          // validateOnChange={handleChange}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            // handleSubmit,
          }) => (
            <Form>
              <div className="headerTitle">
                <label>EDIT !! MOVIE</label>
              </div>
              <div>
                <p className="titles">TITLE</p>
                <Field
                  type="title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-data-area"
                  value={values.title}
                />
              </div>
              <div>
                <p className="titles">RELEASE DATE</p>
                <Field
                  type="date"
                  name="release_date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-data-area"
                  value={values.release_date}
                />
              </div>
              <div>
                <p className="titles">MOVIE URL</p>
                <Field
                  type="poster_path"
                  name="poster_path"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-data-area"
                  value={values.poster_path}
                />
              </div>
              <div>
                <p className="titles">RATING</p>
                <Field
                  type="text"
                  name="revenue"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-data-area"
                  value={values.revenue}
                />
              </div>
              <div>
                <label>
                  <p className="titles">GENRES</p>

                  <span
                    className="input-select"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please select genre(s)"
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
                      value={values.genres}
                      styles={customStyles}
                    />
                  </span>
                </label>
              </div>
              <div>
                <p className="titles">OVERVIEW</p>
                <Field
                  type="text"
                  name="overview"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-data-area"
                  value={values.overview}
                />
              </div>
              <div>
                <p className="titles">RUNTIME</p>
                <Field
                  type="text"
                  name="runtime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-data-area"
                  value={values.runtime}
                />
              </div>
              <div className="outer">
                <div className="inner">
                  <input type="reset" className="resetButton" value="RESET" />
                  <button
                    type="submit"
                    className="submitButton"
                    // value="SUBMIT"
                    disabled={isSubmitting}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ editMovie, setMovieDetails }, dispatch);
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(EditPopup);

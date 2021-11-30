import React, { useEffect, useState } from "react";
import { components, default as ReactSelect } from "react-select";
import classes from "./popup-movie.module.scss";
import { compose } from "../../utils";
import { withMoviestoreService } from "../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editMovie, setMovieDetails, getMovieDetails } from "../../actions";
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
  const { closePopup, item, moviestoreService, movie } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const _movie = moviestoreService.getMovie(item.id);
      props.setMovieDetails(_movie);
      setIsLoading(false);
    }
  }, [isLoading]);

  const genreOptions = item.genres.map((genre) => {
    return {
      value: genre.toLowerCase(),
      label: genre,
    };
  });

  const handleSubmit = async (values) => {
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

    await moviestoreService.editMovie({ id: item.id, movie: updatedMovie });
    props.editMovie(updatedMovie);
    closePopup();
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
    revenue: item.revenue ? item.revenue : 0,
    runtime: item.runtime ? item.runtime : 0,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    release_date: Yup.string().required("Release date is required"),
    poster_path: Yup.string().required("Url to the poster image is required"),
    genres: Yup.array().required("List of genres is required"),
    overview: Yup.string().required(
      "Short description of the movie is required"
    ),
    revenue: Yup.number(),
    runtime: Yup.number(),
  });

  return (
    <div className={classes.popup}>
      <div className={classes.popup_inner}>
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
            // handleSubmit,
          }) => (
            <Form>
              <div className={classes.headerTitle}>
                <label>EDIT MOVIE</label>
              </div>
              <div>
                <p className={classes.titles}>TITLE</p>
                <Field
                  type="title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.inputDataArea}
                  value={values.title}
                />
                <ErrorMessage name="title" render={(msg) => <div>{msg}</div>} />
              </div>
              <div>
                <p className={classes.titles}>RELEASE DATE</p>
                <Field
                  type="date"
                  name="release_date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.inputDataArea}
                  value={values.release_date}
                />
                <ErrorMessage
                  name="release_date"
                  render={(msg) => <div>{msg}</div>}
                />
              </div>
              <div>
                <p className={classes.titles}>MOVIE URL</p>
                <Field
                  type="poster_path"
                  name="poster_path"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.inputDataArea}
                  value={values.poster_path}
                />
                <ErrorMessage
                  name="poster_path"
                  render={(msg) => <div>{msg}</div>}
                />
              </div>
              <div>
                <p className={classes.titles}>RATING</p>
                <Field
                  type="text"
                  name="revenue"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.inputDataArea}
                  value={values.revenue}
                />
                <ErrorMessage
                  name="revenue"
                  render={(msg) => <div>{msg}</div>}
                />
              </div>
              <div>
                <label>
                  <p className={classes.titles}>GENRES</p>

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
                <p className={classes.titles}>OVERVIEW</p>
                <Field
                  type="text"
                  name="overview"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.inputDataArea}
                  value={values.overview}
                />
                <ErrorMessage
                  name="overview"
                  render={(msg) => <div>{msg}</div>}
                />
              </div>
              <div>
                <p className={classes.titles}>RUNTIME</p>
                <Field
                  type="text"
                  name="runtime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classes.inputDataArea}
                  value={values.runtime}
                />
                <ErrorMessage
                  name="runtime"
                  render={(msg) => <div>{msg}</div>}
                />
              </div>
              <div className="outer">
                <div className="inner">
                  <input type="reset" className="resetButton" value="RESET" />
                  <button
                    type="submit"
                    className="submitButton"
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

const mapStateToProps = ({ movies, movie }) => {
  return {
    movies,
    movie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { editMovie, setMovieDetails, getMovieDetails },
    dispatch
  );
};

export default compose(
  withMoviestoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(EditPopup);

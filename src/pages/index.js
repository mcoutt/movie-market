import React, { Fragment, useEffect } from "react";
import SearchPage from "./search";
import HeaderItem from "../../src/components/header";
import MoviestoreService from "../services";
import { wrapper } from "../store";
import { moviesLoaded } from "../../src/actions/index";
import { connect } from "react-redux";

function HomePage(props) {
  return (
    <Fragment>
      <header>{<HeaderItem />}</header>
      <main>
        <SearchPage />
      </main>
    </Fragment>
  );
}

export const getServerSideProps = wrapper.getServerSideProps( (store) => async () => {
  await store.dispatch(fetchMovies());
});

function fetchMovies() {
  return async function (dispatch, getState) {
    const moviestoreService = new MoviestoreService();
    const data = await moviestoreService.getMovies();

    return dispatch(moviesLoaded(data));
  };
}

const mapStateToProps = (state) => {
  return {
    movies: state.moviesStore.movies,
  };
};

export default connect(mapStateToProps)(HomePage);

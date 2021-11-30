import React, { Fragment, useEffect } from "react";
import SearchPage from "./search";
import HeaderItem from "../../src/components/header";
import MoviestoreService from "../services";
import { wrapper } from "../store";
import { moviesLoaded } from "../../src/actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function HomePage(props) {
  useEffect(() => {
    props.moviesLoaded();
  }, [props]);
  return (
    <Fragment>
      <header>{/*<HeaderItem />*/}</header>
      <main>
        <SearchPage />
      </main>
    </Fragment>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => () => {
  store.dispatch(moviesLoaded());
});

// export async function getStaticProps() {
//   const moviestoreService = new MoviestoreService();
//   const data = await moviestoreService.getMovies();
//
//   return {
//     props: {
//       movies: data,
//     },
//   };
// }

const mapDispatchToProps = (dispatch) => {
  return {
    movies: bindActionCreators(moviesLoaded, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(HomePage);

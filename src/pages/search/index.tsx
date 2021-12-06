import React, { Fragment } from "react";
import MoviestoreService from "../../services";
import MovieItem from "../../components/movie-item";
import { wrapper } from "../../store";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function SearchPage(props) {
  console.log("props", props);
  return (
    <div>
      {props.movies.map((item) => (
        <MovieItem
          item={item}
          key={item.id}
          // openEditPopup={handleEditOpen}
          // openDeletePopup={handleDelOpen}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    movies: store.moviesStore.movies,
  };
};

export default connect(mapStateToProps)(SearchPage);

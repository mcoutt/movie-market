import React, { Fragment } from "react";
import MoviestoreService from "../../services";
import MovieItem from "../../components/movie-item";

function SearchPage(props) {
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

export async function getStaticProps() {
  const moviestoreService = new MoviestoreService();
  const data = await moviestoreService.getMovies();
  console.log(`=================`);
  console.log(data);
  return {
    props: {
      movies: data,
    },
  };
}

export default SearchPage;

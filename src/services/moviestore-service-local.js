import axios from "axios";
import { string } from "yup";

const results = (response) => {
  if (response.status === 200) {
    return response.data.data;
  } else {
    throw Error("Error with get movies");
  }
};

export class MoviestoreServiceLocal {
  getMovies = async (queryParams = undefined) => {
    let filter;
    let search;
    let sort;
    let queryHost = "http://localhost:4000/movies?";
    if (queryParams === undefined) {
      sort = `sortBy=release_date&sortOrder=desc&`;
    } else {
      filter =
        queryParams && queryParams.filterQuery
          ? `filter=${queryParams.filterQuery}&`
          : undefined;
      search =
        queryParams && queryParams.searchQuery
          ? `search=${queryParams.searchQuery}&searchBy=title&`
          : undefined;
      sort = queryParams.sortQuery
        ? `sortBy=${queryParams.sortQuery}&sortOrder=desc&`
        : `sortBy=release_date&sortOrder=desc&`;
    }

    const query = `${queryHost}${filter ? filter : ""}${
      search ? search : ""
    }${sort}`;

    console.log(`------  query ${query}`);

    const response = await axios.get(query);
    console.log(
      `------  RESPONSE ${JSON.stringify(response.data.totalAmount)}`
    );

    return results(response);
  };

  getMovie = async (id) => {
    const response = await axios.get(`http://localhost:4000/movies/${id}`);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw Error("Error with get movies");
    }
  };

  createMovie = async (newMovie) => {
    try {
      await axios.post("http://localhost:4000/movies", newMovie);
    } catch (e) {
      throw Error(`Error with create movies: ${e}`);
    }
  };

  editMovie = async ({ id, movie }) => {
    console.log(`------  service Movie - ${JSON.stringify(movie)}`);

    movie.id = id;
    const response = await axios.put(`http://localhost:4000/movies/`, movie);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw Error(`Error with get movies: ${response}`);
    }
  };

  deleteMovie = async (id) => {
    const response = await axios.delete(`http://localhost:4000/movies/${id}`);
    if (response.status === 204) {
      return true;
    } else {
      throw Error(`Error with delete movies: ${response}`);
    }
  };
}

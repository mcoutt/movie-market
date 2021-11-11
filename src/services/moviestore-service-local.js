import axios from "axios";

const results = (response) => {
  if (response.status === 200) {
    return response.data.data;
  } else {
    throw Error("Error with get movies");
  }
};

export class MoviestoreServiceLocal {
  getMovies = async (queryParams = undefined) => {
    let sort;
    let limit;
    let filter;
    let search;
    if (queryParams === undefined) {
      sort = "release_date";
    } else {
      limit = queryParams && queryParams.limit ? queryParams.limit : undefined;
      filter =
        queryParams && queryParams.filterQuery
          ? queryParams.filterQuery
          : undefined;
      search =
        queryParams && queryParams.searchQuery
          ? queryParams.searchQuery
          : undefined;
      sort = queryParams.sortQuery ? queryParams.sortQuery : "release_date";
    }
    console.log(
      `limit: ${limit}; filter: ${filter}; search: ${search}; sort: ${sort}`
    );

    let query = limit
      ? `http://localhost:4000/movies?limit=${limit}`
      : filter
      ? `http://localhost:4000/movies?filter=${filter}`
      : search
      ? `http://localhost:4000/movies?search=${search}&searchBy=title`
      : sort
      ? `http://localhost:4000/movies?sortBy=${sort}&sortOrder=desc`
      : "http://localhost:4000/movies";
    const response = await axios.get(query);
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

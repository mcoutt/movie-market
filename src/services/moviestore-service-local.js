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
    const limit =
      queryParams && queryParams.limit ? queryParams.limit : undefined;
    const filter =
      queryParams && queryParams.filter ? queryParams.filter : undefined;
    const search =
      queryParams && queryParams.search ? queryParams.search : undefined;
    const sort = queryParams && queryParams.sort ? queryParams.sort : undefined;
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
    // console.log(query);
    // console.log(response.data.data);
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

  createMovie = async (movie) => {
    console.log(`--- create movie --- ${movie}`);
    const response = await axios.post({
      baseURL: `http://localhost:4000/movies/`,
      movie,
    });
    console.log(`--- create movie --- ${response}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw Error("Error with get movies");
    }
  };

  editMovie = async (movie) => {
    const response = await axios.post({
      baseURL: `http://localhost:4000/movies/`,
      movie,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw Error("Error with get movies");
    }
  };

  deleteMovie = async (id) => {
    const response = await axios.delete(`http://localhost:4000/movies/${id}`);
    if (response.status === 204) {
      return true;
    } else {
      throw Error("Error with get movies");
    }
  };
}

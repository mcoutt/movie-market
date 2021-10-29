import axios from "axios";

const results = (response) => {
  if (response.status === 200) {
    return response.data.results;
  } else {
    throw Error("Error with get movies");
  }
};

export default class MoviestoreService {
  getMovies = async () => {
    const link =
      "https://api.themoviedb.org/3/discover/movie?api_key=2bdb59a54b1d6faa2fafdda27487d12e";
    const response = await axios.get(link);

    if (response.status === 200) {
      return response.data.results;
    } else {
      throw Error("Error with get movies");
    }
  };

  getMovie = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2bdb59a54b1d6faa2fafdda27487d12e`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw Error("Error with get movies");
    }
  };
}

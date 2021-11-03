import axios from "axios";

const imageUrl = (img) => `https://image.tmdb.org/t/p/w500${img}`;

export class MoviestoreServiceAPI {
  getMovies = async () => {
    const link =
      "https://api.themoviedb.org/3/discover/movie?api_key=2bdb59a54b1d6faa2fafdda27487d12e";
    const response = await axios.get(link);

    if (response.status === 200) {
      return response.data.results.map((i) => {
        i.poster_path = imageUrl(i.poster_path);
      });
    } else {
      throw Error("Error with get movies");
    }
  };

  getMovie = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2bdb59a54b1d6faa2fafdda27487d12e`
    );

    if (response.status === 200) {
      return (response.data.poster_path = imageUrl(response.data.poster_path));
    } else {
      throw Error("Error with get movies");
    }
  };
}

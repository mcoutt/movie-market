export const initialState = {
  movies: [],
  header: "",
  movie: {},
  newMovie: {},
  updatedMovie: {},
  delMovie: {},
  searchQuery: undefined,
  filterQuery: undefined,
  sortQuery: "",
};

export const mockMoviesList = [
  {
    id: 1,
    title: "Test title 1",
    tagline: "",
    vote_average: 0,
    vote_count: 2,
    release_date: "2018-05-23",
    poster_path:
      "https://image.tmdb.org/t/p/w500/uJ6OnE3CzGWq6buLINAbdBqa0gV.jpg",
    overview: "Test description 1",
    budget: 0,
    revenue: 0,
    genres: ["Action", "Adventure", "Family", "Science Fiction"],
    runtime: null,
  },
  {
    id: 2,
    title: "Test title 2",
    tagline: "",
    vote_average: 5.7,
    vote_count: 63,
    release_date: "2017-10-20",
    poster_path:
      "https://image.tmdb.org/t/p/w500/65qvQ13CoNxIYHvxGXWFtKc93sX.jpg",
    overview: "Test description 2",
    budget: 0,
    revenue: 0,
    genres: ["Thriller", "Science Fiction"],
    runtime: 108,
  },
];

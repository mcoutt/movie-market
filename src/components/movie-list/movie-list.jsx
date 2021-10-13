import React from 'react';
import { dummyFilmsList } from './dummy-films';

import MovieItem from '../movie-item';


export default function MovieList() {
  return <div className="MoviesList">
    {dummyFilmsList.map((item) => <MovieItem item={item}/>)};
  </div>;
}


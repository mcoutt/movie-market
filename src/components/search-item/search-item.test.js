import React from "react";
import axios from "axios";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchItem from "./search-item";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MoviestoreService from "../../services";
import { initialState, mockMoviesList } from "../../tests/testFixtures";
import { searchMovie } from "../../actions";
import { movies } from "../../reducers";
import store from "../../store";

jest.mock("axios");

const AxiosResponse = {
  data: { data: mockMoviesList },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

describe("Search Component", () => {
  const moviestoreService = new MoviestoreService();

  it("Action testing", () => {
    const searchTitle = "Test title 1";
    const expectAction = { type: "SEARCH_MOVIE", payload: searchTitle };
    expect(searchMovie(searchTitle)).toEqual(expectAction);
  });

  it("should return the initialState", () => {
    expect(movies(undefined, {})).toEqual(initialState);
  });
  it("should handle the SEARCH_MOVIE action", () => {
    const action = { type: "SEARCH_MOVIE" };
    const expectedState = { ...initialState };
    expect(movies(initialState, action)).toEqual(expectedState);
  });

  it("render with real store", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchItem />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Find your movie")).toBeInTheDocument();

    fireEvent.click(screen.getByText("SEARCH"));
  });

  it("call getMovies without params", async () => {
    jest.spyOn(moviestoreService, "getMovies");

    axios.get.mockReturnValueOnce(AxiosResponse);
    const movies = await moviestoreService.getMovies();

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/movies?sortBy=release_date&sortOrder=desc&"
    );
    expect(mockMoviesList).toEqual(movies);
    expect(movies).toHaveLength(2);
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
  });
});

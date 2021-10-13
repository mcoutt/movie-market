import React, { useState } from "react";
import "./popup-movie.scss";

export const Popup = ({ item, action, closePopup }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGenre, setSelectedGenre] = useState({ genre: "" });
  const [submitForm, setSubmit] = useState();
  const [resetForm, setReset] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.genre);
  };

  const handleReset = (event) => {
    setReset(event.target.value);
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    setSubmit(event.target.value);
    alert("Results: " + submitForm);
    event.preventDefault();
  };

  const handleTitle = (e) => {};

  const header =
    action == "add"
      ? "ADD"
      : action == "edit"
      ? "EDIT"
      : action == "del"
      ? "DELETE"
      : null;

  let body;
  if (["add", "edit"].includes(action)) {
    const itemAdd = {
      title: {
        placeholder: item.title,
        value: "",
      },
      releaseDate: item.releaseDate,
      url: {
        placeholder: "Movie URL here",
        value: "",
      },
      imageUrl: item.imageUrl,
      genre: {
        value: selectedGenre,
        change: handleGenreChange,
        placeholder: "select genre",
      },
      overview: "",
      reset: false,
      styles: "input-data-area placeholders",
    };

    const itemEdit = {
      title: {
        placeholder: item.title,
        value: "",
      },
      releaseDate: item.releaseDate,
      url: {
        placeholder: "Movie URL here",
        value: "",
      },
      imageUrl: item.imageUrl,
      genre: {
        value: item.genre_ids,
        change: handleGenreChange,
        placeholder: "",
      },
      overview: item.overview,
      reset: true,
      styles: "input-data-area",
    };

    const bodyItem =
      action == "add" ? itemAdd : action == "edit" ? itemEdit : undefined;

    body = (
      <form>
        <div>
          <div>
            <label>{header} MOVIE</label>
          </div>
          <div>
            <label>
              <p className="titles">TITLE</p>
              <input
                type="text"
                name="title"
                className={bodyItem.styles}
                placeholder={bodyItem.title.placeholder}
                value={bodyItem.title.value}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="titles">RELEASE DATE</p>
              <div className={bodyItem.styles}>{bodyItem.releaseDate}</div>
            </label>
          </div>
          <div>
            <label>
              <p className="titles">MOVIE URL</p>
              <input type="text" name="movie_url" className={bodyItem.styles}>
                {bodyItem.imageUrl}
              </input>
            </label>
          </div>
          <div>
            <label>
              <p className="titles">GENRE</p>
              {!bodyItem.reset ? (
                <select
                  value={bodyItem.genre.value}
                  onChange={bodyItem.genre.change}
                  placeholder={bodyItem.genre.placeholder}
                  className={bodyItem.styles}
                >
                  <option value="grapefruit">Fantasy</option>
                  <option value="lime">Hystorical</option>
                  <option value="coconut">Documental</option>
                  <option value="mango">Comedy</option>
                </select>
              ) : (
                <select
                  value={bodyItem.genre.value}
                  onChange={bodyItem.genre.change}
                  placeholder={bodyItem.genre.placeholder}
                  className={bodyItem.styles}
                ></select>
              )}
            </label>
          </div>
          <div>
            <label>
              <p className="titles">OVERVIEW</p>
              <input
                type="text"
                name="overview"
                className={bodyItem.styles}
                placeholder={bodyItem.overview}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="titles">RUNTIME</p>
              <input
                type="text"
                name="runtime"
                className={bodyItem.styles}
                placeholder="Runtime here"
              />
            </label>
          </div>
          <div>
            <button
              className="resetSubmitButton"
              onClick={handleReset}
              value={resetForm}
            >
              RESET
            </button>
            <button
              className="resetSubmitButton"
              onClick={handleSubmit}
              value={submitForm}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    );
  } else if ("del" === action) {
    body = (
      <form>
        <div>
          <div>
            <label>{header} MOVIE</label>
          </div>
          <div>
            <label>
              <p>Are you sure you want to delete this movie?</p>
            </label>
          </div>
          <div>
            <button className="deleteSubmitButton" onClick={handleSubmit}>
              CONFIRM
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="closeButton" onClick={closePopup}>
          X
        </button>
        <i class="fas fa-times"></i>
        {body}
      </div>
    </div>
  );
};

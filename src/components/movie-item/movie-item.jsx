import React from "react";
import propTypes from "prop-types";
import { Popup } from "../popup";

import "./movieItem.scss";
import "../popup/popup-movie.scss";

const imageUrl = (img) => `https://image.tmdb.org/t/p/w500${img}`;

export default function MovieItem({ item }) {
  const [showEditPopup, setShowEditPopup] = React.useState(false);
  const [showDelPopup, setShowDelPopup] = React.useState(false);

  const handleEditOpen = () => {
    setShowEditPopup(true);
  };

  const handleEditClose = () => {
    setShowEditPopup(false);
  };

  const handleDelOpen = () => {
    setShowDelPopup(true);
  };

  const handleDelClose = () => {
    setShowDelPopup(false);
  };

  React.useEffect(() => {
    setShowEditPopup(showEditPopup);
    setShowDelPopup(showDelPopup);
  }, [showEditPopup, showDelPopup]);

  console.log(item.id);
  return (
    <div className="MoviesList-item" key={item.id}>
      <img src={imageUrl(item.poster_path)} className="film" alt={item.title} />
      <h5 onClick={handleEditOpen}>{item.title}</h5>
      <span onClick={handleEditOpen}>{item.overview}</span>
      <button type="button" className="" onClick={handleDelOpen}>
        DEL MOVIE
      </button>
      {showEditPopup ? (
        <Popup item={item} action="edit" closePopup={handleEditClose} />
      ) : null}
      {showDelPopup ? (
        <Popup item={item} action="del" closePopup={handleDelClose} />
      ) : null}
    </div>
  );
}

MovieItem.propTypes = {
  item: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    overview: propTypes.string,
    poster_path: propTypes.string,
  }),
};

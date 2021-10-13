import React from "react";
import { Popup } from "../popup";
import "./item-add.scss";

export const ItemDetails = ({ item }) => {
  const [showPopup, setShowPopup] = React.useState(false);

  const handleOpen = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  React.useEffect(() => {
    setShowPopup(showPopup);
  }, [showPopup]);

  return (
    <div>
      <button type="button" className="header-button" onClick={handleOpen}>
        + ADD MOVIE
      </button>
      {showPopup ? (
        <Popup item="" action="add" closePopup={handleClose} />
      ) : null}
    </div>
  );
};

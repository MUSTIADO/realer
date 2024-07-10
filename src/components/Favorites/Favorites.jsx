import React, { useState } from "react";
import axios from "axios";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const FavoriteButton = ({ propertyId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    try {
      const response = await axios.post("/api/favorite", { propertyId });
      if (response.status === 200) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error adding to favorite", error);
    }
  };

  return (
    <button onClick={handleFavorite} className="favorite-button">
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
    </button>
  );
};

export default FavoriteButton;

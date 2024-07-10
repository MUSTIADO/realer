import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const UpdatePropertyForm = ({ property, onUpdateProperty }) => {
  const [name, setName] = useState(property.name);
  const [location, setLocation] = useState(property.location);
  const [imageUrl, setImageUrl] = useState(property.imageUrl);
  const [price, setPrice] = useState(property.price);

  useEffect(() => {
    setName(property.name);
    setLocation(property.location);
    setImageUrl(property.imageUrl);
    setPrice(property.price);
  }, [property]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProperty = {
      ...property,
      name,
      location,
      imageUrl,
      price: parseFloat(price),
    };
    onUpdateProperty(updatedProperty);
  };

  return (
    <form onSubmit={handleSubmit} className="update-property-form">
      <h2>Update Property</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Update Property</button>
    </form>
  );
};

export default UpdatePropertyForm;
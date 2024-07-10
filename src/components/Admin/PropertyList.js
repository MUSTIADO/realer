import React from "react";
import "./AdminPanel.css";

const PropertyList = ({ properties, onSelectProperty, onDeleteProperty }) => {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <img src={property.imageUrl} alt={property.name} />
          <h3>{property.name}</h3>
          <p>Location: {property.Location}</p>
          <p>Price: ${property.price}</p>
          <button onClick={() => onSelectProperty(property)}>Edit</button>
          <button onClick={() => onDeleteProperty(property.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
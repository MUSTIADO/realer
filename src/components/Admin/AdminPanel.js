import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyList from "./PropertyList";
import AddPropertyForm from "./AddPropertyForm";
import UpdatePropertyForm from "./UpdatePropertyForm";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/properties");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleAddProperty = async (newProperty) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/properties",
        newProperty
      );
      setProperties([...properties, response.data]);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleUpdateProperty = async (updatedProperty) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/properties/${updatedProperty.id}`,
        updatedProperty
      );
      setProperties(
        properties.map((property) =>
          property.id === updatedProperty.id ? response.data : property
        )
      );
      setSelectedProperty(null);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:5000/properties/${propertyId}`);
      setProperties(properties.filter((property) => property.id !== propertyId));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/properties/search?q=${searchTerm}`
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error searching properties:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Search input and button */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search properties..."
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "50px" }}>
          <PropertyList
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onDeleteProperty={handleDeleteProperty}
          />
          <AddPropertyForm onAddProperty={handleAddProperty} />
        </div>
        {selectedProperty && (
          <div>
            <UpdatePropertyForm
              property={selectedProperty}
              onUpdateProperty={handleUpdateProperty}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
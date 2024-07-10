import React, { useEffect, useState } from "react";
import "./Properties.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate, Link } from "react-router-dom";
import FavoriteButton from "../../components/Favorites/Favorites";
import { MdFavoriteBorder } from "react-icons/md";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/properties');
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.statusText}`);
        }
        const propertyData = await response.json();
        setProperties(propertyData);
        setFilteredProperties(propertyData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = filter.toLowerCase();
    const filtered = properties.filter(property =>
      property.name?.toLowerCase().includes(lowerCaseQuery) ||
      property.location?.toLowerCase().includes(lowerCaseQuery) ||
      property.city?.toLowerCase().includes(lowerCaseQuery) ||
      property.country?.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProperties(filtered);
  }, [filter, properties]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (filteredProperties.length === 0) return <p>No properties found.</p>;

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
      </div>
      <h1>Stellar Properties</h1>
      <div className="row">
        {filteredProperties.map(property => (
          <div key={property.id} className="col-md-4 mb-3">
            <Link to={`/property/${property.id}`} className="card-link">
              <div className="card">
                <img
                  src={`http://localhost:5000/images/${property.imageUrl}`}
                  className="card-img-top"
                  alt={property.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.name}</h5>
                  <p><strong>Location:</strong> {property.Location}</p>
                  <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
                  <FavoriteButton propertyId={property.id} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;

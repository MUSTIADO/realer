import React, { useEffect, useState } from "react";
import "./Properties.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate, Link } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (properties.length === 0) return <p>No properties found.</p>;

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar />
      </div>
      <h1> Stellar Properties</h1>
      <div className="row">
        {properties.map(property => (
          <div key={property.id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={`http://localhost:5000/images/${property.imageUrl}`}
                className="card-img-top"
                alt={property.name}
              />
              <div className="card-body">
                <h5 className="card-title">{property.name}</h5>
                <p><strong>Location:</strong> {property.location}</p> 
                <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
                <button
                  // onClick={() => handleBuyClick(property)}
                  className="btn btn-primary"
                >
                  Buy Property
                </button> 
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;

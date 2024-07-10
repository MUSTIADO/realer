import React, { useState } from 'react';
import axios from 'axios';

const AddPropertyForm = ({ onAddProperty }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('image', image);

    try {
      // Upload image to backend
      const imageResponse = await axios.post('http://localhost:5000/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get image URL from backend response
      const imageUrl = imageResponse.data.imageUrl;

      // Prepare property data
      const propertyData = {
        name,
        location,
        price: parseFloat(price),
        imageUrl,
      };

      // Add property data to properties.json file
      const addPropertyResponse = await axios.post('http://localhost:5000/properties', propertyData);

      // Update parent component state with new property
      onAddProperty(addPropertyResponse.data);

      // Reset form fields and message
      setMessage('Property added successfully');
      setName('');
      setLocation('');
      setPrice('');
      setImage(null);
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="add-property-form">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Add Property</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default AddPropertyForm;
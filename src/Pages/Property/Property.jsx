// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './Property.css';
// import Map from '../../components/Map/Map';
// import { FaShower } from 'react-icons/fa';
// import { AiTwotoneCar } from 'react-icons/ai';
// import { MdMeetingRoom, MdLocationPin } from 'react-icons/md';

// const Property = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/properties/${id}`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch property ${id}`);
//         }
//         const propertyData = await response.json();
//         setProperty(propertyData);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!property) return <p>Property not found.</p>;

//   return (
//     <div className="Wrapper">
//       <h1>{property.name}</h1>
//       <div className="flexCenter property-container">
//         <img
//           src={`http://localhost:5000/images/${property.imageUrl}`}
//           className="card-img-top"
//           alt={property.name}
//         />

//         <div className="flexCenter property-details">
//           {/* left */}
//           <div className="flexColStart left">
//             {/* head */}
//             <div className="flexStart head">
//               <span className="primaryText">{property.title}</span> {/* Changed data to property */}
//               <span className="orangeText" style={{ fontSize: '1.5rem' }}>
//                 $ {property.price}
//               </span>
//             </div>

//             {/* facilities */}
//             <div className="flexStart facilities">
//               {/* bathrooms */}
//               <div className="flexStart facility">
//                 <FaShower size={20} color="#1F3E72" />
//                 <span>{property.facilities?.bathrooms} Bathrooms</span> {/* Added safe navigation */}
//               </div>

//               {/* parkings */}
//               <div className="flexStart facility">
//                 <AiTwotoneCar size={20} color="#1F3E72" />
//                 <span>{property.facilities?.parkings} Parking</span> {/* Added safe navigation */}
//               </div>

//               {/* rooms */}
//               <div className="flexStart facility">
//                 <MdMeetingRoom size={20} color="#1F3E72" />
//                 <span>{property.facilities?.bedrooms} Room/s</span> {/* Added safe navigation */}
//               </div>
//             </div>

//             {/* description */}
//             <span className="secondaryText" style={{ textAlign: 'justify' }}>
//               {property.description}
//             </span>

//             {/* address */}
//             <div className="flexStart" style={{ gap: '1rem', marginTop: '1rem' }}>
//               <MdLocationPin size={25} />
//               <span className="secondaryText">
//                 {property.address} {property.city} {property.country}
//               </span>
//             </div>
//           </div>

//           {/* right side */}
//           <div className="map">
//             <Map
//               address={property.address}
//               city={property.city}
//               country={property.country}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Property;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Property.css';
import Map from '../../components/Map/Map';
import Payment from '../Payment/Payment'; // Import your Payment component
import { FaShower } from 'react-icons/fa';
import { AiTwotoneCar } from 'react-icons/ai';
import { MdMeetingRoom, MdLocationPin } from 'react-icons/md';

const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/properties/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch property ${id}`);
        }
        const propertyData = await response.json();
        setProperty(propertyData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBuyProperty = () => {
    setShowPayment(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="Wrapper">
      <h1>{property.name}</h1>
      <div className="flexCenter property-container">
        <img
          src={`http://localhost:5000/images/${property.imageUrl}`}
          className="card-img-top"
          alt={property.name}
        />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{property.title}</span>
              <span className="orangeText" style={{ fontSize: '1.5rem' }}>
                $ {property.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{property.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{property.facilities?.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{property.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: 'justify' }}>
              {property.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: '1rem', marginTop: '1rem' }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {property.address} {property.city} {property.country}
              </span>
            </div>

            {/* Buy Property Button */}
            <button className="btn btn-primary" onClick={handleBuyProperty}>
              Buy Property
            </button>
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={property.address}
              city={property.city}
              country={property.country}
            />
          </div>
        </div>
      </div>

      {/* Payment Component */}
      {showPayment && (
        <Payment
          property={property}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};

export default Property;

import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./logosh.png" alt="" width={120} />
          <span className="secondaryText">
          Our vision is to create the <br />
          ultimate living experience for everyone.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Location</span>
          <span className="secondaryText">254 Nairobi, Bihi Towers FL 16, Kenya</span>
          <div className="flexCenter f-menu">
            <span>Property</span>
            <span>Services</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import "./Header.css";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [username, setUsername] = useState(""); // State to store username if logged in
  const headerColor = useHeaderColor();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setLoggedIn(true);
        // Replace with logic to fetch username from API or localStorage if needed
        setUsername(""); // Fetch the username from API or localStorage if needed
      } else {
        setLoggedIn(false);
        setUsername(""); // Clear username
      }
    };

    // Check login status on component mount
    checkLoginStatus();
  }, []);

  // Function to handle logout action
  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear session)
    localStorage.removeItem('token'); // Clear token from localStorage
    setLoggedIn(false); // Set logged out state
    setUsername(""); // Clear username
    navigate('/login'); // Redirect to login page
  };

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      // Fetch the username from API or localStorage if needed
      setUsername(""); 
    }
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        <Link to="/">
          {/* logo */}
          <img src="./SHP.PNG" alt="logo" width={60} />
        </Link>
        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <NavLink to="/value">Value</NavLink>
            <a href="mailto:nyabokeann99@gmail.com">Contact</a>

            {/* Conditional rendering for Avatar or Login/Register */}
            {loggedIn ? (
              <div className="avatar">
                <span>{username}</span>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link to="/login" className="button" onClick={handleLogin}>
                Login
              </Link>
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
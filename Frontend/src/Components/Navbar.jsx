import React, { useState } from "react";
import './Navbar.css';
import {Link, useLocation} from "react-router-dom"

const Navbar = () => {

  const location = useLocation();
  const hideSearch = location.pathname === "/login" || location.pathname === "/signup";

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">E-Commerce Website
        {!hideSearch && (
          <>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="search-button">🔍</button>
          </>
        )}

      </div>
      <ul className="nav-links">
        <li><Link to="/home" className="nav-item">Home</Link></li>
        <li><Link to="/addproduct" className="nav-item">AddProduct</Link></li>
        <li><Link to="/about" className="nav-item">About</Link></li>
        <li><Link to="/contact" className="nav-item">Contact</Link></li>
        <li><Link to="/cart" className="nav-item">🛒 Cart</Link></li>
        <li><Link to="/profile" className="nav-item">👤 Profile</Link></li>
        <li><Link to="/login" className="nav-item btn btn-danger fs-5">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


// <label htmlFor="search"></label>
//         <input type="search" placeholder="Search Item 🔍" className="search" id="search" /> 
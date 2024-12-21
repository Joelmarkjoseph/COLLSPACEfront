import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS file

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Collspace</Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          {/* <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link> */}
          <Link to="/getin" onClick={() => setIsMobileMenuOpen(false)}>
            Get In
          </Link>
          {/* <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Tezos Hackathon</h1>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">SignUp</a></li>
        <li><a href="#">About Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

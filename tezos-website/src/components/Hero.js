// src/components/Hero.js
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <h1>Welcome to Tezos</h1>
      <p>Explore crypto payments, lending, and NFT marketplace</p>
      <div className="hero-buttons">
        <button>Sign Up</button>
        <button>Login</button>
      </div>
    </section>
  );
};

export default Hero;

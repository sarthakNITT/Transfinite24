// src/components/Cards.js
import React from 'react';
import './Cards.css';

const Cards = () => {
  return (
    <section className="cards-section">
      <div className="card" onClick={() => window.location.href = '/payment'}>
        <h3>Crypto Payments</h3>
      </div>
      <div className="card" onClick={() => window.location.href = '/lending'}>
        <h3>Crypto Lending</h3>
      </div>
      <div className="card" onClick={() => window.location.href = '/nft'}>
        <h3>NFT Marketplace</h3>
      </div>
    </section>
  );
};

export default Cards;

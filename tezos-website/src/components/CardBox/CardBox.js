import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="cards-container">
        <div className="card" onClick={() => window.location.href='/payment'}>
          <h2>Payment</h2>
        </div>
        <div className="card" onClick={() => window.location.href='/lending'}>
          <h2>Lending</h2>
        </div>
        <div className="card" onClick={() => window.location.href='/nft'}>
          <h2>NFT Marketplace</h2>
        </div>
      </section>
    </div>
  );
}

export default Home;

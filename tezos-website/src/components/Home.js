import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      
      <section className="hero">
        
        <h1>Welcome to Tezos GandMasti</h1>
        <p>We enable seamless payments using various cryptocurrencies, offering a secure and decentralized way to transact.<br />
Our platform also provides crypto lending services, allowing users to borrow against NFTs as collateral.<br />
Additionally, we host a dynamic NFT marketplace where users can buy, sell, and trade unique digital assets.</p>
      </section>
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

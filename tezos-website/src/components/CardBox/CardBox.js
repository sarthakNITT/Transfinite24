import React from 'react';
import './CardBox.css';

function Home() {
  return (
    <>
    <div className="home">
    <span className='Features'>Key <span className='FeaturesMain'>Features</span></span>
      <section className="cards-container">
        <div className="card1" onClick={() => window.location.href='/payment'}>
          <div className='CardHeading'>Payment</div>
          <div className='card1subHead'>Ansfi bridges the gap between crypto and fiat currencies, allowing users to make real-world payments effortlessly. By converting cryptocurrency into fiat through Binance and completing transactions via Stripe, users can pay for services like subscriptions or goods using their preferred crypto assets, ensuring flexibility and convenience in the modern financial landscape.</div>
          <button className='gotopage'>Go to the page</button>
        </div>
        <div className='vertical'>
          <div className="card2" onClick={() => window.location.href='/lending'}>
            <div className='CardHeading'>Lending</div>
            <div className='card1subHead'>Ansfi bridges the gap between crypto and fiat currencies, allowing users to make real-world payments effortlessly. By converting cryptocurrency into fiat through Binance and completing transactions via Stripe, users can pay for services like subscriptions or goods using their preferred crypto assets, ensuring flexibility and convenience in the modern financial landscape.</div>
            <button className='gotopage'>Go to the page</button>
          </div>
          <div className="card3" onClick={() => window.location.href='/nft'}>
            <div className='CardHeading'>NFT Marketplace</div>
            <div className='card1subHead'>Ansfi bridges the gap between crypto and fiat currencies, allowing users to make real-world payments effortlessly. By converting cryptocurrency into fiat through Binance and completing transactions via Stripe, users can pay for services like subscriptions or goods using their preferred crypto assets, ensuring flexibility and convenience in the modern financial landscape.</div>
            <button className='gotopage'>Go to the page</button>
          </div>
        </div>
      </section>
    </div>
    <div className='smartheading'>Smart contract written in <span className='smartpytext'>Smartpy</span></div>
    <div className='codeImage'></div>
    </>
  );
}

export default Home;
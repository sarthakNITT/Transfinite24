import React from 'react';
import './HomeHeadingMain.css';
import MainImage from '../../images/Asset 2.svg'

function Home() {
  return (
    <div className="homeheading">
      <div className='Main'>
        <div className='HomeTextBox'>
          <div className='Mainheading'>Lending made easy through NFT's</div>
          <div className='Mainsubheading'>Our platform enables secure crypto payments, NFT-backed loans, and a dynamic marketplace for buying, selling, and trading unique digital assets with transparency.</div>
          <a className='Start' href='/Lending'>Get Started</a>
        </div>
        <div className='HomeImageBox'><img src={MainImage} alt='MainLogo' className='MainImage' /></div>
      </div>
    </div>
  );
}

export default Home;

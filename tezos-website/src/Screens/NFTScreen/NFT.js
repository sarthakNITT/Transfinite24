import React from 'react';
import './NFT.css'
import NFTContent from '../../components/NFT/nftContent'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const NFT = () => {
  return (      
    <div className="NFTMain">
      <Header/>
      <NFTContent/>
      <Footer/>
    </div>
  );
};

export default NFT;

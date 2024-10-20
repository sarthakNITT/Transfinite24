import React from 'react';
import "./Lending.css" 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import LendingContent from '../../components/Lending/LendingContent';

const Lending = () => {
  return (
    <div className="LendingScreen">
      <Header/>
      <LendingContent/>
      <Footer/>
    </div>
  );
};

export default Lending;

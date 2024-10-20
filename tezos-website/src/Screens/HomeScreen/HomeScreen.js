import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HomeHeadingMain from '../../components/HomeHeadingMain/HomeHeadingMain'
import Cardbox from '../../components/CardBox/CardBox'
import Companies from '../../components/Companies/Companies';
import './HomeScreen.css';  

function HomeScreen() {
  return (
      <div className="HomeScreen">
        <Header/>
        <HomeHeadingMain/>
        <Companies/>
        <Cardbox/>
        <Footer />
      </div>
  );
}

export default HomeScreen;

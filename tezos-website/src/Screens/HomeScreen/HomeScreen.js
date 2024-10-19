import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/Signup';
import Payment from './components/Payment';
import Lending from './components/Lending';
import NFT from './components/NFT';
import HomeHeadingMain from '../../components/HomeHeadingMain/HomeHeadingMain'
import Cardbox from '../../components/CardBox/CardBox'
import './HomeScreen.css';  // Ensure the CSS is imported here

function HomeScreen() {
  return (
    <Router>
      <div className="HomeScreen">
        <Header />
        <HomeHeadingMain/>
        <Cardbox/>
        <Footer />
      </div>
    </Router>
  );
}

export default HomeScreen;

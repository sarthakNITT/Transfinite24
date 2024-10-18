// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/Signup';
import Payment from './components/Payment';
import Lending from './components/Lending';
import NFT from './components/NFT';
import './App.css';  // Ensure the CSS is imported here

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/lending" element={<Lending />} />
          <Route path="/nft" element={<NFT />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

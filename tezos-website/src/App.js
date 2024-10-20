// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import SignupScreen from './Screens/SignupScreen/SignupScreen'
import NFTScreen from './Screens/NFTScreen/NFT'
import LendingScreen from './Screens/LendingScreen/LendingScreen'
import PaymentScreen from './Screens/PaymentScreen/Payment';
import './App.css';  // Ensure the CSS is imported here

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/SignUp' element={<SignupScreen/>} />
        <Route path='/Login' element={<LoginScreen/>} />
        <Route path='/NFT' element={<NFTScreen/>} />
        <Route path='/Lending' element={<LendingScreen/>} />
        <Route path='/Payment' element={<PaymentScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;

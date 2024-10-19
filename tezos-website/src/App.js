// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import PaymentScreen from './Screens/PaymentScreen/Payment'
import './App.css';  // Ensure the CSS is imported here

function App() {
  return (
    <Router>
      <Route path='/' element={<HomeScreen/>} />
      <Route path='/payment' element={<PaymentScreen/>} />
    </Router>
  );
}

export default App;

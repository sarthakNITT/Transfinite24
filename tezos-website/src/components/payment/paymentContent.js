// PaymentContent.js

import React, { useState } from 'react';
import './paymentContent.css';
import payment from '../../images/payment.svg';

const PaymentContent = () => {
  const [xtzAmount, setXtzAmount] = useState('');
  const [result, setResult] = useState('');

  const processPayment = async () => {
    console.log('Function has been called');

    // Convert xtzAmount to integer
    const numericXtzAmount = parseInt(xtzAmount, 10);

    if (isNaN(numericXtzAmount) || numericXtzAmount <= 0) {
      alert('Please enter a valid integer amount of Tezos.');
      console.log('Invalid amount');
      return;
    }
    console.log('Processing payment...');

    // Display loading message
    setResult('Processing...');

    try {
      // Call backend to process the payment
      console.log('Making API call...');

      const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5001';
      const response = await fetch(`${serverUrl}/api/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ xtzAmount: numericXtzAmount }), // Send numeric xtzAmount
      });

      const resultData = await response.json();

      if (response.ok) {
        // Display success message
        setResult(`XTZ to USD simulated: ${resultData.fiatAmount} USD. Redirecting to Stripe...`);

        // Redirect to Stripe's checkout page
        window.location.href = resultData.url; // Use the URL returned from your backend
      } else {
        // Handle errors
        setResult('Error: ' + resultData.error);
      }
      console.log('API call finished');
    } catch (error) {
      setResult('Error: ' + error.message);
      console.log('Error occurred:', error);
    }
  };

  return (
    <div className='LoginMainBox'>
      <div className='LoginLeftBox'>
        <img className='LoginSignupLeftImage' src={payment} alt='Logo' />
        <div className='LoginLeftContent'></div>
      </div>
      <div className='LoginRightBox'>
        <div className='LoginLoginText'>Tezos Payment Simulation</div>
        <div className='LoginLoginSubHead'>
          Enter the number of Tezos you want to simulate for the payment:
        </div>
        <input
          placeholder='Enter integer amount in XTZ'
          type='number'
          className='LoginEmailNameInput'
          value={xtzAmount}
          onChange={(e) => setXtzAmount(e.target.value)}
          step='1' // Ensure only integer values can be input
        />
        <div className='passworddiv'>
          <button onClick={processPayment} className='LoginAccountBox'>
            Simulate Payment
          </button>
        </div>
        {result && <div className='resultMessage'>{result}</div>}
      </div>
    </div>
  );
};

export default PaymentContent;

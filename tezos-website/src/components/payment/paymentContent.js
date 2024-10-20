import React, { useState } from 'react';

const PaymentContent = () => {
  const [xtzAmount, setXtzAmount] = useState('');
  const [result, setResult] = useState('');

  const processPayment = async () => {
    const numericXtzAmount = parseFloat(xtzAmount);

    if (isNaN(numericXtzAmount) || numericXtzAmount <= 0) {
      alert('Please enter a valid amount of Tezos.');
      return;
    }

    setResult('Processing...');

    try {
      const response = await fetch('http://localhost:5000/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ xtzAmount: numericXtzAmount }),
      });

      const resultData = await response.json();

      if (response.ok) {
        setResult(`XTZ to USD simulated: ${resultData.fiatAmount} USD. Redirecting to Stripe...`);
        window.location.href = resultData.url; // Redirect to the actual Stripe checkout page
      } else {
        setResult('Error: ' + resultData.error);
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div className="PaymentContent">
      <h1>Tezos Payment Simulation</h1>
      <p>Enter the number of Tezos you want to simulate for the payment:</p>

      <input
        type="number"
        placeholder="Enter amount in XTZ"
        value={xtzAmount}
        onChange={(e) => setXtzAmount(e.target.value)}
      />

      <button onClick={processPayment}>Simulate Payment</button>

      <p>{result}</p>
    </div>
  );
};

export default PaymentContent;

import React from 'react';
import './payment.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PaymentContent from '../../components/payment/paymentContent'

const Payment = () => {
  return (
    <div className="payment">
      <Header/>
      <PaymentContent/>
      <Footer/>
    </div>
  );
};

export default Payment;

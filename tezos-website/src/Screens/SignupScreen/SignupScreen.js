import React from 'react';
import Header from '../../components/Header/Header'
import SignupContent from '../../components/SignupContent/SignupContent'
import './SignupScreen.css'

const Signup = () => {
  return (
    <div className='SignUpScreen'>
      <Header/>
      <SignupContent/>
    </div>
  );
};

export default Signup;

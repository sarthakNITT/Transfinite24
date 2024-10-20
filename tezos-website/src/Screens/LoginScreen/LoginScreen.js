import React from 'react';
import Header from '../../components/Header/Header'
import LoginContent from '../../components/LoginContent/LoginContent'
import './LoginScreen.css'

const Login = () => {
  return (
    <div className='LoginScreen'>
      <Header/>
      <LoginContent/>
    </div>
  );
};

export default Login;

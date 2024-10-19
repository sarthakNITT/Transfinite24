import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className='Main'>
        <ul className='listAuthenticators'>
          <li><a href='/SignUp' className='Logo'>Logo</a></li>
        </ul>
        <ul className='listNavigators'>
          <li><a href="/" className='Navigationbtn'>Home</a></li>
          <li><a href="/Payment" className='Navigationbtn'>Payment</a></li>
          <li><a href="/Lending" className='Navigationbtn'>Lending</a></li>
          <li><a href="/NFT" className='Navigationbtn'>NFT</a></li>
        </ul>
        <ul className='listAuthenticators'>
          <li><a href='/SignUp' className='SignupBtn'>SignUp</a></li>
          <li><a href='/Login' className='LoginBtn'>LogIn</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

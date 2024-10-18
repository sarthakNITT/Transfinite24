import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><a href="/" className='Navigationbtn'>Home</a></li>
          <li><a href="/login" className='Navigationbtn'>Login</a></li>
          <li><a href="/signup" className='Navigationbtn'>Signup</a></li>
          <li><a href="/about" className='Navigationbtn'>About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

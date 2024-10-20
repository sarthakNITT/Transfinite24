import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className={`Main ${isScrolled ? 'scrolled' : ''}`}>
        <ul className="listAuthenticators">
          <li><a href='/SignUp' className='Logo'>Logo</a></li>
        </ul>
        <ul className="listNavigators">
          <li><a href="/" className="Navigationbtn">Home</a></li>
          <li><a href="/Payment" className="Navigationbtn">Payment</a></li>
          <li><a href="/Lending" className="Navigationbtn">Lending</a></li>
          <li><a href="/NFT" className="Navigationbtn">NFT</a></li>
        </ul>
        <ul className="listAuthenticators">
          <li><a href='/SignUp' className="SignupBtn">SignUp</a></li>
          <li><a href='/Login' className="LoginBtn">LogIn</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

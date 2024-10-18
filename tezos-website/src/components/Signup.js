// src/components/SignUp.js

import React from 'react';

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>Username: </label>
        <input type="text" placeholder="Enter your username" required />
        <br />
        <label>Email: </label>
        <input type="email" placeholder="Enter your email" required />
        <br />
        <label>Password: </label>
        <input type="password" placeholder="Enter your password" required />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

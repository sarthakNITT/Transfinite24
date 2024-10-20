import React, {useState} from 'react';
import './LoginContent.css'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { GrApple } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import LoginLeft from '../../images/login2.svg'

const Login = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);  
  };

  return (
    <div className='LoginMainBox'>
      <div className='LoginLeftBox'>
        <img className='LoginSignupLeftImage' src={LoginLeft} alt='Logo'/>
        <div className='LoginLeftContent'>
          
        </div>
      </div>
      <div className='LoginRightBox'>
        <div className='LoginLoginText'>Let's Log you In</div>
        <div className='LoginLoginSubHead'>Welcome back, You've been missed</div>
        <input 
          placeholder='Email' 
          type='email' 
          className='LoginEmailNameInput'
          value={email}
          onChange={(text)=>setEmail(text.target.value)}
        />
        <div className='passworddiv'>
          <input 
            placeholder='Enter your password' 
            type={show? 'text' : 'password'}
            className='LoginPasswordNameInput'
            value={password}
            onChange={(text)=>setPassword(text.target.value)}
          />
          <div onClick={()=>setShow(!show)} className='Loginicon'>
            {show? <FaEye color='white'/> : <FaEyeSlash color='white'/>}
          </div>
        </div>
        <div className='Logincheck'>
          <label className='Logincheckbox'>
            <input 
              type="checkbox" 
              checked={isChecked} 
              onChange={handleCheckboxChange} 
              className='Logincheckbox'
            />
            <div className='LoginTerms'>Accept <a className='Logina' href='/terms'>Terms and Conditions</a></div>
          </label>
          </div>
          <div className='Loginbuttons'>
          <button className='LoginAccountBox'>Create Account</button>
          <div className='LoginorContinueWith'>or continue with</div>
          <div className='Loginsocial'>
          <button className='LoginGoogle'><FcGoogle style={{ fontSize: '22px', paddingRight: '15px' }}/>Google</button>
          <button className='Loginapple'><GrApple style={{ fontSize: '22px', paddingRight: '15px' }}/>Apple</button>
          </div>
          <div className='Loginalready'>Already have an account? <a className='Logina' href='/Login'>Log In</a> </div>
          </div>

      </div> 
    </div>
);
};

export default Login;

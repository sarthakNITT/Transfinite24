import React, {useState} from 'react';
import './SignupContent.css'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { GrApple } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import Signup2 from '../../images/signup2.png'

const Signup = () => {
  const [show, setShow] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);  
  };

  return (
      <div className='MainBox'>
        <div className='LeftBox'>
          <img className='SignupLeftImage' src={Signup2} alt='Logo'/>
          <div className='LeftContent'>
            
          </div>
        </div>
        <div className='RightBox'>
          <div className='LoginText'>Create an account</div>
          <div className='LoginSubHead'>Join us today and unlock exclusive features tailored just for you!</div>
          <div className='Name'>
          <input 
            placeholder='First Name' 
            type='text' 
            className='FirstNameInput'
            value={firstName}
            onChange={(text)=>setFirstName(text.target.value)}
          />
          <input 
            placeholder='Last Name' 
            type='text' 
            className='LastNameInput'
            value={lastName}
            onChange={(text)=>setLastName(text.target.value)}
          />
          </div>
          <input 
            placeholder='Email' 
            type='email' 
            className='EmailInput'
            value={email}
            onChange={(text)=>setEmail(text.target.value)}
          />
          <div className='passworddiv'>
            <input 
              placeholder='Enter your password' 
              type={show? 'text' : 'password'}
              className='PasswordNameInput'
              value={password}
              onChange={(text)=>setPassword(text.target.value)}
            />
            <div onClick={()=>setShow(!show)} className='icon'>
              {show? <FaEye color='white'/> : <FaEyeSlash color='white'/>}
            </div>
          </div>
          <div className='check'>
            <label className='checkbox'>
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
                className='checkbox'
              />
              <div className='Terms'>Accept <a className='a' href='/terms'>Terms and Conditions</a></div>
            </label>
            </div>
            <div className='buttons'>
            <button className='AccountBox'>Create Account</button>
            <div className='orContinueWith'>or continue with</div>
            <div className='social'>
            <button className='Google'><FcGoogle style={{ fontSize: '22px', paddingRight: '15px' }}/>Google</button>
            <button className='apple'><GrApple style={{ fontSize: '22px', paddingRight: '15px' }}/>Apple</button>
            </div>
            <div className='already'>Already have an account? <a className='a' href='/Login'>Log In</a> </div>
            </div>

        </div> 
      </div>
  );
};

export default Signup;

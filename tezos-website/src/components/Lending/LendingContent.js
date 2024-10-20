import React, {useState} from "react";
import './LendingContent.css'
import LendingLeft2 from '../../images/lendingleft2.svg'
import { FaEye, FaEyeSlash } from "react-icons/fa";


const LendingContent=()=>{
    const [fromeye, setFromEye] = useState(false)
    const [Toeye, setToEye] = useState(false)
    const [assetid, setAssetid] = useState('')
    const [amount, setAmount] = useState('')
    const [fromWallet, setFromWallet] = useState('')
    const [ToWallet, setToWallet] = useState('')
    return (
        <div className='LendingMainBox'>
          <div className='LendingLeftBox'>
            <img className='LendingSignupLeftImage' src={LendingLeft2} alt='Logo'/>
            <div className='LendingLeftContent'>
            </div>
          </div>
          <div className='LendingRightBox'>
            <div className='LendingLoginText'> Transfer Funds Securely</div>
            <div className='LendingLoginSubHead'>Send money instantly from your wallet to another with ease and security.</div>
            <div>
            <input 
              placeholder='Enter Asset ID' 
              type='text' 
              className='LendingFirstNameInput'
              value={assetid}
              onChange={(text)=>setAssetid(text.target.value)}
            />
            </div>
            <input 
              placeholder='Enter Amount' 
              type='text' 
              className='LendingLastNameInput'
              value={amount}
              onChange={(text)=>setAmount(text.target.value)}
            />
            <div className='passworddiv'>
              <input 
                placeholder='Enter Sender Wallet Address' 
                type={fromeye? 'text' : 'password'}
                className='LendingEmailInput'
                value={fromWallet}
                onChange={(text)=>setFromWallet(text.target.value)}
              />
              <div onClick={()=>setFromEye(!fromeye)} className='Lendingicon'>
                {fromeye? <FaEye color='white'/> : <FaEyeSlash color='white'/>}
              </div>
            </div>
            <div className='passworddiv'>
              <input 
                placeholder='Enter Recipient Wallet Address' 
                type={Toeye? 'text' : 'password'}
                className='LendingPasswordNameInput'
                value={ToWallet}
                onChange={(text)=>setToWallet(text.target.value)}
              />
              <div onClick={()=>setToEye(!Toeye)} className='Lendingicon'>
                {Toeye? <FaEye color='white'/> : <FaEyeSlash color='white'/>}
              </div>
            </div>
              <button className='LendingAccountBox'>Initiate Transfer</button>
  
          </div> 
        </div>
    );
}

export default LendingContent;
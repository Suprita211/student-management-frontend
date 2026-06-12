import React from "react";
import LoginImage from "../../assets/Images/Login_UI.webp";
import LoginImageM from "../../assets/Images/Login_UI_M.png";
import NimttLogo from "../../assets/Images/NIMTT_logo.jpeg";
import personIcon from "../../assets/Images/person_icon.png";
import passwordIcon from "../../assets/Images/password_logo.png";
import emailIcon from "../../assets/Images/email_icon.png";

import './Login.css';

function Login() {
  return (
   <div className='Login-content'>
         <div className="App-name">
           <img
            src={NimttLogo}
            alt="NIMTT Visual"
            className='office-logo'
          />
        <p className="font-bold gradient-text " id='login-AppName'>NATIONAL INSTITUTE OF MANAGEMENT AND TECHNICAL TRAINING</p>
    </div>
    <div className='Login-page'>
        {/* <div className="left-side">
            <img
            src={LoginImageM}
            alt="Login visual"
            className='Login-image'
          /> 
       </div> */}
        {/* <div className="Login-content"> */}
             <p className='heading-login'>Welcome Back</p>
             <p className="subHeading-login">Login with your credentials</p>
        {/* </div> */}
        <form action="">
          <div className="input-field">
            <img className="input-img" src={personIcon} alt="" />
            <input className="input-text" type="text" placeholder="User Name"/>
          </div>
           <div className="input-field">
            <img className="input-img" src={passwordIcon} alt="" />
            <input className="input-text" type="password" placeholder="Password"/>
          </div>
           {/* <div className="input-field">
            <img className="input-img" src={emailIcon} alt="" />
            <input className="input-text" type="text" placeholder="Email"/>
          </div> */}
          <p className="forgot-password">Forgot password?</p>
          <button className="login-btn">Login</button>
        </form>
    
    </div>
    </div>
  )
  
}

export default Login;
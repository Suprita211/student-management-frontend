import React, { useState } from "react";

import NimttLogo from "../../assets/Images/NIMTT_logo.jpeg";
import personIcon from "../../assets/Images/person_icon.png";
import passwordIcon from "../../assets/Images/password_logo.png";
import emailIcon from "../../assets/Images/email_icon.png";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axiosInstance from "../../utils/axiosInstance";

function Login() {
  const navigate = useNavigate();

  const [step, setStep] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async () => {

    if (username.trim() === "" || password.trim() === "") {
        alert("Please enter username and password");
        return;
    }

    try {

        const response = await axiosInstance.post(
            "/auth/login",
            {
                username,
                password
            }
        );

        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "role",
            response.data.role
        );

        localStorage.setItem(
            "username",
            username
        );

        if (response.data.role === "ROLE_ADMIN") {

            navigate("/admin/dashboard");

        } else {

          navigate("/operator/dashboard");

        }

    } catch (error) {

        console.log(error);

        alert("Invalid Credentials");

    }

};

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
        <p className='heading-login'>Welcome Back</p>
        <p className="subHeading-login">
        {step === "login" && "Login with your credentials"}
        {step === "forgot" && "Enter your username"}
        {step === "otp" && "Enter the OTP"}
        {step === "reset" && "Create a new password"}
</p>
           

      
      <form onSubmit={(e) => e.preventDefault()}>

  {/* LOGIN SCREEN */}
  {step === "login" && (
    <>
      <div className="input-field">
        <img className="input-img" src={personIcon} alt="" />
        <input
          className="input-text"
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-field">
        <img className="input-img" src={passwordIcon} alt="" />
        <input
          className="input-text"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <p
        className="forgot-password"
        onClick={() => setStep("forgot")}
      >
        Forgot password?
      </p>

      {/* <button type="button" className="login-btn">
        Login
      </button> */}

 <button
    type="button"
    className="login-btn"
    onClick={handleLogin}
>
    Login
</button>


    </>
  )}

  {/* SEND OTP SCREEN */}
  {step === "forgot" && (
    <>
      <div className="input-field">
        <img className="input-img" src={personIcon} alt="" />
        <input
          className="input-text"
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="login-btn"
        onClick={() => setStep("otp")}
      >
        Send OTP
      </button>

      <p
        className="forgot-password"
        onClick={() => setStep("login")}
      >
        Back to Login
      </p>
    </>
  )}

  {/* OTP SCREEN */}
  {step === "otp" && (
    <>
      <div className="input-field">
        <img className="input-img" src={personIcon} alt="" />
        <input
          className="input-text"
          type="text"
          value={username}
          readOnly
        />
      </div>

      <div className="input-field">
        <img className="input-img" src={emailIcon} alt="" />
        <input
          className="input-text"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="login-btn"
        onClick={() => setStep("reset")}
      >
        Verify OTP
      </button>
    </>
  )}

  {/* RESET PASSWORD SCREEN */}
  {step === "reset" && (
    <>
      <div className="input-field">
        <img className="input-img" src={personIcon} alt="" />
        <input
          className="input-text"
          type="text"
          value={username}
          readOnly
        />
      </div>

      <div className="input-field">
        <img className="input-img" src={passwordIcon} alt="" />
        <input
          className="input-text"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="login-btn"
        onClick={() => {
          alert("Password Reset Successfully!");

          setOtp("");
          setNewPassword("");
          setPassword("");

          setStep("login");
        }}
      >
        Reset
      </button>
    </>
  )}

</form>
    
    </div>
    </div>
  );
}  

export default Login;

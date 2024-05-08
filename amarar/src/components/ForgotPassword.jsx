import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [mailSent, setMailSent] = useState(false); // Initialize mailSent state

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8081/forgot-password', { email });
      console.log(response.data); // Optional: Log response from backend for debugging
      setErrorMessage('An email with recovery instructions has been sent.'); // Informative message
      setMailSent(true); // Update mailSent state to show message
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      // Clear email input after submission (optional)
      setEmail('');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-header">Forgot Your Password</h2>
        <hr className="custom-line-for" />

        <form className="forgot-password-form">
          <h3 className="header3">Reset Password</h3>
          <h4 className="header4">Enter your email address or phone number you used when you joined.</h4>

          <label htmlFor='email' className='email'>Email or Phone number:</label>
          <input type='email' id='email' className='email1' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className='send-btn' onClick={handleForgotPassword}>Send</button>

          {mailSent && <p className="mail-sent-message">Check your mail</p>} {/* Conditionally render message */}

          <label htmlFor='otp' className='otp'> Enter OTP:</label>
          <input type='text' className='otp1-1' />
          <input type='text' className='otp2' />
          <input type='text' className='otp3' />
          <input type='text' className='otp4' />

          <button type='submit' className='button'>Submit</button>
        </form>
        <p><a href="/" className='b-log'> Back to Login </a></p>

        <img src={require('../component/Assets/forget.png')} alt="forget" className='img' />
      </div>
    </div>
  );
};

export default ForgotPassword;
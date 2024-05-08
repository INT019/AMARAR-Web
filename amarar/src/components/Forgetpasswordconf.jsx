import React, { useState } from 'react';
import axios from 'axios';
import './Forgotpassword.css';
import './Forgetpasswordconf.css'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      // Call your backend API to verify OTP and reset password
      const response = await axios.post('http://localhost:8081/reset-password', { email, otp, newPassword });
      if (response.data.success) {
        setResetSuccess(true);
        setResetError(false);
      } else {
        setResetSuccess(false);
        setResetError(true);
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setResetError(true);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-header">Forget Your Password</h2>
        <hr className="custom-line-for" />

        <form className="forgot-password-form" onSubmit={handleResetPassword}>
        <h3 className="header3">Reset Password</h3>
        <h4 className="head5">Now your can reset your password.</h4>


          <label htmlFor='email' className='pass'>Password*</label>
          <input type='email' className='pass1' value={email} onChange={handleEmailChange} required />

          <label htmlFor='email' className='pass2'>Confirm Password*</label>

          
            

          <input type='text'className='otp1' value={otp} onChange={handleOtpChange} required />

          <button type='submit' className='button'>Save</button>
        </form>
        {resetSuccess && <p>Password reset successfully.</p>}
        {resetError && <p>Error resetting password. Please try again.</p>}
        <p ><a href="/" className='b-log'> Back to Login </a></p>

        <img src={require('../component/Assets/forget.png')} alt="forget" className='img' />

      </div>
    </div>
  );
}
  
export default ForgotPassword;
